import React from 'react';
import { ShieldCheck, Cpu, ExternalLink } from 'lucide-react';

interface DevOpsAcademyCertificateProps {
  studentName?: string;
  verificationCode?: string;
  credentialUrl?: string;
  issueDate?: string;
  courseTitle?: string;
  academicHours?: string;
  finalScoreText?: string;
  directorTitle?: string;
  directorName?: string;
  isPrintMode?: boolean;
}

export const DevOpsAcademyCertificate: React.FC<DevOpsAcademyCertificateProps> = ({
  studentName = 'Ахрорджон Турдиев',
  verificationCode = 'DA-AI-2026-8841',
  credentialUrl,
  issueDate = '08 августа 2026 года',
  courseTitle = '«ИИ для Жизни: Вайб-кодинг, Автономные Агенты и ИИ-Инженерия»',
  academicHours = '36 академических часов (24 урока · 6 модулей · 6 проектов)',
  finalScoreText = '«Отлично» — 98%',
  directorTitle = 'Директор DEVOPS Academy',
  directorName = 'Ахрорджон Турдиев',
  isPrintMode = false,
}) => {
  const effectiveCredentialUrl =
    credentialUrl || `https://devops-academy.org/verify/${verificationCode}`;

  return (
    <div
      className={`relative w-full overflow-hidden select-none font-sans ${
        isPrintMode
          ? 'bg-[#030712] text-white p-0 m-0 w-[297mm] h-[210mm] max-w-[297mm] max-h-[210mm] box-border'
          : 'bg-[#030712] text-white rounded-3xl border border-cyan-500/40 shadow-[0_0_70px_rgba(6,182,212,0.18),0_0_120px_rgba(168,85,247,0.12)] p-4 sm:p-8 md:p-10'
      }`}
      style={{
        aspectRatio: '1.414 / 1',
      }}
    >
      {/* 1. Deep Black & Dark Navy Volumetric Environment */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0d1b3e_0%,_#050b1a_52%,_#02040a_100%)] pointer-events-none" />

      {/* 2. Volumetric Sci-Fi Lighting: Electric Cyan, Neon Blue & Purple Glow */}
      <div className="absolute -top-28 left-1/4 w-[420px] h-[220px] bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-28 right-1/4 w-[420px] h-[220px] bg-purple-600/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[280px] bg-blue-600/10 rounded-full blur-[110px] pointer-events-none" />

      {/* 3. Perspective Floating Transport Grid & Holographic Packet Overlay */}
      <div
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6, 182, 212, 0.22) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.22) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse at center, black 35%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 35%, transparent 85%)',
        }}
      />

      {/* 4. Holographic Neural & TCP/UDP Packet Stream SVG Vector Architecture */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.12] pointer-events-none">
        <svg className="w-[620px] h-[620px] text-cyan-400" viewBox="0 0 400 400" fill="none" stroke="currentColor">
          {/* Outer transport rings */}
          <circle cx="200" cy="200" r="185" strokeWidth="0.6" strokeDasharray="3 6" />
          <circle cx="200" cy="200" r="165" strokeWidth="1" stroke="url(#cyberGrad)" />
          <circle cx="200" cy="200" r="142" strokeWidth="0.5" strokeDasharray="8 4" />
          <circle cx="200" cy="200" r="115" strokeWidth="0.4" />
          {/* Hexagonal protocol matrix */}
          <polygon
            points="200,35 343,117 343,283 200,365 57,283 57,117"
            strokeWidth="0.7"
            stroke="url(#cyberGrad)"
            strokeDasharray="6 3"
          />
          <polygon
            points="200,65 317,132 317,268 200,335 83,268 83,132"
            strokeWidth="0.5"
          />
          {/* Packet routing lines */}
          <line x1="15" y1="200" x2="385" y2="200" strokeWidth="0.4" strokeDasharray="4 4" />
          <line x1="200" y1="15" x2="200" y2="385" strokeWidth="0.4" strokeDasharray="4 4" />
          {/* Packet nodes */}
          <circle cx="200" cy="35" r="3.5" fill="#00f0ff" />
          <circle cx="343" cy="117" r="3.5" fill="#a855f7" />
          <circle cx="343" cy="283" r="3.5" fill="#00f0ff" />
          <circle cx="200" cy="365" r="3.5" fill="#a855f7" />
          <circle cx="57" cy="283" r="3.5" fill="#00f0ff" />
          <circle cx="57" cy="117" r="3.5" fill="#a855f7" />
          <defs>
            <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 5. Outer Laser-Etched Cyber Frame & Double Inner Perimeter */}
      <div className="absolute inset-2.5 sm:inset-4 md:inset-5 border border-cyan-500/35 rounded-2xl pointer-events-none shadow-[inset_0_0_30px_rgba(6,182,212,0.08)]">
        <div className="absolute inset-1.5 sm:inset-2 border border-purple-500/30 rounded-xl" />
      </div>

      {/* 6. Cyberpunk Corner HUD Brackets */}
      {/* Top Left */}
      <div className="absolute top-3.5 left-3.5 sm:top-6 sm:left-6 text-cyan-400 w-9 h-9 sm:w-12 sm:h-12 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5">
          <path d="M4,42 L4,10 L10,4 L42,4" />
          <path d="M14,26 L14,14 L26,14" strokeWidth="2" stroke="#a855f7" />
          <circle cx="8" cy="8" r="3" fill="#00f0ff" />
        </svg>
      </div>
      {/* Top Right */}
      <div className="absolute top-3.5 right-3.5 sm:top-6 sm:right-6 text-cyan-400 w-9 h-9 sm:w-12 sm:h-12 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5">
          <path d="M96,42 L96,10 L90,4 L58,4" />
          <path d="M86,26 L86,14 L74,14" strokeWidth="2" stroke="#a855f7" />
          <circle cx="92" cy="8" r="3" fill="#00f0ff" />
        </svg>
      </div>
      {/* Bottom Left */}
      <div className="absolute bottom-3.5 left-3.5 sm:bottom-6 sm:left-6 text-cyan-400 w-9 h-9 sm:w-12 sm:h-12 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5">
          <path d="M4,58 L4,90 L10,96 L42,96" />
          <path d="M14,74 L14,86 L26,86" strokeWidth="2" stroke="#a855f7" />
          <circle cx="8" cy="92" r="3" fill="#00f0ff" />
        </svg>
      </div>
      {/* Bottom Right */}
      <div className="absolute bottom-3.5 right-3.5 sm:bottom-6 sm:right-6 text-cyan-400 w-9 h-9 sm:w-12 sm:h-12 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5">
          <path d="M96,58 L96,90 L90,96 L58,96" />
          <path d="M86,74 L86,86 L74,86" strokeWidth="2" stroke="#a855f7" />
          <circle cx="92" cy="92" r="3" fill="#00f0ff" />
        </svg>
      </div>

      {/* 7. Main Certificate Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-7 md:p-9 text-center">
        
        {/* Top Header: DEVOPS ACADEMY Brand & Coursera-style Credential ID / URL */}
        <div className="flex items-center justify-between border-b border-cyan-500/25 pb-2.5 sm:pb-3.5 gap-3">
          {/* Left: Academy Identity */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 text-left">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-[1.5px] shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#04091a] rounded-[10px] flex items-center justify-center text-cyan-400">
                <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-lg md:text-xl font-black tracking-wider text-white">
                  DEVOPS <span className="text-cyan-400">ACADEMY</span>
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs sm:text-sm font-extrabold tracking-widest text-purple-400 uppercase">
                  ИИ ДЛЯ ЖИЗНИ
                </span>
              </div>
              <div className="text-[8px] sm:text-[10px] text-cyan-200/80 font-mono tracking-wider uppercase">
                ИИ-инженерия нового поколения · Вайб-кодинг · Автономные агенты
              </div>
            </div>
          </div>

          {/* Right: Coursera-Style Credential ID & Credential URL Box */}
          <div className="text-right bg-[#071026]/90 border border-cyan-500/35 rounded-xl px-3 py-1.5 shadow-[inset_0_0_15px_rgba(6,182,212,0.12)]">
            <div className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-widest font-mono flex items-center justify-end gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>CREDENTIAL ID:</span>
              <span className="text-cyan-300 font-black tracking-wider tabular-nums">{verificationCode}</span>
            </div>
            <div className="text-[7px] sm:text-[9px] text-purple-300/90 font-mono tracking-tight mt-0.5 truncate max-w-[190px] sm:max-w-[270px]">
              Credential URL: {effectiveCredentialUrl}
            </div>
          </div>
        </div>

        {/* Center Section: Diploma Title, Student Name & Translated Course Name */}
        <div className="my-auto space-y-2.5 sm:space-y-3.5 py-2">
          
          {/* Kicker & Main Title */}
          <div className="space-y-1.5">
            <div className="text-[9px] sm:text-[11px] font-mono uppercase tracking-[0.28em] text-cyan-400/95">
              ОФИЦИАЛЬНОЕ СВИДЕТЕЛЬСТВО О КВАЛИФИКАЦИИ
            </div>
            <h1 className="text-xl sm:text-3xl md:text-4xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-purple-300 uppercase drop-shadow-[0_2px_15px_rgba(6,182,212,0.35)]">
              СЕРТИФИКАТ ВЫПУСКНИКА АКАДЕМИИ
            </h1>
            <div className="w-48 sm:w-72 h-[1.5px] mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          </div>

          {/* Confirmation Line */}
          <p className="text-[10px] sm:text-xs text-slate-300 font-mono tracking-[0.2em] uppercase">
            НАСТОЯЩИМ ПОДТВЕРЖДАЕТСЯ, ЧТО ИНЖЕНЕР-ПРАКТИК
          </p>

          {/* Student Name with Holographic Backlight */}
          <div className="relative inline-block my-1 px-6 sm:px-14 py-1.5 sm:py-2">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/15 to-purple-500/10 blur-md rounded-xl" />
            <h2 className="relative text-2xl sm:text-4xl md:text-[44px] leading-tight font-black text-white tracking-tight border-b-2 border-cyan-400/80 pb-1.5 px-4 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              {studentName}
            </h2>
          </div>

          {/* Program Description */}
          <p className="text-[11px] sm:text-xs md:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            успешно выполнил(а) все практические и лабораторные миссии, защитил(а) дипломный проект и завершил(а) профессиональный курс
          </p>

          {/* Course Title Highlight (Translated) */}
          <div className="text-base sm:text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-purple-300 tracking-wide px-2">
            {courseTitle}
          </div>

          {/* Scope & Final Grade Telemetry Row */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs">
            <div className="text-slate-300 font-mono">
              Академический объём: <strong className="text-white font-bold">{academicHours}</strong>
            </div>
            <span className="text-cyan-500/50 hidden sm:inline">•</span>
            <div className="text-cyan-300 font-mono">
              Итоговая аттестация: <strong className="text-white font-extrabold">{finalScoreText}</strong>
            </div>
          </div>
        </div>

        {/* Bottom Footer: Date/Credential Verification, Holographic Seal, Director Signature (Ahrorjon T) */}
        <div className="border-t border-cyan-500/25 pt-2.5 sm:pt-3.5 grid grid-cols-3 items-end text-left gap-2 sm:gap-4">
          
          {/* Left Column: Issue Date & Coursera/LinkedIn Verification Info */}
          <div className="space-y-1">
            <div>
              <span className="block text-[8px] sm:text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                ДАТА ВЫДАЧИ ДИПЛОМА:
              </span>
              <span className="text-xs sm:text-sm font-bold text-white font-mono tabular-nums">{issueDate}</span>
            </div>
            <div className="text-[7px] sm:text-[9px] text-cyan-300/80 font-mono leading-tight">
              Верификация для LinkedIn / Coursera: {verificationCode}
            </div>
          </div>

          {/* Center Column: Holographic Seal of Authenticity */}
          <div className="flex justify-center items-center">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-cyan-400/80 flex items-center justify-center p-1 bg-[radial-gradient(circle,_rgba(6,182,212,0.18)_0%,_rgba(168,85,247,0.08)_60%,_transparent_100%)] shadow-[0_0_25px_rgba(6,182,212,0.3)]">
              <div className="w-full h-full rounded-full border border-dashed border-purple-400/70 flex flex-col items-center justify-center text-center p-1 relative">
                <div className="text-[6px] sm:text-[7px] font-black text-cyan-300 uppercase tracking-tighter font-mono">
                  DEVOPS ACADEMY
                </div>
                <div className="w-6 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent my-0.5" />
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 my-0.5" />
                <div className="text-[6px] sm:text-[7px] font-bold text-white uppercase tracking-widest">
                  ИИ ДЛЯ ЖИЗНИ
                </div>
                <div className="text-[5px] sm:text-[6px] text-purple-300 font-mono">
                  VERIFIED · 2026
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Director Digital & Calligraphic Signature "Ahrorjon T" */}
          <div className="text-right space-y-0.5">
            <div className="text-[8px] sm:text-[10px] text-slate-400 font-mono uppercase tracking-wider">
              {directorTitle}
            </div>

            {/* Holographic Calligraphic Signature with "Ahrorjon T" */}
            <div className="h-9 sm:h-12 flex justify-end items-center my-0.5">
              <svg
                className="h-full w-36 sm:w-48 drop-shadow-[0_0_10px_rgba(34,211,238,0.65)]"
                viewBox="0 0 260 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="sigGradAhror" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="60%" stopColor="#e0f2fe" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                </defs>
                {/* Stylized Calligraphic "A" flourish */}
                <path
                  d="M14,52 C22,22 34,8 40,12 C44,15 39,40 37,50 C36,54 44,36 52,32"
                  stroke="url(#sigGradAhror)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Crossbar & sweeping loop */}
                <path
                  d="M18,36 C32,30 50,26 64,28"
                  stroke="url(#sigGradAhror)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                {/* Calligraphic Handwritten "Ahrorjon T." text */}
                <text
                  x="26"
                  y="44"
                  fill="url(#sigGradAhror)"
                  fontFamily="'Brush Script MT', 'Segoe Script', 'Snell Roundhand', 'Apple Chancery', cursive"
                  fontSize="30"
                  fontStyle="italic"
                  fontWeight="700"
                  letterSpacing="0.5"
                >
                  Ahrorjon T.
                </text>
                {/* Executive Paraph / Underline Flourish */}
                <path
                  d="M20,56 C75,46 155,44 238,50 C248,51 232,58 205,60 C165,63 95,62 55,64"
                  stroke="url(#sigGradAhror)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                {/* Fountain pen accent dots */}
                <circle cx="244" cy="49" r="1.8" fill="#22d3ee" />
              </svg>
            </div>

            <div className="text-xs sm:text-sm font-bold text-white border-t border-cyan-500/30 pt-1 inline-block">
              {directorName}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
