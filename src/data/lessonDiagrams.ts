import React from 'react';

export interface LessonDiagramData {
  lessonId: number;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  svgContent: string;
}

export const LESSON_DIAGRAMS: Record<number, LessonDiagramData> = {
  1: {
    lessonId: 1,
    title: 'Diagram — Урок 1: Архитектура AI и Интеллект',
    subtitle: 'Человек vs AI • Матрёшка AI ⊃ ML ⊃ GenAI • Предикция токенов',
    badge: 'Архитектура AI & Интеллект',
    description: 'Схема работы Generative AI: от формулирования промпта (RTFC) через токенизацию и вероятностное предсказание нейросети к обязательной верификации человека («Generate ≠ Finished»).',
    svgContent: `<svg viewBox="0 0 880 220" style="width:100%;min-width:650px;height:auto;" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-glow1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="50%" stop-color="#020617"/>
      <stop offset="100%" stop-color="#090d16"/>
    </linearGradient>

    <linearGradient id="card-human" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0.08"/>
    </linearGradient>

    <linearGradient id="card-tokens" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#0891b2" stop-opacity="0.08"/>
    </linearGradient>

    <linearGradient id="card-llm" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a855f7" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#7e22ce" stop-opacity="0.08"/>
    </linearGradient>

    <linearGradient id="card-verify" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#059669" stop-opacity="0.08"/>
    </linearGradient>

    <linearGradient id="line-grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
    <linearGradient id="line-grad2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
    <linearGradient id="line-grad3" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>

    <filter id="soft-shadow1" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.5"/>
    </filter>

    <marker id="arrow-blue1" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
      <path d="M0,2 L8,5 L0,8 Z" fill="#38bdf8"/>
    </marker>
    <marker id="arrow-cyan1" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
      <path d="M0,2 L8,5 L0,8 Z" fill="#22d3ee"/>
    </marker>
    <marker id="arrow-emerald1" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
      <path d="M0,2 L8,5 L0,8 Z" fill="#34d399"/>
    </marker>

    <pattern id="grid-pattern1" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" stroke-width="0.5" stroke-opacity="0.4"/>
    </pattern>
  </defs>

  <rect width="100%" height="100%" rx="16" fill="url(#bg-glow1)" />
  <rect width="100%" height="100%" rx="16" fill="url(#grid-pattern1)" />

  <!-- 1. Human / Prompt -->
  <g transform="translate(30, 42)" filter="url(#soft-shadow1)">
    <rect x="0" y="0" width="165" height="98" rx="14" fill="url(#card-human)" stroke="#3b82f6" stroke-width="1.5" />
    <rect x="12" y="-10" width="95" height="20" rx="10" fill="#1e3a8a" stroke="#3b82f6" stroke-width="1"/>
    <text x="59.5" y="4" text-anchor="middle" font-size="9" fill="#93c5fd" font-weight="700" font-family="system-ui">1. Human Prompt</text>
    
    <circle cx="32" cy="48" r="18" fill="#1d4ed8" fill-opacity="0.4" stroke="#60a5fa" stroke-width="1"/>
    <text x="32" y="54" text-anchor="middle" font-size="18">🧑‍💻</text>
    
    <text x="60" y="43" font-size="13" fill="#ffffff" font-weight="700" font-family="system-ui">AI Explorer</text>
    <text x="60" y="59" font-size="10" fill="#93c5fd" font-family="system-ui">Формула RTFC</text>
    <text x="60" y="74" font-size="9" fill="#94a3b8" font-family="monospace">Роль, цель, контекст</text>
  </g>

  <!-- Arrow 1 -> 2 -->
  <g>
    <path d="M 195 91 L 255 91" stroke="url(#line-grad1)" stroke-width="2.5" fill="none" marker-end="url(#arrow-blue1)" stroke-dasharray="6 3"/>
    <rect x="200" y="75" width="50" height="18" rx="4" fill="#0f172a" stroke="#3b82f6" stroke-width="1"/>
    <text x="225" y="87" text-anchor="middle" font-size="8.5" fill="#38bdf8" font-weight="700" font-family="system-ui">Запрос</text>
  </g>

  <!-- 2. Tokenization -->
  <g transform="translate(260, 42)" filter="url(#soft-shadow1)">
    <rect x="0" y="0" width="170" height="98" rx="14" fill="url(#card-tokens)" stroke="#06b6d4" stroke-width="1.5" />
    <rect x="12" y="-10" width="105" height="20" rx="10" fill="#164e63" stroke="#06b6d4" stroke-width="1"/>
    <text x="64.5" y="4" text-anchor="middle" font-size="9" fill="#67e8f9" font-weight="700" font-family="system-ui">2. Токенизация</text>
    
    <circle cx="32" cy="48" r="18" fill="#0e7490" fill-opacity="0.4" stroke="#22d3ee" stroke-width="1"/>
    <text x="32" y="54" text-anchor="middle" font-size="18">🧩</text>
    
    <text x="60" y="43" font-size="13" fill="#ffffff" font-weight="700" font-family="system-ui">Tokens & Emb</text>
    <text x="60" y="59" font-size="10" fill="#67e8f9" font-family="system-ui">Текст ➔ Векторы</text>
    <text x="60" y="74" font-size="9" fill="#94a3b8" font-family="monospace">~0.75 слова / токен</text>
  </g>

  <!-- Arrow 2 -> 3 -->
  <g>
    <path d="M 430 91 L 490 91" stroke="url(#line-grad2)" stroke-width="2.5" fill="none" marker-end="url(#arrow-cyan1)"/>
    <rect x="435" y="75" width="50" height="18" rx="4" fill="#0f172a" stroke="#06b6d4" stroke-width="1"/>
    <text x="460" y="87" text-anchor="middle" font-size="8.5" fill="#22d3ee" font-weight="700" font-family="system-ui">Контекст</text>
  </g>

  <!-- 3. LLM Core -->
  <g transform="translate(495, 42)" filter="url(#soft-shadow1)">
    <rect x="0" y="0" width="170" height="98" rx="14" fill="url(#card-llm)" stroke="#a855f7" stroke-width="1.5" />
    <rect x="12" y="-10" width="105" height="20" rx="10" fill="#581c87" stroke="#a855f7" stroke-width="1"/>
    <text x="64.5" y="4" text-anchor="middle" font-size="9" fill="#e9d5ff" font-weight="700" font-family="system-ui">3. LLM Движок</text>
    
    <circle cx="32" cy="48" r="18" fill="#6b21a8" fill-opacity="0.4" stroke="#c084fc" stroke-width="1"/>
    <text x="32" y="54" text-anchor="middle" font-size="18">🧠</text>
    
    <text x="60" y="43" font-size="13" fill="#ffffff" font-weight="700" font-family="system-ui">Next-Token</text>
    <text x="60" y="59" font-size="10" fill="#e9d5ff" font-weight="600" font-family="system-ui">ChatGPT / Gemini</text>
    <text x="60" y="74" font-size="9" fill="#94a3b8" font-family="monospace">Предикция вероятностей</text>
  </g>

  <!-- Arrow 3 -> 4 -->
  <g>
    <path d="M 665 91 L 715 91" stroke="url(#line-grad3)" stroke-width="2.5" fill="none" marker-end="url(#arrow-emerald1)"/>
    <rect x="664" y="75" width="50" height="18" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="1"/>
    <text x="689" y="87" text-anchor="middle" font-size="8.5" fill="#34d399" font-weight="700" font-family="system-ui">Черновик</text>
  </g>

  <!-- 4. Verification / Debug -->
  <g transform="translate(720, 42)" filter="url(#soft-shadow1)">
    <rect x="0" y="0" width="135" height="98" rx="14" fill="url(#card-verify)" stroke="#10b981" stroke-width="1.5" />
    <rect x="12" y="-10" width="85" height="20" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
    <text x="54.5" y="4" text-anchor="middle" font-size="9" fill="#6ee7b7" font-weight="700" font-family="system-ui">4. Фактчекинг</text>
    
    <circle cx="28" cy="48" r="16" fill="#047857" fill-opacity="0.4" stroke="#34d399" stroke-width="1"/>
    <text x="28" y="54" text-anchor="middle" font-size="16">🛡️</text>
    
    <text x="50" y="43" font-size="13" fill="#ffffff" font-weight="700" font-family="system-ui">Проверка</text>
    <text x="50" y="59" font-size="10" fill="#6ee7b7" font-weight="600" font-family="system-ui">Debug Lab</text>
    <text x="50" y="74" font-size="9" fill="#94a3b8" font-family="monospace">Generate ≠ Finished</text>
  </g>

  <g transform="translate(30, 160)">
    <rect width="825" height="36" rx="10" fill="#0b1329" fill-opacity="0.9" stroke="#1e293b" stroke-width="1"/>
    <circle cx="20" cy="18" r="4" fill="#38bdf8"/>
    <text x="32" y="22" font-size="11" fill="#cbd5e1" font-family="system-ui"><tspan font-weight="700" fill="#38bdf8">Цепочка Урока 1:</tspan> Learn (Человек vs AI) ➔ Try (ChatGPT vs Gemini) ➔ <tspan font-weight="700" fill="#67e8f9">Build («AI School Helper»)</tspan> ➔ <tspan font-weight="700" fill="#c084fc">Test (Human vs AI)</tspan> ➔ <tspan font-weight="700" fill="#34d399">Debug («Catch Mistake»)</tspan> ➔ AI Journal</text>
  </g>
</svg>`
  },
  2: {
    lessonId: 2,
    title: 'Архитектура Аппаратных Шины & Компонентов ПК',
    subtitle: 'CPU, RAM, NVMe SSD, GPU и Motherboard',
    badge: 'Схема шин и скорости',
    description: 'Иерархия пропускной способности: от сверхбыстрого L1-L3 кэша CPU (наносекунды) к RAM (50 GB/s) и NVMe PCIe SSD (7000 MB/s). Узкое место определяет общую скорость системы.',
    svgContent: `<svg viewBox="0 0 880 220" style="width:100%;min-width:650px;height:auto;" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-glow2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>

    <linearGradient id="card-cpu" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0.08"/>
    </linearGradient>

    <linearGradient id="card-ram" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a855f7" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#7e22ce" stop-opacity="0.08"/>
    </linearGradient>

    <linearGradient id="card-ssd" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#059669" stop-opacity="0.08"/>
    </linearGradient>

    <linearGradient id="card-psu" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#d97706" stop-opacity="0.08"/>
    </linearGradient>

    <filter id="soft-shadow2" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.5"/>
    </filter>

    <marker id="arrow-blue2" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
      <path d="M0,2 L8,5 L0,8 Z" fill="#60a5fa"/>
    </marker>
    <marker id="arrow-purple2" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
      <path d="M0,2 L8,5 L0,8 Z" fill="#c084fc"/>
    </marker>
    <marker id="arrow-emerald2" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
      <path d="M0,2 L8,5 L0,8 Z" fill="#34d399"/>
    </marker>

    <pattern id="grid-pattern2" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" stroke-width="0.5" stroke-opacity="0.4"/>
    </pattern>
  </defs>

  <rect width="100%" height="100%" rx="16" fill="url(#bg-glow2)" />
  <rect width="100%" height="100%" rx="16" fill="url(#grid-pattern2)" />

  <!-- CPU Card -->
  <g transform="translate(30, 42)" filter="url(#soft-shadow2)">
    <rect x="0" y="0" width="165" height="98" rx="14" fill="url(#card-cpu)" stroke="#3b82f6" stroke-width="1.5" />
    <rect x="12" y="-10" width="85" height="20" rx="10" fill="#1e3a8a" stroke="#3b82f6" stroke-width="1"/>
    <text x="54.5" y="4" text-anchor="middle" font-size="9" fill="#93c5fd" font-weight="700" font-family="system-ui">1. Мозг ПК</text>
    
    <circle cx="32" cy="48" r="18" fill="#1d4ed8" fill-opacity="0.4" stroke="#60a5fa" stroke-width="1"/>
    <text x="32" y="54" text-anchor="middle" font-size="18">🧠</text>
    
    <text x="60" y="43" font-size="13" fill="#ffffff" font-weight="700" font-family="system-ui">CPU (Процессор)</text>
    <text x="60" y="59" font-size="10" fill="#93c5fd" font-weight="600" font-family="system-ui">L1-L3 Cache</text>
    <text x="60" y="74" font-size="9" fill="#94a3b8" font-family="monospace">5.0+ GHz • 16-24 ядра</text>
  </g>

  <!-- Bus 1 -->
  <g>
    <path d="M 195 91 L 255 91" stroke="#60a5fa" stroke-width="2.5" fill="none" marker-end="url(#arrow-blue2)"/>
    <rect x="198" y="75" width="54" height="18" rx="4" fill="#0f172a" stroke="#3b82f6" stroke-width="1"/>
    <text x="225" y="87" text-anchor="middle" font-size="8.5" fill="#93c5fd" font-weight="700" font-family="system-ui">Шина RAM</text>
  </g>

  <!-- RAM Card -->
  <g transform="translate(260, 42)" filter="url(#soft-shadow2)">
    <rect x="0" y="0" width="175" height="98" rx="14" fill="url(#card-ram)" stroke="#a855f7" stroke-width="1.5" />
    <rect x="12" y="-10" width="105" height="20" rx="10" fill="#581c87" stroke="#a855f7" stroke-width="1"/>
    <text x="64.5" y="4" text-anchor="middle" font-size="9" fill="#e9d5ff" font-weight="700" font-family="system-ui">2. Рабочий стол</text>
    
    <circle cx="32" cy="48" r="18" fill="#6b21a8" fill-opacity="0.4" stroke="#c084fc" stroke-width="1"/>
    <text x="32" y="54" text-anchor="middle" font-size="18">⚡</text>
    
    <text x="60" y="43" font-size="13" fill="#ffffff" font-weight="700" font-family="system-ui">RAM (Память)</text>
    <text x="60" y="59" font-size="10" fill="#e9d5ff" font-weight="600" font-family="system-ui">DDR5 ~50 GB/s</text>
    <text x="60" y="74" font-size="9" fill="#94a3b8" font-family="monospace">16 - 64 ГБ (A2/B2)</text>
  </g>

  <!-- Bus 2 -->
  <g>
    <path d="M 435 91 L 490 91" stroke="#c084fc" stroke-width="2.5" fill="none" marker-end="url(#arrow-purple2)"/>
    <rect x="438" y="75" width="48" height="18" rx="4" fill="#0f172a" stroke="#a855f7" stroke-width="1"/>
    <text x="462" y="87" text-anchor="middle" font-size="8.5" fill="#c084fc" font-weight="700" font-family="system-ui">PCIe 4/5</text>
  </g>

  <!-- SSD Card -->
  <g transform="translate(495, 42)" filter="url(#soft-shadow2)">
    <rect x="0" y="0" width="170" height="98" rx="14" fill="url(#card-ssd)" stroke="#10b981" stroke-width="1.5" />
    <rect x="12" y="-10" width="95" height="20" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
    <text x="59.5" y="4" text-anchor="middle" font-size="9" fill="#6ee7b7" font-weight="700" font-family="system-ui">3. Накопитель</text>
    
    <circle cx="32" cy="48" r="18" fill="#047857" fill-opacity="0.4" stroke="#34d399" stroke-width="1"/>
    <text x="32" y="54" text-anchor="middle" font-size="18">💽</text>
    
    <text x="60" y="43" font-size="13" fill="#ffffff" font-weight="700" font-family="system-ui">NVMe SSD</text>
    <text x="60" y="59" font-size="10" fill="#6ee7b7" font-weight="600" font-family="system-ui">~7,000 MB/s</text>
    <text x="60" y="74" font-size="9" fill="#94a3b8" font-family="monospace">M.2 PCIe Gen4/5</text>
  </g>

  <!-- Bus 3 -->
  <g>
    <path d="M 665 91 L 715 91" stroke="#34d399" stroke-width="2.5" fill="none" marker-end="url(#arrow-emerald2)"/>
    <rect x="664" y="75" width="50" height="18" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="1"/>
    <text x="689" y="87" text-anchor="middle" font-size="8.5" fill="#34d399" font-weight="700" font-family="system-ui">Питание</text>
  </g>

  <!-- PSU Card -->
  <g transform="translate(720, 42)" filter="url(#soft-shadow2)">
    <rect x="0" y="0" width="135" height="98" rx="14" fill="url(#card-psu)" stroke="#f59e0b" stroke-width="1.5" />
    <rect x="12" y="-10" width="85" height="20" rx="10" fill="#78350f" stroke="#f59e0b" stroke-width="1"/>
    <text x="54.5" y="4" text-anchor="middle" font-size="9" fill="#fde68a" font-weight="700" font-family="system-ui">4. Питание</text>
    
    <circle cx="28" cy="48" r="16" fill="#b45309" fill-opacity="0.4" stroke="#fbbf24" stroke-width="1"/>
    <text x="28" y="54" text-anchor="middle" font-size="16">🔌</text>
    
    <text x="50" y="43" font-size="13" fill="#ffffff" font-weight="700" font-family="system-ui">PSU (БП)</text>
    <text x="50" y="59" font-size="10" fill="#fde68a" font-weight="600" font-family="system-ui">80+ Gold</text>
    <text x="50" y="74" font-size="9" fill="#94a3b8" font-family="monospace">+12V, +5V, +3.3V</text>
  </g>

  <!-- Bottom Summary Bar -->
  <g transform="translate(30, 160)">
    <rect width="825" height="36" rx="10" fill="#0b1329" fill-opacity="0.9" stroke="#1e293b" stroke-width="1"/>
    <circle cx="20" cy="18" r="4" fill="#38bdf8"/>
    <text x="32" y="22" font-size="11" fill="#cbd5e1" font-family="system-ui"><tspan font-weight="700" fill="#38bdf8">Иерархия скоростей:</tspan> L1/L2/L3 Cache (наносекунды) ➔ <tspan font-weight="700" fill="#c084fc">RAM DDR5 (~50 GB/s)</tspan> ➔ <tspan font-weight="700" fill="#34d399">NVMe SSD (~7000 MB/s)</tspan> ➔ <tspan font-weight="700" fill="#f59e0b">SATA / HDD (~150 MB/s)</tspan></text>
  </g>
</svg>`
  },
  3: {
    lessonId: 3,
    title: 'Diagram — Занятие 3',
    subtitle: 'Установка ОС и основы виртуализации',
    badge: 'Виртуализация',
    description: 'Гипервизор позволяет запускать несколько независимых операционных систем поверх одного физического компьютера.',
    svgContent: `<svg viewBox="0 0 690 174" style="width:100%;min-width:550px;height:auto;" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#9ca3af"/></marker></defs><g transform="translate(40,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00679914" stroke="#006799" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">💻</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#006799" font-weight="700" font-family="Segoe UI,Arial">Физический хост</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">железо</text>
</g><g transform="translate(210,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#7c3aed14" stroke="#7c3aed" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🧩</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">Гипервизор</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Type 2</text>
</g><g transform="translate(380,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00a86b14" stroke="#00a86b" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🪟</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">VM: Windows 11</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">4 ГБ RAM</text>
</g><g transform="translate(550,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00a86b14" stroke="#00a86b" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🐧</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">VM: Linux Mint</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">2 ГБ RAM</text>
</g><line x1="140" y1="87.0" x2="202" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead3)"/><text x="175.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">VirtualBox</text><line x1="310" y1="87.0" x2="372" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead3)"/><text x="345.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">ресурсы</text><line x1="480" y1="87.0" x2="542" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead3)"/></svg>`
  },
  4: {
    lessonId: 4,
    title: 'Алгоритм 6 Шагов Google IT Troubleshooting',
    subtitle: 'Системный методологический процесс диагностики и устранения сбоев',
    badge: '6-Шаговая Методология',
    description: 'Google IT Support Troubleshooting Framework — 6 ключевых этапов: от сбора симптомов до финального документирования в Базу Знаний (Knowledge Base).',
    svgContent: `<svg viewBox="0 0 980 200" style="width:100%;min-width:700px;height:auto;" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-glow4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <marker id="arrow4" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
      <path d="M0,1 L7,4 L0,7 Z" fill="#38bdf8"/>
    </marker>
  </defs>

  <rect width="100%" height="100%" rx="16" fill="url(#bg-glow4)"/>

  <!-- Step 1 -->
  <g transform="translate(20,40)">
    <rect x="0" y="0" width="135" height="90" rx="12" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.5"/>
    <rect x="10" y="-10" width="60" height="20" rx="10" fill="#312e81" stroke="#6366f1" stroke-width="1"/>
    <text x="40" y="4" text-anchor="middle" font-size="9" fill="#c7d2fe" font-weight="700" font-family="system-ui">ШАГ 1</text>
    <text x="67.5" y="32" text-anchor="middle" font-size="18">🔍</text>
    <text x="67.5" y="52" text-anchor="middle" font-size="11" fill="#ffffff" font-weight="700" font-family="system-ui">1. Identify</text>
    <text x="67.5" y="68" text-anchor="middle" font-size="8.5" fill="#a5b4fc" font-family="system-ui">Сбор симптомов</text>
  </g>

  <line x1="158" y1="85" x2="177" y2="85" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow4)"/>

  <!-- Step 2 -->
  <g transform="translate(180,40)">
    <rect x="0" y="0" width="135" height="90" rx="12" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
    <rect x="10" y="-10" width="60" height="20" rx="10" fill="#0369a1" stroke="#38bdf8" stroke-width="1"/>
    <text x="40" y="4" text-anchor="middle" font-size="9" fill="#bae6fd" font-weight="700" font-family="system-ui">ШАГ 2</text>
    <text x="67.5" y="32" text-anchor="middle" font-size="18">💡</text>
    <text x="67.5" y="52" text-anchor="middle" font-size="11" fill="#ffffff" font-weight="700" font-family="system-ui">2. Theory</text>
    <text x="67.5" y="68" text-anchor="middle" font-size="8.5" fill="#7dd3fc" font-family="system-ui">Гипотеза причины</text>
  </g>

  <line x1="318" y1="85" x2="337" y2="85" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow4)"/>

  <!-- Step 3 -->
  <g transform="translate(340,40)">
    <rect x="0" y="0" width="135" height="90" rx="12" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
    <rect x="10" y="-10" width="60" height="20" rx="10" fill="#047857" stroke="#10b981" stroke-width="1"/>
    <text x="40" y="4" text-anchor="middle" font-size="9" fill="#a7f3d0" font-weight="700" font-family="system-ui">ШАГ 3</text>
    <text x="67.5" y="32" text-anchor="middle" font-size="18">🧪</text>
    <text x="67.5" y="52" text-anchor="middle" font-size="11" fill="#ffffff" font-weight="700" font-family="system-ui">3. Test</text>
    <text x="67.5" y="68" text-anchor="middle" font-size="8.5" fill="#6ee7b7" font-family="system-ui">Проверка теории</text>
  </g>

  <line x1="478" y1="85" x2="497" y2="85" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow4)"/>

  <!-- Step 4 -->
  <g transform="translate(500,40)">
    <rect x="0" y="0" width="135" height="90" rx="12" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
    <rect x="10" y="-10" width="60" height="20" rx="10" fill="#b45309" stroke="#f59e0b" stroke-width="1"/>
    <text x="40" y="4" text-anchor="middle" font-size="9" fill="#fef08a" font-weight="700" font-family="system-ui">ШАГ 4</text>
    <text x="67.5" y="32" text-anchor="middle" font-size="18">⚙️</text>
    <text x="67.5" y="52" text-anchor="middle" font-size="11" fill="#ffffff" font-weight="700" font-family="system-ui">4. Execute</text>
    <text x="67.5" y="68" text-anchor="middle" font-size="8.5" fill="#fde047" font-family="system-ui">План решения</text>
  </g>

  <line x1="638" y1="85" x2="657" y2="85" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow4)"/>

  <!-- Step 5 -->
  <g transform="translate(660,40)">
    <rect x="0" y="0" width="135" height="90" rx="12" fill="#581c87" stroke="#a855f7" stroke-width="1.5"/>
    <rect x="10" y="-10" width="60" height="20" rx="10" fill="#7e22ce" stroke="#a855f7" stroke-width="1"/>
    <text x="40" y="4" text-anchor="middle" font-size="9" fill="#f5d0fe" font-weight="700" font-family="system-ui">ШАГ 5</text>
    <text x="67.5" y="32" text-anchor="middle" font-size="18">✅</text>
    <text x="67.5" y="52" text-anchor="middle" font-size="11" fill="#ffffff" font-weight="700" font-family="system-ui">5. Verify</text>
    <text x="67.5" y="68" text-anchor="middle" font-size="8.5" fill="#e9d5ff" font-family="system-ui">Проверка работы</text>
  </g>

  <line x1="798" y1="85" x2="817" y2="85" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow4)"/>

  <!-- Step 6 -->
  <g transform="translate(820,40)">
    <rect x="0" y="0" width="135" height="90" rx="12" fill="#831843" stroke="#ec4899" stroke-width="1.5"/>
    <rect x="10" y="-10" width="60" height="20" rx="10" fill="#be185d" stroke="#ec4899" stroke-width="1"/>
    <text x="40" y="4" text-anchor="middle" font-size="9" fill="#fbcfe8" font-weight="700" font-family="system-ui">ШАГ 6</text>
    <text x="67.5" y="32" text-anchor="middle" font-size="18">📝</text>
    <text x="67.5" y="52" text-anchor="middle" font-size="11" fill="#ffffff" font-weight="700" font-family="system-ui">6. Document</text>
    <text x="67.5" y="68" text-anchor="middle" font-size="8.5" fill="#f472b6" font-family="system-ui">Запись в KB</text>
  </g>

  <g transform="translate(20, 150)">
    <rect width="935" height="32" rx="8" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
    <circle cx="16" cy="16" r="4" fill="#a855f7"/>
    <text x="28" y="20" font-size="11" fill="#cbd5e1" font-family="system-ui"><tspan font-weight="700" fill="#c084fc">Золотое правило:</tspan> Никогда не переходите к внедрению (Шаг 4) без подтвержденной тестом теории (Шаг 3). Принцип Бритвы Оккама — начинайте с простейших гипотез.</text>
  </g>
</svg>`
  },
  5: {
    lessonId: 5,
    title: 'Diagram — Занятие 5',
    subtitle: 'Основы сетей: IP, DNS, DHCP, маски',
    badge: 'IP / DNS / DHCP',
    description: 'PC получает IP-адрес от Router/DHCP, а DNS-сервер резолвит доменные имена в IP-адреса для доступа к сайтам.',
    svgContent: `<svg viewBox="0 0 520 174" style="width:100%;min-width:500px;height:auto;" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead5" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#9ca3af"/></marker></defs><g transform="translate(40,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00a86b14" stroke="#00a86b" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🖥</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">PC</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">192.168.1.10</text>
</g><g transform="translate(210,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00679914" stroke="#006799" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">📡</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#006799" font-weight="700" font-family="Segoe UI,Arial">Router/DHCP</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">192.168.1.1</text>
</g><g transform="translate(380,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#7c3aed14" stroke="#7c3aed" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🌐</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">DNS-сервер</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">8.8.8.8</text>
</g><line x1="140" y1="87.0" x2="202" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead5)"/><text x="175.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">DHCP-запрос</text><line x1="310" y1="87.0" x2="372" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead5)"/><text x="345.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">DNS резолв</text></svg>`
  },
  6: {
    lessonId: 6,
    title: 'Diagram — Занятие 6',
    subtitle: 'Сетевое оборудование и модель OSI',
    badge: 'OSI-стек',
    description: '7 уровней модели OSI снизу вверх — каждая сетевая проблема живёт на своём уровне, и диагностика должна идти от физического уровня к прикладному.',
    svgContent: `<svg viewBox="0 0 400 314" style="width:100%;min-width:360px;max-width:500px;height:auto;margin:0 auto;display:block;" xmlns="http://www.w3.org/2000/svg"><g transform="translate(30,10)">
<rect x="0" y="0" width="340" height="34" rx="6" fill="#7c3aed14" stroke="#7c3aed" stroke-width="1.5"/>
<text x="14" y="21.0" font-size="11" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">L7 Application</text>
<text x="326" y="21.0" text-anchor="end" font-size="9" fill="#6b7280" font-family="monospace">HTTP, DNS, FTP</text>
</g><g transform="translate(30,50)">
<rect x="0" y="0" width="340" height="34" rx="6" fill="#7c3aed14" stroke="#7c3aed" stroke-width="1.5"/>
<text x="14" y="21.0" font-size="11" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">L6 Presentation</text>
<text x="326" y="21.0" text-anchor="end" font-size="9" fill="#6b7280" font-family="monospace">SSL/TLS, шифрование</text>
</g><g transform="translate(30,90)">
<rect x="0" y="0" width="340" height="34" rx="6" fill="#7c3aed14" stroke="#7c3aed" stroke-width="1.5"/>
<text x="14" y="21.0" font-size="11" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">L5 Session</text>
<text x="326" y="21.0" text-anchor="end" font-size="9" fill="#6b7280" font-family="monospace">NetBIOS, RPC</text>
</g><g transform="translate(30,130)">
<rect x="0" y="0" width="340" height="34" rx="6" fill="#0ea5e914" stroke="#0ea5e9" stroke-width="1.5"/>
<text x="14" y="21.0" font-size="11" fill="#0ea5e9" font-weight="700" font-family="Segoe UI,Arial">L4 Transport</text>
<text x="326" y="21.0" text-anchor="end" font-size="9" fill="#6b7280" font-family="monospace">TCP, UDP</text>
</g><g transform="translate(30,170)">
<rect x="0" y="0" width="340" height="34" rx="6" fill="#0ea5e914" stroke="#0ea5e9" stroke-width="1.5"/>
<text x="14" y="21.0" font-size="11" fill="#0ea5e9" font-weight="700" font-family="Segoe UI,Arial">L3 Network</text>
<text x="326" y="21.0" text-anchor="end" font-size="9" fill="#6b7280" font-family="monospace">IP, ICMP, Router</text>
</g><g transform="translate(30,210)">
<rect x="0" y="0" width="340" height="34" rx="6" fill="#00a86b14" stroke="#00a86b" stroke-width="1.5"/>
<text x="14" y="21.0" font-size="11" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">L2 Data Link</text>
<text x="326" y="21.0" text-anchor="end" font-size="9" fill="#6b7280" font-family="monospace">MAC, Switch</text>
</g><g transform="translate(30,250)">
<rect x="0" y="0" width="340" height="34" rx="6" fill="#00a86b14" stroke="#00a86b" stroke-width="1.5"/>
<text x="14" y="21.0" font-size="11" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">L1 Physical</text>
<text x="326" y="21.0" text-anchor="end" font-size="9" fill="#6b7280" font-family="monospace">Кабель, сигнал</text>
</g></svg>`
  },
  7: {
    lessonId: 7,
    title: 'Diagram — Занятие 7',
    subtitle: 'Wi-Fi, VPN и безопасный удалённый доступ',
    badge: 'Удалённый доступ',
    description: 'VPN создаёт зашифрованный туннель через публичный интернет, будто удалённый сотрудник физически подключён к офисной сети.',
    svgContent: `<svg viewBox="0 0 690 174" style="width:100%;min-width:550px;height:auto;" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead7" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#9ca3af"/></marker></defs><g transform="translate(40,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00a86b14" stroke="#00a86b" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">💻</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">Удалённый ПК</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">сотрудник</text>
</g><g transform="translate(210,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#9ca3af14" stroke="#9ca3af" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🌐</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#9ca3af" font-weight="700" font-family="Segoe UI,Arial">Интернет</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">публичная сеть</text>
</g><g transform="translate(380,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00679914" stroke="#006799" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🔐</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#006799" font-weight="700" font-family="Segoe UI,Arial">VPN Gateway</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">офисный шлюз</text>
</g><g transform="translate(550,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#7c3aed14" stroke="#7c3aed" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🏢</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">Офисная LAN</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">внутренний ресурс</text>
</g><line x1="140" y1="87.0" x2="202" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead7)"/><text x="175.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">VPN-туннель</text><line x1="310" y1="87.0" x2="372" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead7)"/><text x="345.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">шифрование</text><line x1="480" y1="87.0" x2="542" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead7)"/></svg>`
  },
  8: {
    lessonId: 8,
    title: 'Diagram — Занятие 8',
    subtitle: 'Диагностика сетевых проблем',
    badge: 'Диагностика по уровням',
    description: 'Диагностика всегда идёт снизу вверх: сначала физический уровень, затем канальный, сетевой, транспортный и только потом — прикладной.',
    svgContent: `<svg viewBox="0 0 400 194" style="width:100%;min-width:360px;max-width:500px;height:auto;margin:0 auto;display:block;" xmlns="http://www.w3.org/2000/svg"><g transform="translate(30,10)">
<rect x="0" y="0" width="340" height="34" rx="6" fill="#7c3aed14" stroke="#7c3aed" stroke-width="1.5"/>
<text x="14" y="21.0" font-size="11" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">4. Application — DNS, сайт недоступен</text>
<text x="326" y="21.0" text-anchor="end" font-size="9" fill="#6b7280" font-family="monospace">nslookup</text>
</g><g transform="translate(30,50)">
<rect x="0" y="0" width="340" height="34" rx="6" fill="#0ea5e914" stroke="#0ea5e9" stroke-width="1.5"/>
<text x="14" y="21.0" font-size="11" fill="#0ea5e9" font-weight="700" font-family="Segoe UI,Arial">3. Transport — порт недоступен</text>
<text x="326" y="21.0" text-anchor="end" font-size="9" fill="#6b7280" font-family="monospace">netstat</text>
</g><g transform="translate(30,90)">
<rect x="0" y="0" width="340" height="34" rx="6" fill="#00a86b14" stroke="#00a86b" stroke-width="1.5"/>
<text x="14" y="21.0" font-size="11" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">2. Network — нет IP/шлюза</text>
<text x="326" y="21.0" text-anchor="end" font-size="9" fill="#6b7280" font-family="monospace">ipconfig, ping</text>
</g><g transform="translate(30,130)">
<rect x="0" y="0" width="340" height="34" rx="6" fill="#e53e3e14" stroke="#e53e3e" stroke-width="1.5"/>
<text x="14" y="21.0" font-size="11" fill="#e53e3e" font-weight="700" font-family="Segoe UI,Arial">1. Physical/Data Link — нет линка</text>
<text x="326" y="21.0" text-anchor="end" font-size="9" fill="#6b7280" font-family="monospace">кабель, порт</text>
</g></svg>`
  },
  9: {
    lessonId: 9,
    title: 'Diagram — Занятие 9',
    subtitle: 'Windows: управление, файлы, пользователи',
    badge: 'NTFS-права',
    description: 'Итоговый доступ пользователя определяется его группой и правами на конкретную папку — явный запрет всегда важнее разрешения.',
    svgContent: `<svg viewBox="0 0 690 174" style="width:100%;min-width:550px;height:auto;" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead9" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#9ca3af"/></marker></defs><g transform="translate(40,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#7c3aed14" stroke="#7c3aed" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">👤</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">Пользователь</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">user_test</text>
</g><g transform="translate(210,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00679914" stroke="#006799" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">👥</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#006799" font-weight="700" font-family="Segoe UI,Arial">Группа</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Users</text>
</g><g transform="translate(380,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00a86b14" stroke="#00a86b" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">📁</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">Папка</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">SharedTest</text>
</g><g transform="translate(550,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#e53e3e14" stroke="#e53e3e" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">✅</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#e53e3e" font-weight="700" font-family="Segoe UI,Arial">Доступ</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Read/Modify</text>
</g><line x1="140" y1="87.0" x2="202" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead9)"/><text x="175.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">состоит в</text><line x1="310" y1="87.0" x2="372" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead9)"/><text x="345.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">NTFS права</text><line x1="480" y1="87.0" x2="542" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead9)"/><text x="515.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">Effective</text></svg>`
  },
  10: {
    lessonId: 10,
    title: 'Diagram — Занятие 10',
    subtitle: 'Linux: терминал, права доступа и автоматизация',
    badge: 'Linux-автоматизация',
    description: 'Cron запускает скрипт по расписанию, скрипт проверяет систему и пишет результат в лог-файл — полностью без участия человека.',
    svgContent: `<svg viewBox="0 0 690 174" style="width:100%;min-width:550px;height:auto;" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead10" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#9ca3af"/></marker></defs><g transform="translate(40,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#7c3aed14" stroke="#7c3aed" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">⏰</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">cron</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">0 * * * *</text>
</g><g transform="translate(210,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00679914" stroke="#006799" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">📜</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#006799" font-weight="700" font-family="Segoe UI,Arial">Bash-скрипт</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">check_disk.sh</text>
</g><g transform="translate(380,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00a86b14" stroke="#00a86b" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">💽</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">Диск</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">/</text>
</g><g transform="translate(550,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#e53e3e14" stroke="#e53e3e" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">📄</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#e53e3e" font-weight="700" font-family="Segoe UI,Arial">Лог-файл</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">disk_check.log</text>
</g><line x1="140" y1="87.0" x2="202" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead10)"/><text x="175.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">запускает</text><line x1="310" y1="87.0" x2="372" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead10)"/><text x="345.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">df -h</text><line x1="480" y1="87.0" x2="542" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead10)"/><text x="515.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">результат</text></svg>`
  },
  11: {
    lessonId: 11,
    title: 'Diagram — Занятие 11',
    subtitle: 'macOS, iOS, Android и MDM',
    badge: 'Архитектура MDM & Work Profile',
    description: 'Централизованная MDM-система (Microsoft Intune / Jamf) изолирует личный девайс и рабочий профиль (Work Profile), защищая корпоративные данные без доступа к личным файлам пользователя.',
    svgContent: `<svg viewBox="0 0 690 174" style="width:100%;min-width:550px;height:auto;" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead11" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#9ca3af"/></marker></defs><g transform="translate(40,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#7c3aed14" stroke="#7c3aed" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">📱</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">BYOD Девайс</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">iOS / Android / Mac</text>
</g><g transform="translate(210,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00679914" stroke="#006799" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">☁️</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#006799" font-weight="700" font-family="Segoe UI,Arial">MDM Сервер</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Intune / Jamf</text>
</g><g transform="translate(380,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00a86b14" stroke="#00a86b" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">💼</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">Work Profile</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Контейнер данных</text>
</g><g transform="translate(550,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#e53e3e14" stroke="#e53e3e" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🏢</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#e53e3e" font-weight="700" font-family="Segoe UI,Arial">Корп. ресурсы</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Outlook / VPN</text>
</g><line x1="140" y1="87.0" x2="202" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead11)"/><text x="175.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">Enrollment</text><line x1="310" y1="87.0" x2="372" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead11)"/><text x="345.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">Политики</text><line x1="480" y1="87.0" x2="542" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead11)"/><text x="515.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">Доступ</text></svg>`
  },
  12: {
    lessonId: 12,
    title: 'Diagram — Занятие 12',
    subtitle: 'Active Directory, GPO, NTFS и Backup',
    badge: 'Иерархия AD & Применение GPO',
    description: 'Централизованное управление инфраструктурой: контроллер домена (DC) управляет OU, пользователями, компьютерами и групповыми политиками (GPO).',
    svgContent: `<svg viewBox="0 0 860 174" style="width:100%;min-width:600px;height:auto;" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead12" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#9ca3af"/></marker></defs><g transform="translate(40,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#7c3aed14" stroke="#7c3aed" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🌐</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">company.local</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Домен AD DS</text>
</g><g transform="translate(210,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00679914" stroke="#006799" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">📁</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#006799" font-weight="700" font-family="Segoe UI,Arial">OU=Department</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Подразделения</text>
</g><g transform="translate(380,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#0ea5e914" stroke="#0ea5e9" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">📜</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#0ea5e9" font-weight="700" font-family="Segoe UI,Arial">GPO Policy</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">LSDOU Алгоритм</text>
</g><g transform="translate(550,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00a86b14" stroke="#00a86b" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">👥</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">User & PC</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Объекты AD</text>
</g><g transform="translate(720,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#e53e3e14" stroke="#e53e3e" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">💾</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#e53e3e" font-weight="700" font-family="Segoe UI,Arial">Backup 3-2-1</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Offsite / Cloud</text>
</g><line x1="140" y1="87.0" x2="202" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead12)"/><text x="175.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">Иерархия</text><line x1="310" y1="87.0" x2="372" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead12)"/><text x="345.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">Применение</text><line x1="480" y1="87.0" x2="542" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead12)"/><text x="515.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">Контроль</text><line x1="650" y1="87.0" x2="712" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead12)"/><text x="681.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">Защита</text></svg>`
  },
  13: {
    lessonId: 13,
    title: 'Diagram — Занятие 13',
    subtitle: 'Сетевые сервисы: Windows Server DNS, DHCP, File Server, Print Server',
    badge: 'Архитектура Корпоративных Сервисов',
    description: 'Взаимодействие клиента с ключевыми ролями Windows Server: получение IP-адреса по DHCP, разрешение имён через DNS и доступ к общим файловым ресурсам SMB.',
    svgContent: `<svg viewBox="0 0 860 174" style="width:100%;min-width:600px;height:auto;" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead13" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#9ca3af"/></marker></defs><g transform="translate(40,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#7c3aed14" stroke="#7c3aed" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">💻</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">Ноутбук</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Клиент LAN</text>
</g><g transform="translate(210,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00679914" stroke="#006799" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🌐</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#006799" font-weight="700" font-family="Segoe UI,Arial">DHCP Server</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">DORA Process</text>
</g><g transform="translate(380,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#0ea5e914" stroke="#0ea5e9" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🔍</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#0ea5e9" font-weight="700" font-family="Segoe UI,Arial">DNS Server</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Forward / Reverse</text>
</g><g transform="translate(550,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00a86b14" stroke="#00a86b" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">📁</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">File Server</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">SMB / DFS Share</text>
</g><g transform="translate(720,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#e53e3e14" stroke="#e53e3e" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🖨️</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#e53e3e" font-weight="700" font-family="Segoe UI,Arial">Print Server</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Очередь печати</text>
</g><line x1="140" y1="87.0" x2="202" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead13)"/><text x="175.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">1. IP/DNS</text><line x1="310" y1="87.0" x2="372" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead13)"/><text x="345.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">2. Имя→IP</text><line x1="480" y1="87.0" x2="542" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead13)"/><text x="515.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">3. Доступ</text><line x1="650" y1="87.0" x2="712" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead13)"/><text x="681.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">4. Печать</text></svg>`
  },
  14: {
    lessonId: 14,
    title: 'Diagram — Занятие 14',
    subtitle: 'Серверные роли и автоматизация (PowerShell / Bash)',
    badge: 'Автоматизация PowerShell',
    description: 'Скрипт читает список из CSV и создаёт всех пользователей за один запуск вместо десятков ручных действий.',
    svgContent: `<svg viewBox="0 0 690 174" style="width:100%;min-width:550px;height:auto;" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead14" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#9ca3af"/></marker></defs><g transform="translate(40,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#7c3aed14" stroke="#7c3aed" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">📋</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">CSV-файл</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">10 юзеров</text>
</g><g transform="translate(210,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00679914" stroke="#006799" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">📜</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#006799" font-weight="700" font-family="Segoe UI,Arial">PowerShell</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">New-ADUser</text>
</g><g transform="translate(380,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00a86b14" stroke="#00a86b" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🏛</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">Active Directory</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">домен</text>
</g><g transform="translate(550,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#e53e3e14" stroke="#e53e3e" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">✅</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#e53e3e" font-weight="700" font-family="Segoe UI,Arial">10 аккаунтов</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">созданы</text>
</g><line x1="140" y1="87.0" x2="202" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead14)"/><text x="175.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">Import-Csv</text><line x1="310" y1="87.0" x2="372" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead14)"/><text x="345.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">выполняет</text><line x1="480" y1="87.0" x2="542" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead14)"/><text x="515.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">готово</text></svg>`
  },
  15: {
    lessonId: 15,
    title: 'Diagram — Занятие 15',
    subtitle: 'Архитектура мониторинга: SNMP, Prometheus, Grafana и UptimeRobot',
    badge: 'Мониторинг и алерты',
    description: 'Система непрерывно собирает метрики и логи (Pull/Push), визуализирует на дашбордах Grafana и мгновенно оповещает On-Call инженера при выходе за пороги (Thresholds).',
    svgContent: `<svg viewBox="0 0 690 174" style="width:100%;min-width:550px;height:auto;" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead15" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#9ca3af"/></marker></defs><g transform="translate(40,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00679914" stroke="#006799" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🖥</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#006799" font-weight="700" font-family="Segoe UI,Arial">Серверы / Сеть</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">SNMP / Exporters</text>
</g><g transform="translate(210,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#7c3aed14" stroke="#7c3aed" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🔥</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">Prometheus / Zabbix</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Сбор метрик (Pull)</text>
</g><g transform="translate(380,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#0ea5e914" stroke="#0ea5e9" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">📊</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#0ea5e9" font-weight="700" font-family="Segoe UI,Arial">Grafana Cloud</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Дашборды / Алерты</text>
</g><g transform="translate(550,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#e53e3e14" stroke="#e53e3e" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🚨</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#e53e3e" font-weight="700" font-family="Segoe UI,Arial">On-Call Инженер</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Email / PagerDuty</text>
</g><line x1="140" y1="87.0" x2="202" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead15)"/><text x="175.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">метрики</text><line x1="310" y1="87.0" x2="372" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead15)"/><text x="345.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">запрос</text><line x1="480" y1="87.0" x2="542" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead15)"/><text x="515.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">alert &gt; 90%</text></svg>`
  },
  16: {
    lessonId: 16,
    title: 'Diagram — Занятие 16',
    subtitle: 'Troubleshooting серверов + ТЕСТ 4',
    badge: 'Эскалация инцидента',
    description: 'Чёткая матрица эскалации по SLA — каждый уровень знает, когда передавать инцидент дальше, что резко сокращает время простоя.',
    svgContent: `<svg viewBox="0 0 690 174" style="width:100%;min-width:550px;height:auto;" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead16" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#9ca3af"/></marker></defs><g transform="translate(40,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#e53e3e14" stroke="#e53e3e" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🚨</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#e53e3e" font-weight="700" font-family="Segoe UI,Arial">Инцидент</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">сервер ушёл</text>
</g><g transform="translate(210,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00679914" stroke="#006799" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🧑‍💻</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#006799" font-weight="700" font-family="Segoe UI,Arial">L1 Support</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">первичный тест</text>
</g><g transform="translate(380,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#7c3aed14" stroke="#7c3aed" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🛠</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">L2 Support</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">анализ логов</text>
</g><g transform="translate(550,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00a86b14" stroke="#00a86b" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🏗</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">L3 / Vendor</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">исправление</text>
</g><line x1="140" y1="87.0" x2="202" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead16)"/><text x="175.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">0-15 мин</text><line x1="310" y1="87.0" x2="372" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead16)"/><text x="345.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">15-30 мин</text><line x1="480" y1="87.0" x2="542" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead16)"/><text x="515.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">30-60 мин</text></svg>`
  },
  17: {
    lessonId: 17,
    title: 'Diagram — Занятие 17',
    subtitle: 'Основы ИБ: угрозы и модель CIA',
    badge: 'CIA Triad',
    description: 'Три составляющие информационной безопасности: конфиденциальность, целостность, доступность — любая защитная мера служит одной или нескольким из них.',
    svgContent: `<svg viewBox="0 0 420 250" style="width:100%;min-width:360px;max-width:480px;height:auto;margin:0 auto;display:block;" xmlns="http://www.w3.org/2000/svg"><line x1="210.0" y1="45.0" x2="292" y2="170.0" stroke="#d1d5db" stroke-width="2" stroke-dasharray="4,3"/><line x1="292" y1="170.0" x2="128" y2="170.0" stroke="#d1d5db" stroke-width="2" stroke-dasharray="4,3"/><line x1="128" y1="170.0" x2="210.0" y2="45.0" stroke="#d1d5db" stroke-width="2" stroke-dasharray="4,3"/><g transform="translate(155.0,15.0)">
<rect x="0" y="0" width="110" height="50" rx="10" fill="#7c3aed14" stroke="#7c3aed" stroke-width="2"/>
<text x="55" y="22" text-anchor="middle" font-size="16">🔒</text>
<text x="55" y="38" text-anchor="middle" font-size="9" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">Confidentiality</text>
</g><g transform="translate(237,145.0)">
<rect x="0" y="0" width="110" height="50" rx="10" fill="#0ea5e914" stroke="#0ea5e9" stroke-width="2"/>
<text x="55" y="22" text-anchor="middle" font-size="16">✅</text>
<text x="55" y="38" text-anchor="middle" font-size="9" fill="#0ea5e9" font-weight="700" font-family="Segoe UI,Arial">Integrity</text>
</g><g transform="translate(73,145.0)">
<rect x="0" y="0" width="110" height="50" rx="10" fill="#00a86b14" stroke="#00a86b" stroke-width="2"/>
<text x="55" y="22" text-anchor="middle" font-size="16">⏱</text>
<text x="55" y="38" text-anchor="middle" font-size="9" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">Availability</text>
</g></svg>`
  },
  18: {
    lessonId: 18,
    title: 'Архитектура DMZ и Сетевая Безопасность',
    subtitle: 'Двухуровневая защита периметра и публичных сервисов',
    badge: 'DMZ & Firewall',
    description: 'Внешний Firewall пропускает трафик только к публичным сервисам в DMZ (Web, Mail, DNS). Внутренний Firewall изолирует корпоративную сеть и базы данных.',
    svgContent: `<svg viewBox="0 0 690 174" style="width:100%;min-width:550px;height:auto;" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead18" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#9ca3af"/></marker></defs><g transform="translate(40,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#e53e3e14" stroke="#e53e3e" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🌐</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#e53e3e" font-weight="700" font-family="Segoe UI,Arial">Internet</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">внешняя сеть</text>
</g><g transform="translate(210,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00679914" stroke="#006799" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🧱</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#006799" font-weight="700" font-family="Segoe UI,Arial">External FW</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">80, 443, 25</text>
</g><g transform="translate(380,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#7c3aed14" stroke="#7c3aed" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🖥</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">DMZ Zone</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Web / Mail / DNS</text>
</g><g transform="translate(550,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00a86b14" stroke="#00a86b" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🏢</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">Internal Net</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">AD / DB / Files</text>
</g><line x1="140" y1="87.0" x2="202" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead18)"/><text x="175.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">трафик</text><line x1="310" y1="87.0" x2="372" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead18)"/><text x="345.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">фильтрация</text><line x1="480" y1="87.0" x2="542" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead18)"/><text x="515.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">Int FW</text></svg>`
  },
  19: {
    lessonId: 19,
    title: 'Безопасность конечных точек (Endpoint Security)',
    subtitle: 'Комплексная защита рабочих станций и серверов',
    badge: 'Endpoint Protection',
    description: 'Многоуровневая защита хоста: EDR поведенческий анализ + BitLocker шифрование диска + WSUS патч-менеджмент + MFA аутентификация.',
    svgContent: `<svg viewBox="0 0 690 174" style="width:100%;min-width:550px;height:auto;" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead19" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#9ca3af"/></marker></defs><g transform="translate(40,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#7c3aed14" stroke="#7c3aed" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🛡</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">EDR / Defender</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Поведение</text>
</g><g transform="translate(210,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00a86b14" stroke="#00a86b" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🔐</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">BitLocker</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Шифрование</text>
</g><g transform="translate(380,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00679914" stroke="#006799" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🔄</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#006799" font-weight="700" font-family="Segoe UI,Arial">WSUS / Intune</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Обновления</text>
</g><g transform="translate(550,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#f59e0b14" stroke="#f59e0b" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🔑</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#f59e0b" font-weight="700" font-family="Segoe UI,Arial">MFA + CIS</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Hardening</text>
</g><line x1="140" y1="87.0" x2="202" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead19)"/><text x="175.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">анализ</text><line x1="310" y1="87.0" x2="372" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead19)"/><text x="345.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">защита диска</text><line x1="480" y1="87.0" x2="542" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead19)"/><text x="515.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">патчи</text></svg>`
  },
  20: {
    lessonId: 20,
    title: 'NIST CSF 2.0 & Incident Response Lifecycle',
    subtitle: 'Цикл реагирования на инциденты и централизованный мониторинг SIEM',
    badge: 'NIST SP 800-61 & SIEM',
    description: 'Шесть непрерывных фаз Incident Response: от подготовки и обнаружения аномалий до изоляции, восстановления систем и безнаказанного разбора постмортема.',
    svgContent: `<svg viewBox="0 0 690 174" style="width:100%;min-width:550px;height:auto;" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead20" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#9ca3af"/></marker></defs><g transform="translate(40,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#7c3aed14" stroke="#7c3aed" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">📋</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">Preparation</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">IR Plan & CSIRT</text>
</g><g transform="translate(210,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00679914" stroke="#006799" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🚨</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#006799" font-weight="700" font-family="Segoe UI,Arial">Detection</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">SIEM / Sentinel</text>
</g><g transform="translate(380,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#e53e3e14" stroke="#e53e3e" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🔒</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#e53e3e" font-weight="700" font-family="Segoe UI,Arial">Containment</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Изоляция сети</text>
</g><g transform="translate(550,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00a86b14" stroke="#00a86b" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">♻️</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">Recovery</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Бэкапы & Post-Mortem</text>
</g><line x1="140" y1="87.0" x2="202" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead20)"/><text x="175.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">алерт</text><line x1="310" y1="87.0" x2="372" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead20)"/><text x="345.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">карантин</text><line x1="480" y1="87.0" x2="542" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead20)"/><text x="515.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">чистка</text></svg>`
  },
  21: {
    lessonId: 21,
    title: 'Карьерный путь в IT: От L1 Support к Экспертизе',
    subtitle: 'Этапы трудоустройства: ATS-резюме, оптимизация LinkedIn и метод STAR на интервью',
    badge: 'IT Career Roadmap 2026',
    description: 'Резюме должно быть выверено под ключевые слова ATS, профиль LinkedIn настроен для поисковых алгоритмов рекрутеров, а ответы на интервью выстроены по структуре STAR.',
    svgContent: `<svg viewBox="0 0 690 174" style="width:100%;min-width:550px;height:auto;" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead21" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#9ca3af"/></marker></defs><g transform="translate(40,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#7c3aed14" stroke="#7c3aed" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">📄</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">Резюме</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">ATS-friendly</text>
</g><g transform="translate(210,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00679914" stroke="#006799" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🤖</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#006799" font-weight="700" font-family="Segoe UI,Arial">ATS Сканер</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Ключевые слова</text>
</g><g transform="translate(380,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#0ea5e914" stroke="#0ea5e9" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🧑‍💼</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#0ea5e9" font-weight="700" font-family="Segoe UI,Arial">Рекрутер</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">7-10 секунд</text>
</g><g transform="translate(550,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00a86b14" stroke="#00a86b" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🎤</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">Интервью</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">STAR метод</text>
</g><line x1="140" y1="87.0" x2="202" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead21)"/><text x="175.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">сканирование</text><line x1="310" y1="87.0" x2="372" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead21)"/><text x="345.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">прошел</text><line x1="480" y1="87.0" x2="542" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead21)"/><text x="515.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">вызов</text></svg>`
  },
  22: {
    lessonId: 22,
    title: 'Карта IT-сертификаций 2026: От Foundational до Expert',
    subtitle: 'Дорожная карта на 12-36 месяцев: CompTIA A+, Microsoft AZ-900, AWS CCP, CCNA & Security',
    badge: 'IT Certifications Matrix 2026',
    description: 'Стратегия пошагового получения международно признанных сертификатов для роста зарплаты и быстрого карьерного перехода.',
    svgContent: `<svg viewBox="0 0 690 174" style="width:100%;min-width:550px;height:auto;" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead22" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#9ca3af"/></marker></defs><g transform="translate(40,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#7c3aed14" stroke="#7c3aed" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🎓</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">Foundational</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Google IT / AZ-900</text>
</g><g transform="translate(210,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00679914" stroke="#006799" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🛠</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#006799" font-weight="700" font-family="Segoe UI,Arial">Associate</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">CompTIA A+ / Net+</text>
</g><g transform="translate(380,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#0ea5e914" stroke="#0ea5e9" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">☁️</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#0ea5e9" font-weight="700" font-family="Segoe UI,Arial">Professional</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">AZ-104 / AWS SAA</text>
</g><g transform="translate(550,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00a86b14" stroke="#00a86b" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🔒</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">Expert</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Security+ / CISSP</text>
</g><line x1="140" y1="87.0" x2="202" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead22)"/><text x="175.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">0-6 мес</text><line x1="310" y1="87.0" x2="372" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead22)"/><text x="345.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">6-18 мес</text><line x1="480" y1="87.0" x2="542" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead22)"/><text x="515.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">18-36 мес</text></svg>`
  },
  23: {
    lessonId: 23,
    title: 'Финальный проект: Полный рабочий день IT Support',
    subtitle: 'Симуляция рабочего дня: 8 тикетов L1-L2, сеть, Active Directory, безопасность и KB-статьи',
    badge: 'IT Support Final Simulation',
    description: 'Решение реальных инцидентов в условиях приоритизации P1-P4: от недоступности контроллера домена и ransomware до системных принтеров и скриптов PowerShell.',
    svgContent: `<svg viewBox="0 0 690 174" style="width:100%;min-width:550px;height:auto;" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead23" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#9ca3af"/></marker></defs><g transform="translate(40,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#e53e3e14" stroke="#e53e3e" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🚨</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#e53e3e" font-weight="700" font-family="Segoe UI,Arial">Приоритизация</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">P1 - P4 Тикеты</text>
</g><g transform="translate(210,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00679914" stroke="#006799" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🔍</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#006799" font-weight="700" font-family="Segoe UI,Arial">Troubleshooting</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Изоляция & Поиск</text>
</g><g transform="translate(380,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#7c3aed14" stroke="#7c3aed" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🛠</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">Решение</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">AD / PowerShell / Net</text>
</g><g transform="translate(550,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00a86b14" stroke="#00a86b" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">📝</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">KB & Отчет</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">Документирование</text>
</g><line x1="140" y1="87.0" x2="202" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead23)"/><line x1="310" y1="87.0" x2="372" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead23)"/><line x1="480" y1="87.0" x2="542" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead23)"/></svg>`
  },
  24: {
    lessonId: 24,
    title: 'Diagram — Занятие 24',
    subtitle: 'Церемония завершения и сертификация',
    badge: 'Карьерная траектория',
    description: 'Курс — это только первый шаг: дальше путь ведёт через сертификации к росту от Junior до Senior специалиста.',
    svgContent: `<svg viewBox="0 0 690 174" style="width:100%;min-width:550px;height:auto;" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead24" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#9ca3af"/></marker></defs><g transform="translate(40,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#7c3aed14" stroke="#7c3aed" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🎓</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#7c3aed" font-weight="700" font-family="Segoe UI,Arial">Курс пройден</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">24 урока</text>
</g><g transform="translate(210,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00679914" stroke="#006799" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">📜</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#006799" font-weight="700" font-family="Segoe UI,Arial">Network+/Sec+</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">сертификация</text>
</g><g transform="translate(380,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#00a86b14" stroke="#00a86b" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🧑‍💻</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#00a86b" font-weight="700" font-family="Segoe UI,Arial">Junior SysAdmin</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">первая работа</text>
</g><g transform="translate(550,60)">
<rect x="0" y="0" width="100" height="54" rx="8" fill="#e53e3e14" stroke="#e53e3e" stroke-width="2"/>
<text x="50.0" y="22" text-anchor="middle" font-size="20">🚀</text>
<text x="50.0" y="38" text-anchor="middle" font-size="10" fill="#e53e3e" font-weight="700" font-family="Segoe UI,Arial">Middle/Senior</text>
<text x="50.0" y="49" text-anchor="middle" font-size="8" fill="#6b7280" font-family="monospace">карьерный рост</text>
</g><line x1="140" y1="87.0" x2="202" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead24)"/><text x="175.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">дальше</text><line x1="310" y1="87.0" x2="372" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead24)"/><text x="345.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">найм</text><line x1="480" y1="87.0" x2="542" y2="87.0" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrowhead24)"/><text x="515.0" y="79.0" text-anchor="middle" font-size="9" fill="#9ca3af" font-family="monospace">рост</text></svg>`
  }
};
