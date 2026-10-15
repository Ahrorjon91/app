import React, { useState, useEffect } from 'react';
import { usePortal } from '../context/PortalContext';
import {
  ShieldCheck,
  Printer,
  Download,
  Check,
  Copy,
  UserCheck,
  Lock,
  Edit3,
  ShieldAlert,
  Settings,
  Save,
  Trash2,
  FileCheck,
  Send,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  Eye,
  Cpu,
  Database,
  ExternalLink,
  Link2,
  Share2,
  Award
} from 'lucide-react';
import { DevOpsAcademyCertificate } from '../components/DevOpsAcademyCertificate';
import { CertificateData, UserAccount } from '../types';

const DEFAULT_AI_COURSE_TITLE = '«ИИ для Жизни: Вайб-кодинг, Автономные Агенты и ИИ-Инженерия»';
const DEFAULT_ACADEMIC_HOURS = '36 академических часов (24 урока · 6 модулей · 6 проектов)';
const DEFAULT_DIRECTOR_TITLE = 'Директор DEVOPS Academy';

export const CertificatesPage: React.FC = () => {
  const {
    profile,
    userAccounts,
    certificates,
    saveCertificate,
    deleteCertificate,
    syncDataToSheets,
    testScores,
    quizSubmissions,
    completedLessons,
    setActivePage
  } = usePortal();

  const isMentor = profile.role === 'admin';
  const [previewAsStudent, setPreviewAsStudent] = useState<boolean>(false);
  const [showSpecimenPreview, setShowSpecimenPreview] = useState<boolean>(true);

  const studentOfficialName = profile.name || 'Студент';
  const [customStudentName, setCustomStudentName] = useState<string>(
    isMentor ? 'Ахрорджон Турдиев' : studentOfficialName
  );

  // Mentor editable certificate parameters (DEVOPS Academy)
  const [verificationCode, setVerificationCode] = useState<string>('DA-AI-2026-8841');
  const [courseTitle, setCourseTitle] = useState<string>(DEFAULT_AI_COURSE_TITLE);
  const [academicHours, setAcademicHours] = useState<string>(DEFAULT_ACADEMIC_HOURS);
  const [finalScoreText, setFinalScoreText] = useState<string>('«Отлично» — 98%');
  const [issueDate, setIssueDate] = useState<string>('08 августа 2026 года');
  const [directorTitle, setDirectorTitle] = useState<string>(DEFAULT_DIRECTOR_TITLE);
  const [directorName, setDirectorName] = useState<string>('Ахрорджон Турдиев');

  const [showMentorSettings, setShowMentorSettings] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [confirmStatusMsg, setConfirmStatusMsg] = useState<string | null>(null);

  // 1. Calculate Student's Final Exam Condition
  const myEmailLower = String(profile.email || '').toLowerCase().trim();
  const myNameLower = String(profile.name || '').toLowerCase().trim();
  const myId = String(profile.id || '').trim();

  const finalExamData = testScores['FINAL_EXAM'];
  const finalExamSub = (quizSubmissions || []).find(
    (q) =>
      (q.quizId === 'FINAL_EXAM' || q.quizId === 'FINAL') &&
      ((q.studentEmail && q.studentEmail.toLowerCase().trim() === myEmailLower) ||
       (q.studentId && q.studentId === myId) ||
       (!q.studentEmail && !q.studentId))
  );

  const examScorePct = finalExamData?.scorePct ?? finalExamSub?.scorePct ?? 0;
  const isFinalExamPassed = Boolean(
    (finalExamData?.passed && examScorePct >= 85) ||
    (finalExamSub?.passed && examScorePct >= 85) ||
    (examScorePct >= 85)
  );
  const examCompletedAt = finalExamData?.completedAt || finalExamSub?.submittedAt || '';

  // 2. Calculate Student's Mentor Confirmation Condition
  const myCert = (certificates || []).find(
    (c) =>
      (c.studentEmail && String(c.studentEmail).toLowerCase().trim() === myEmailLower) ||
      (c.studentName && String(c.studentName).toLowerCase().trim() === myNameLower)
  );

  const isMentorConfirmed = Boolean(
    myCert &&
    myCert.mentorConfirmed !== false &&
    myCert.status !== 'Rejected' &&
    (myCert.mentorConfirmed === true || myCert.status === 'Approved' || myCert.issuedAt)
  );

  // Overall Lock determination for current user
  const effectiveIsMentor = isMentor && !previewAsStudent;
  const isCertificateUnlocked = effectiveIsMentor || (isFinalExamPassed && isMentorConfirmed);

  const completedConditionsCount = (isFinalExamPassed ? 1 : 0) + (isMentorConfirmed ? 1 : 0);

  // Normalize legacy or English course names to Russian translated AI for LIFE title
  const normalizeCourseTitle = (rawTitle?: string) => {
    if (
      !rawTitle ||
      rawTitle.includes('Системный администратор') ||
      rawTitle.includes('Vibe Coding, Autonomous Agents & AI Engineering')
    ) {
      return DEFAULT_AI_COURSE_TITLE;
    }
    return rawTitle;
  };

  // Auto-fill student's certificate if exists
  useEffect(() => {
    if (!effectiveIsMentor && certificates && certificates.length > 0) {
      if (myCert) {
        if (myCert.certificateId) setVerificationCode(myCert.certificateId);
        if (myCert.courseName) setCourseTitle(normalizeCourseTitle(myCert.courseName));
        if (myCert.issuedAt) setIssueDate(myCert.issuedAt);
        if (myCert.finalScoreText) setFinalScoreText(myCert.finalScoreText);
        if (myCert.directorName) setDirectorName(myCert.directorName);
      }
    }
  }, [effectiveIsMentor, certificates, myCert]);

  // Security enforcement: For students, name is strictly locked to profile.name
  const effectiveStudentName = effectiveIsMentor ? customStudentName : studentOfficialName;

  // Coursera-style Credential URL & LinkedIn Add-to-Profile URL
  const originUrl = typeof window !== 'undefined' ? window.location.origin : 'https://devops-academy.org';
  const credentialUrl = `${originUrl}/verify/${verificationCode}`;
  const cleanCourseNameForLinkedIn = courseTitle.replace(/[«»]/g, '');
  const linkedInAddCertificationUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
    cleanCourseNameForLinkedIn
  )}&organizationName=${encodeURIComponent(
    'DEVOPS Academy'
  )}&issueYear=2026&issueMonth=8&certUrl=${encodeURIComponent(
    credentialUrl
  )}&certId=${encodeURIComponent(verificationCode)}`;

  const handleCopySingleField = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(key);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSaveToRegistry = async () => {
    const targetNameLower = String(customStudentName || '').toLowerCase().trim();
    const selectedUser = userAccounts.find(
      (u) => u && u.name && String(u.name).toLowerCase().trim() === targetNameLower
    );
    const targetEmail = selectedUser ? selectedUser.email : profile.email || 'student@devopspro.tech';

    const certData: CertificateData = {
      certificateId: verificationCode,
      studentName: effectiveStudentName,
      studentEmail: targetEmail,
      courseName: courseTitle,
      issuedAt: issueDate,
      verificationUrl: credentialUrl,
      finalScoreText,
      academicHours,
      directorName,
      mentorConfirmed: true,
      confirmedByMentor: profile.name || 'Ахрорджон Турдиев',
      confirmedAt: new Date().toLocaleDateString('ru-RU'),
      status: 'Approved'
    };

    await saveCertificate(certData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // One-click confirmation for any student by mentor
  const handleConfirmStudent = async (student: UserAccount) => {
    const sEmail = student.email || 'student@devopspro.tech';
    const sName = student.name || 'Студент';
    const sEmailLower = sEmail.toLowerCase().trim();

    const sSub = (quizSubmissions || []).find(
      (q) =>
        (q.quizId === 'FINAL_EXAM' || q.quizId === 'FINAL') &&
        ((q.studentEmail && q.studentEmail.toLowerCase().trim() === sEmailLower) ||
         (q.studentId && q.studentId === student.id))
    );
    const sScore = sSub?.scorePct || 98;

    const existingCert = (certificates || []).find(
      (c) =>
        (c.studentEmail && c.studentEmail.toLowerCase().trim() === sEmailLower) ||
        (c.studentName && c.studentName.toLowerCase().trim() === sName.toLowerCase().trim())
    );

    const certId = existingCert?.certificateId || `DA-AI-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const certData: CertificateData = {
      certificateId: certId,
      studentName: sName,
      studentEmail: sEmail,
      courseName: courseTitle,
      issuedAt: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' }),
      verificationUrl: `${originUrl}/verify/${certId}`,
      finalScoreText: `«Отлично» — ${sScore}%`,
      academicHours: DEFAULT_ACADEMIC_HOURS,
      directorName: directorName,
      mentorConfirmed: true,
      confirmedByMentor: profile.name || 'Ахрорджон Турдиев',
      confirmedAt: new Date().toLocaleDateString('ru-RU'),
      status: 'Approved'
    };

    await saveCertificate(certData);
    setConfirmStatusMsg(`Сертификат для ${sName} успешно верифицирован и внесен в реестр DEVOPS Academy!`);
    setTimeout(() => setConfirmStatusMsg(null), 4000);
  };

  // Revoke confirmation
  const handleRevokeStudent = async (certId: string) => {
    const existingCert = (certificates || []).find((c) => c.certificateId === certId);
    if (existingCert) {
      await saveCertificate({
        ...existingCert,
        mentorConfirmed: false,
        status: 'Pending'
      });
      setConfirmStatusMsg(`Подтверждение сертификата ${certId} отозвано.`);
      setTimeout(() => setConfirmStatusMsg(null), 4000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyVerification = () => {
    const info = `Официальный сертификат DEVOPS ACADEMY\nВыпускник: ${effectiveStudentName}\nCredential ID: ${verificationCode}\nCredential URL: ${credentialUrl}\nПрограмма: ${courseTitle}\nОбъём: ${academicHours}\nКвалификация: ${finalScoreText}\nДата выдачи: ${issueDate}\n${directorTitle}: ${directorName}`;
    navigator.clipboard.writeText(info);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleDownloadHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Сертификат DEVOPS Academy — ${effectiveStudentName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700;800&family=Montserrat:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 landscape;
      margin: 0;
    }
    body {
      margin: 0;
      padding: 0;
      background-color: #030712;
      font-family: 'Montserrat', sans-serif;
      color: #ffffff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .cert-container {
      width: 297mm;
      height: 210mm;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      background: radial-gradient(ellipse at top, #0d1b3e 0%, #050b1a 55%, #02040a 100%);
      padding: 36px 48px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
    }
    .grid-overlay {
      position: absolute;
      inset: 0;
      background-image: linear-gradient(to right, rgba(6, 182, 212, 0.14) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(6, 182, 212, 0.14) 1px, transparent 1px);
      background-size: 36px 36px;
      pointer-events: none;
    }
    .outer-border {
      position: absolute;
      top: 18px;
      left: 18px;
      right: 18px;
      bottom: 18px;
      border: 1px solid rgba(6, 182, 212, 0.45);
      border-radius: 16px;
      box-shadow: inset 0 0 35px rgba(6, 182, 212, 0.12);
      pointer-events: none;
    }
    .inner-border {
      position: absolute;
      top: 7px;
      left: 7px;
      right: 7px;
      bottom: 7px;
      border: 1px solid rgba(168, 85, 247, 0.35);
      border-radius: 12px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(6, 182, 212, 0.25);
      padding-bottom: 14px;
      z-index: 10;
    }
    .brand {
      text-align: left;
    }
    .brand-title {
      font-size: 22px;
      font-weight: 900;
      letter-spacing: 1.5px;
    }
    .brand-title .cyan { color: #22d3ee; }
    .brand-title .purple { color: #c084fc; font-size: 16px; margin-left: 8px; }
    .brand-sub {
      font-size: 10px;
      color: #67e8f9;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-family: 'JetBrains Mono', monospace;
      margin-top: 3px;
    }
    .verif-box {
      text-align: right;
      background: rgba(7, 16, 38, 0.9);
      border: 1px solid rgba(6, 182, 212, 0.35);
      padding: 8px 14px;
      border-radius: 10px;
    }
    .verif-label {
      font-size: 10px;
      color: #94a3b8;
      text-transform: uppercase;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 1px;
    }
    .verif-label strong {
      color: #67e8f9;
      font-size: 13px;
    }
    .verif-url {
      font-size: 9px;
      color: #c084fc;
      font-family: 'JetBrains Mono', monospace;
      margin-top: 2px;
    }
    .main-section {
      z-index: 10;
      margin: auto 0;
    }
    .kicker {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: #22d3ee;
      letter-spacing: 3.5px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .title {
      font-size: 38px;
      font-weight: 900;
      letter-spacing: 2px;
      color: #ffffff;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .divider {
      width: 260px;
      height: 2px;
      background: linear-gradient(90deg, transparent, #22d3ee, #a855f7, transparent);
      margin: 10px auto 16px auto;
    }
    .intro {
      font-size: 11px;
      color: #cbd5e1;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      font-family: 'JetBrains Mono', monospace;
      margin-bottom: 14px;
    }
    .student-name {
      font-size: 44px;
      font-weight: 900;
      color: #ffffff;
      border-bottom: 2px solid #22d3ee;
      display: inline-block;
      padding: 0 36px 8px 36px;
      margin-bottom: 16px;
      text-shadow: 0 0 20px rgba(34, 211, 238, 0.35);
    }
    .course-text {
      font-size: 14px;
      color: #cbd5e1;
      margin-bottom: 10px;
    }
    .course-title {
      font-size: 23px;
      font-weight: 800;
      color: #67e8f9;
      margin-bottom: 20px;
    }
    .stats-row {
      display: flex;
      justify-content: center;
      gap: 28px;
      font-size: 12px;
      color: #cbd5e1;
      font-family: 'JetBrains Mono', monospace;
    }
    .stats-row strong { color: #ffffff; }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-top: 1px solid rgba(6, 182, 212, 0.25);
      padding-top: 14px;
      z-index: 10;
    }
    .date-box { text-align: left; }
    .date-label {
      font-size: 9px;
      color: #94a3b8;
      text-transform: uppercase;
      font-family: 'JetBrains Mono', monospace;
    }
    .date-val {
      font-size: 13px;
      font-weight: 700;
      color: #ffffff;
      font-family: 'JetBrains Mono', monospace;
    }
    .signature-box { text-align: right; }
    .sig-role {
      font-size: 10px;
      color: #94a3b8;
      text-transform: uppercase;
      font-family: 'JetBrains Mono', monospace;
    }
    .sig-svg {
      height: 46px;
      margin: 4px 0;
    }
    .sig-name {
      font-size: 14px;
      font-weight: 700;
      color: #ffffff;
      border-top: 1px solid rgba(6, 182, 212, 0.35);
      padding-top: 4px;
      display: inline-block;
    }
  </style>
</head>
<body>
  <div class="cert-container">
    <div class="grid-overlay"></div>
    <div class="outer-border"><div class="inner-border"></div></div>
    
    <div class="header">
      <div class="brand">
        <div class="brand-title">DEVOPS <span class="cyan">ACADEMY</span> <span class="purple">· ИИ ДЛЯ ЖИЗНИ</span></div>
        <div class="brand-sub">ИИ-инженерия нового поколения · Вайб-кодинг · Автономные агенты</div>
      </div>
      <div class="verif-box">
        <div class="verif-label">CREDENTIAL ID: <strong>${verificationCode}</strong></div>
        <div class="verif-url">Credential URL: ${credentialUrl}</div>
      </div>
    </div>

    <div class="main-section">
      <div class="kicker">ОФИЦИАЛЬНОЕ СВИДЕТЕЛЬСТВО О КВАЛИФИКАЦИИ</div>
      <div class="title">Сертификат Выпускника Академии</div>
      <div class="divider"></div>
      <div class="intro">Настоящим подтверждается, что инженер-практик</div>
      <div class="student-name">${effectiveStudentName}</div>
      <div class="course-text">успешно выполнил(а) все практические и лабораторные миссии, защитил(а) дипломный проект и завершил(а) профессиональный курс</div>
      <div class="course-title">${courseTitle}</div>
      <div class="stats-row">
        <div>Академический объём: <strong>${academicHours}</strong></div>
        <div>Итоговая аттестация: <strong>${finalScoreText}</strong></div>
      </div>
    </div>

    <div class="footer">
      <div class="date-box">
        <div class="date-label">Дата выдачи диплома</div>
        <div class="date-val">${issueDate}</div>
      </div>
      <div class="signature-box">
        <div class="sig-role">${directorTitle}</div>
        <div class="sig-svg">
          <svg width="200" height="46" viewBox="0 0 260 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14,52 C22,22 34,8 40,12 C44,15 39,40 37,50 C36,54 44,36 52,32" stroke="#22d3ee" stroke-width="2.4" stroke-linecap="round"/>
            <text x="26" y="44" fill="#67e8f9" font-family="'Brush Script MT', 'Segoe Script', cursive" font-size="30" font-style="italic" font-weight="700">Ahrorjon T.</text>
            <path d="M20,56 C75,46 155,44 238,50 C248,51 232,58 205,60 C165,63 95,62 55,64" stroke="#22d3ee" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="sig-name">${directorName}</div>
      </div>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificate_DEVOPS_Academy_${effectiveStudentName.replace(/\s+/g, '_')}_${verificationCode}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const completedLessonsCount = completedLessons?.length || 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* CSS Rules for Clean A4 Landscape Printing */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #official-certificate-print-area, #official-certificate-print-area * {
            visibility: visible !important;
          }
          #official-certificate-print-area {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
            z-index: 999999 !important;
            background: #030712 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
        }
      `}</style>

      {/* Mentor Control Bar (Only for Admins/Mentors) */}
      {isMentor && (
        <div className="relative overflow-hidden p-4 rounded-[28px] bg-[#161618] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 relative z-10">
            <div className="p-2.5 rounded-full bg-[#000000] text-[#0071e3] border border-[#262629]">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#f5f5f7] flex items-center gap-2">
                <span>Центр Управления Сертификацией DEVOPS Academy</span>
                <span className="text-[#86868b]">·</span>
                <span className="text-[#0071e3] text-[10px] font-mono font-medium uppercase tracking-wider">
                  MENTOR ROOT
                </span>
              </div>
              <p className="text-[11px] text-[#86868b]">
                Верификация дипломов курса {DEFAULT_AI_COURSE_TITLE} и реестр выпускников
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 relative z-10">
            <button
              onClick={() => setPreviewAsStudent(!previewAsStudent)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 border whitespace-nowrap cursor-pointer ${
                previewAsStudent
                  ? 'bg-[#0071e3] text-white border-[#0071e3]'
                  : 'bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] border-[#333336]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{previewAsStudent ? 'Режим Наставника' : 'Экран Студента'}</span>
            </button>
            <button
              onClick={() => setShowMentorSettings(!showMentorSettings)}
              className="px-3.5 py-1.5 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] border border-[#333336] text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{showMentorSettings ? 'Скрыть параметры' : 'Параметры бланка'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Confirmation notification message */}
      {confirmStatusMsg && (
        <div className="p-3.5 rounded-[20px] bg-[#1c2e22] border border-[#00d959]/30 text-[#00d959] text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#00d959] shrink-0" />
          <span>{confirmStatusMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* APPLE MIDNIGHT HERO BANNER                                                */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden p-6 md:p-8 rounded-[28px] bg-[#000000] border border-white/[0.08]">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#86868b] uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-[#0071e3]" />
              <span className="text-[#f5f5f7]">DEVOPS ACADEMY</span>
              <span>·</span>
              <span>ОФИЦИАЛЬНОЕ СВИДЕТЕЛЬСТВО О КВАЛИФИКАЦИИ</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#f5f5f7] tracking-tight leading-tight">
              Сертификат Выпускника DEVOPS Academy
            </h1>

            <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
              Персональный академический диплом по программе{' '}
              <strong className="text-[#f5f5f7]">{DEFAULT_AI_COURSE_TITLE}</strong>.
              ИИ-инженерия нового поколения · Вайб-кодинг · Автономные агенты. Поддерживает прямую верификацию по{' '}
              <span className="text-[#f5f5f7] font-mono">Credential ID</span> и{' '}
              <span className="text-[#f5f5f7] font-mono">Credential URL</span> по стандарту Coursera для публикации в LinkedIn.
            </p>
          </div>

          {/* Right Telemetry Status Panel */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <div
              className={`p-4 rounded-[20px] border flex items-center gap-3.5 ${
                isCertificateUnlocked
                  ? 'bg-[#161618] border-[#00d959]/30'
                  : 'bg-[#161618] border-[#ff791b]/30'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  isCertificateUnlocked
                    ? 'bg-[#1c2e22] text-[#00d959]'
                    : 'bg-[#311400] text-[#ff791b]'
                }`}
              >
                {isCertificateUnlocked ? <ShieldCheck className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#86868b]">
                  СТАТУС ВЕРИФИКАЦИИ
                </div>
                <div
                  className={`text-xs font-semibold font-mono tracking-wide ${
                    isCertificateUnlocked ? 'text-[#00d959]' : 'text-[#ff791b]'
                  }`}
                >
                  {isCertificateUnlocked
                    ? 'АКТИВИРОВАН · VERIFIED'
                    : `ДОСТУП ЗАБЛОКИРОВАН (${completedConditionsCount}/2)`}
                </div>
              </div>
            </div>

            {/* Credential ID Strip */}
            {(effectiveIsMentor || isCertificateUnlocked) && (
              <div className="px-4 py-2 rounded-full bg-[#161618] border border-white/[0.08] flex items-center justify-between gap-4 text-[11px] font-mono">
                <span className="text-[#86868b]">CREDENTIAL ID:</span>
                <span className="text-[#0071e3] font-semibold tabular-nums">{verificationCode}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* COURSERA-STYLE CREDENTIAL ID / URL & LINKEDIN INTEGRATION PANEL           */}
      {/* ========================================================================= */}
      {effectiveIsMentor && (
      <div className="p-6 md:p-8 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#262629] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#0071e3] uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>CREDENTIAL STANDARD · LINKEDIN</span>
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-[#f5f5f7]">
              Верификация Credential ID / URL и добавление в LinkedIn
            </h2>
            <p className="text-xs text-[#86868b] max-w-3xl">
              Скопируйте реквизиты или используйте быстрый импорт в профиль LinkedIn.
            </p>
          </div>

          <a
            href={linkedInAddCertificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors shrink-0"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Добавить в профиль LinkedIn</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Highlighted Coursera-Style Credential ID & Credential URL Boxes */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Credential ID Card */}
          <div className="p-4 rounded-2xl bg-[#020611] border border-cyan-500/35 flex items-center justify-between gap-4 shadow-[inset_0_0_20px_rgba(6,182,212,0.06)]">
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Credential ID (Идентификатор учетных данных)</span>
              </div>
              <div className="text-base sm:text-lg font-black text-cyan-300 font-mono tracking-wider mt-1 truncate tabular-nums">
                {verificationCode}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Уникальный номер диплома в реестре DEVOPS Academy (формат Coursera)
              </div>
            </div>
            <button
              onClick={() => handleCopySingleField('credId', verificationCode)}
              className="px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all"
            >
              {copiedField === 'credId' ? (
                <>
                  <Check className="w-4 h-4 text-cyan-400" />
                  <span>Скопировано</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Копировать ID</span>
                </>
              )}
            </button>
          </div>

          {/* Credential URL Card */}
          <div className="p-4 rounded-2xl bg-[#020611] border border-purple-500/35 flex items-center justify-between gap-4 shadow-[inset_0_0_20px_rgba(168,85,247,0.06)]">
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Credential URL (URL-адрес учетных данных)</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-purple-300 font-mono mt-1 truncate">
                {credentialUrl}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Публичная ссылка для проверки подлинности диплома работодателем
              </div>
            </div>
            <button
              onClick={() => handleCopySingleField('credUrl', credentialUrl)}
              className="px-3.5 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-200 border border-purple-500/40 text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all"
            >
              {copiedField === 'credUrl' ? (
                <>
                  <Check className="w-4 h-4 text-purple-300" />
                  <span>Скопировано</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Копировать URL</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Complete LinkedIn Form Fields Guide */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="p-4 rounded-2xl bg-[#060d1f]/90 border border-slate-800/90 flex flex-col justify-between gap-2">
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                1. Название (Name в LinkedIn)
              </div>
              <div className="text-xs font-bold text-white mt-1 leading-snug">
                {cleanCourseNameForLinkedIn}
              </div>
            </div>
            <button
              onClick={() => handleCopySingleField('liName', cleanCourseNameForLinkedIn)}
              className="self-start text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 mt-1"
            >
              {copiedField === 'liName' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === 'liName' ? 'Скопировано!' : 'Скопировать название'}</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#060d1f]/90 border border-slate-800/90 flex flex-col justify-between gap-2">
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                2. Организация (Issuing Organization)
              </div>
              <div className="text-xs font-bold text-cyan-300 mt-1">
                DEVOPS Academy
              </div>
              <div className="text-[11px] text-slate-500">
                Подписант: {directorTitle} — {directorName}
              </div>
            </div>
            <button
              onClick={() => handleCopySingleField('liOrg', 'DEVOPS Academy')}
              className="self-start text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 mt-1"
            >
              {copiedField === 'liOrg' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === 'liOrg' ? 'Скопировано!' : 'Скопировать организацию'}</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#060d1f]/90 border border-slate-800/90 flex flex-col justify-between gap-2">
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                3. Дата выдачи (Issue Date)
              </div>
              <div className="text-xs font-bold text-white mt-1">
                {issueDate} (Бессрочно)
              </div>
              <div className="text-[11px] text-slate-500">
                Вручную в www.linkedin.com → Профиль → Добавить раздел → Лицензии и сертификаты
              </div>
            </div>
            <button
              onClick={() => handleCopySingleField('liDate', issueDate)}
              className="self-start text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 mt-1"
            >
              {copiedField === 'liDate' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === 'liDate' ? 'Скопировано!' : 'Скопировать дату'}</span>
            </button>
          </div>
        </div>
      </div>
      )}

      {/* ========================================================================= */}
      {/* CASE 1: CERTIFICATE IS LOCKED FOR STUDENT                                 */}
      {/* ========================================================================= */}
      {!isCertificateUnlocked && (
        <div className="space-y-6">
          {/* Main Locked Protocol Console */}
          <div className="p-6 md:p-8 rounded-3xl bg-[#040814] border border-rose-500/35 shadow-[0_0_50px_rgba(244,63,94,0.1)] relative overflow-hidden space-y-6">
            {/* Red Packet Alert & Cyan Ambient Glow */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-rose-500/10 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

            {/* Lock Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 relative z-10">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0 shadow-[0_0_25px_rgba(244,63,94,0.25)]">
                  <Lock className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="text-rose-400 font-bold uppercase tracking-wider">
                      ТРЕБУЕТСЯ АВТОРИЗАЦИЯ ВЫПУСКНИКА
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-cyan-300 font-bold tabular-nums">
                      Критериев выполнено: {completedConditionsCount} из 2
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-white">
                    Активация официального диплома DEVOPS Academy
                  </h2>
                  <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
                    Для генерации подписанного оригинала сертификата с уникальным Credential ID и Credential URL необходимо сдать
                    Финальный Экзамен и получить подтверждение директора академии.
                  </p>
                </div>
              </div>
            </div>

            {/* Telemetry Progress Bar */}
            <div className="space-y-2 relative z-10">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400 uppercase tracking-wider">ПРОГРЕСС РАЗБЛОКИРОВКИ СЕРТИФИКАЦИИ</span>
                <span className="font-bold text-cyan-400 tabular-nums">
                  {completedConditionsCount === 2 ? 100 : completedConditionsCount === 1 ? 50 : 0}%
                </span>
              </div>
              <div className="h-2.5 w-full bg-[#02050d] rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    completedConditionsCount === 2
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_15px_#00f0ff]'
                      : completedConditionsCount === 1
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500'
                      : 'bg-rose-500/60'
                  }`}
                  style={{ width: `${Math.max((completedConditionsCount / 2) * 100, 8)}%` }}
                />
              </div>
            </div>

            {/* Interactive Requirements Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
              {/* Requirement 1: Final Exam */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isFinalExamPassed
                    ? 'bg-[#041824]/90 border-cyan-500/45 text-slate-200 shadow-[0_0_25px_rgba(6,182,212,0.12)]'
                    : 'bg-[#070c1a]/95 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-xl border ${
                        isFinalExamPassed
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        ЭТАП 01 / 02
                      </div>
                      <h3 className="text-sm font-bold text-white">
                        Финальный Экзамен (24 Урока)
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
                      isFinalExamPassed ? 'text-cyan-400' : 'text-rose-400'
                    }`}
                  >
                    {isFinalExamPassed ? '● СДАН' : '▲ ЗАБЛОКИРОВАНО'}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Комплексная итоговая аттестация из 60 вопросов по курсу {DEFAULT_AI_COURSE_TITLE}. Проходной балл:{' '}
                  <strong className="text-cyan-300">85%+</strong>.
                </p>

                <div className="p-3.5 rounded-xl bg-[#030712] border border-slate-800/90 space-y-1.5 text-xs mb-4 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Результат тестирования:</span>
                    <span className={`font-bold tabular-nums ${isFinalExamPassed ? 'text-cyan-300' : 'text-rose-400'}`}>
                      {examScorePct > 0 ? `${examScorePct}% (минимум 85%)` : '0% · Ожидает сдачи'}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Пройдено уроков курса:</span>
                    <span className="text-slate-300 tabular-nums">{completedLessonsCount} / 24</span>
                  </div>
                  {examCompletedAt && (
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Временная метка:</span>
                      <span className="text-slate-300 tabular-nums">{examCompletedAt}</span>
                    </div>
                  )}
                </div>

                {!isFinalExamPassed ? (
                  <button
                    onClick={() => setActivePage('final-exam')}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-[0_0_25px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 transition-all"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Запустить Финальный Экзамен →</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-cyan-300 font-semibold bg-cyan-500/10 border border-cyan-500/30 py-2.5 px-3.5 rounded-xl font-mono">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-cyan-400" />
                    <span>Экзамен успешно сдан ({examScorePct}%)</span>
                  </div>
                )}
              </div>

              {/* Requirement 2: Mentor Confirmation */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isMentorConfirmed
                    ? 'bg-[#041824]/90 border-cyan-500/45 text-slate-200 shadow-[0_0_25px_rgba(6,182,212,0.12)]'
                    : 'bg-[#070c1a]/95 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-xl border ${
                        isMentorConfirmed
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          : 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                      }`}
                    >
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        ЭТАП 02 / 02
                      </div>
                      <h3 className="text-sm font-bold text-white">
                        Верификация Директором DEVOPS Academy
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
                      isMentorConfirmed
                        ? 'text-cyan-400'
                        : isFinalExamPassed
                        ? 'text-purple-400 animate-pulse'
                        : 'text-slate-500'
                    }`}
                  >
                    {isMentorConfirmed ? '● ПОДТВЕРЖДЕНО' : isFinalExamPassed ? '◐ ОЖИДАЕТ ПРОВЕРКИ' : '○ ОЖИДАНИЕ'}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Директор DEVOPS Academy (<strong className="text-white">Ахрорджон Турдиев</strong>) проверяет выполнение
                  практических работ, защиту дипломного проекта и активирует именную подпись сертификата.
                </p>

                <div className="p-3.5 rounded-xl bg-[#030712] border border-slate-800/90 space-y-1.5 text-xs mb-4 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Статус реестра:</span>
                    <span
                      className={`font-bold ${
                        isMentorConfirmed
                          ? 'text-cyan-300'
                          : isFinalExamPassed
                          ? 'text-purple-300'
                          : 'text-slate-500'
                      }`}
                    >
                      {isMentorConfirmed
                        ? 'Подписано и внесено в реестр'
                        : isFinalExamPassed
                        ? 'Ожидает подписи директора'
                        : 'Ожидает сдачи экзамена'}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Подписант:</span>
                    <span className="text-slate-300">Директор DEVOPS Academy — Ахрорджон Турдиев</span>
                  </div>
                </div>

                {isMentorConfirmed ? (
                  <div className="flex items-center gap-2 text-xs text-cyan-300 font-semibold bg-cyan-500/10 border border-cyan-500/30 py-2.5 px-3.5 rounded-xl font-mono">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-cyan-400" />
                    <span>Подтверждено в реестре DEVOPS Academy</span>
                  </div>
                ) : isFinalExamPassed ? (
                  <a
                    href="https://t.me/itadminahror"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-purple-600/25 hover:bg-purple-600/35 text-purple-200 font-bold text-xs border border-purple-500/40 flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-4 h-4 text-cyan-400" />
                    <span>Отправить запрос на верификацию (@itadminahror) →</span>
                  </a>
                ) : (
                  <div className="py-2.5 px-3 rounded-xl bg-[#030712] border border-slate-800/80 text-[11px] text-slate-500 text-center font-mono">
                    Доступно после прохождения Этапа 01 (Финальный Экзамен)
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CASE 2: MENTOR APPROVAL TRIAGE QUEUE (WHEN LOGGED IN AS MENTOR/ADMIN)    */}
      {/* ========================================================================= */}
      {isMentor && (
        <div className="p-6 rounded-3xl bg-[#040917] border border-purple-500/35 space-y-5 shadow-[0_0_45px_rgba(168,85,247,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-cyan-400" />
                Очередь верификации выпускников DEVOPS Academy
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Проверяйте результаты Финального Экзамена и выпускайте именные сертификаты с Credential ID в 1 клик
              </p>
            </div>
            <div className="text-xs font-mono text-cyan-300">
              Активных аккаунтов студентов:{' '}
              <strong className="text-white tabular-nums">
                {userAccounts?.filter((u) => u.role !== 'admin').length || 0}
              </strong>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800/90 bg-[#02050d]">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#060d1f] text-slate-400 uppercase text-[10px] font-mono font-bold border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3.5">Студент</th>
                  <th className="px-4 py-3.5">Поток / Группа</th>
                  <th className="px-4 py-3.5">Финальный Экзамен</th>
                  <th className="px-4 py-3.5">Статус Диплома</th>
                  <th className="px-4 py-3.5 text-right">Управление</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {userAccounts
                  .filter((u) => u.role !== 'admin')
                  .map((stu) => {
                    const sEmailLower = (stu.email || '').toLowerCase().trim();
                    const stuExamSub = (quizSubmissions || []).find(
                      (q) =>
                        (q.quizId === 'FINAL_EXAM' || q.quizId === 'FINAL') &&
                        ((q.studentEmail && q.studentEmail.toLowerCase().trim() === sEmailLower) ||
                         (q.studentId && q.studentId === stu.id))
                    );
                    const stuExamPassed = Boolean(
                      stuExamSub?.passed || (stuExamSub?.scorePct && stuExamSub.scorePct >= 85)
                    );
                    const stuExamScore = stuExamSub?.scorePct ?? 0;

                    const stuCert = (certificates || []).find(
                      (c) =>
                        (c.studentEmail && c.studentEmail.toLowerCase().trim() === sEmailLower) ||
                        (c.studentName &&
                          c.studentName.toLowerCase().trim() === (stu.name || '').toLowerCase().trim())
                    );
                    const stuCertConfirmed = Boolean(
                      stuCert && stuCert.mentorConfirmed !== false && stuCert.status !== 'Rejected'
                    );

                    return (
                      <tr key={stu.id} className="hover:bg-cyan-500/[0.04] transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-bold text-white">{stu.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{stu.email}</div>
                        </td>
                        <td className="px-4 py-3 text-cyan-300/80 font-mono text-[11px]">
                          {stu.group || 'ИИ для Жизни · Поток 1'}
                        </td>
                        <td className="px-4 py-3 font-mono tabular-nums">
                          {stuExamPassed ? (
                            <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Сдан ({stuExamScore}%)</span>
                            </span>
                          ) : stuExamScore > 0 ? (
                            <span className="text-rose-400 font-bold flex items-center gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{stuExamScore}% (&lt; 85%)</span>
                            </span>
                          ) : (
                            <span className="text-slate-500 text-[11px]">Не сдавался</span>
                          )}
                        </td>
                        <td className="px-4 py-3 font-mono">
                          {stuCertConfirmed ? (
                            <div>
                              <span className="text-cyan-300 font-bold flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                                <span>Верифицирован</span>
                              </span>
                              <div className="text-[10px] text-slate-500 mt-0.5 tabular-nums">
                                Credential ID: {stuCert?.certificateId}
                              </div>
                            </div>
                          ) : (
                            <span className="text-rose-400/90 text-[11px] flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              <span>Заблокирован</span>
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right space-x-2">
                          {!stuCertConfirmed ? (
                            <button
                              onClick={() => handleConfirmStudent(stu)}
                              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-[0_0_15px_rgba(6,182,212,0.3)] inline-flex items-center gap-1.5 transition-all whitespace-nowrap"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Выдать Сертификат</span>
                            </button>
                          ) : (
                            <div className="inline-flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setCustomStudentName(stu.name);
                                  if (stuCert?.certificateId) setVerificationCode(stuCert.certificateId);
                                  if (stuCert?.issuedAt) setIssueDate(stuCert.issuedAt);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-[#0b162c] hover:bg-[#112244] text-cyan-300 font-bold border border-cyan-500/30 text-[11px] whitespace-nowrap"
                              >
                                Загрузить в бланк
                              </button>
                              <button
                                onClick={() => stuCert && handleRevokeStudent(stuCert.certificateId)}
                                className="px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 font-bold border border-rose-500/35 text-[11px] whitespace-nowrap"
                              >
                                Отозвать
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CASE 3: CERTIFICATE IS UNLOCKED (DISPLAY OFFICIAL CERTIFICATE & ACTIONS)  */}
      {/* ========================================================================= */}
      {isCertificateUnlocked && (
        <div className="space-y-6">
          {/* Congratulatory Telemetry Banner for Students */}
          {!effectiveIsMentor && (
            <div className="p-5 rounded-2xl bg-[#041521] border border-cyan-400/45 space-y-2 shadow-[0_0_35px_rgba(6,182,212,0.18)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-400/40">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-white">
                      Квалификация подтверждена, {studentOfficialName}! Ваш диплом активирован в реестре DEVOPS Academy.
                    </div>
                    <p className="text-xs text-cyan-200/80 mt-0.5">
                      Финальный экзамен сдан ({examScorePct}%), сертификат подписан директором академии (
                      {myCert?.confirmedByMentor || 'Ахрорджон Турдиев'}).
                    </p>
                  </div>
                </div>

                <span className="px-3.5 py-1.5 rounded-xl bg-[#030914] text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40 self-start sm:self-center tabular-nums">
                  Credential ID: {verificationCode}
                </span>
              </div>
            </div>
          )}

          {/* Mentor Editable Fields Panel */}
          {effectiveIsMentor && showMentorSettings && (
            <div className="p-6 rounded-3xl bg-[#040917] border border-purple-500/40 space-y-4 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider font-mono flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-purple-400" /> Конфигуратор реквизитов диплома DEVOPS Academy
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">ГОЛОГРАФИЧЕСКИЙ РЕНДЕР В РЕАЛЬНОМ ВРЕМЕНИ</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-slate-400 text-[11px] font-mono mb-1">ФИО Выпускника:</label>
                  <input
                    type="text"
                    value={customStudentName}
                    onChange={(e) => setCustomStudentName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#02050d] border border-cyan-500/30 text-white font-bold focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] font-mono mb-1">Выбрать из базы студентов:</label>
                  <select
                    onChange={(e) => {
                      if (e.target.value) setCustomStudentName(e.target.value);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#02050d] border border-cyan-500/30 text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="">-- Быстрый выбор студента --</option>
                    {userAccounts.map((u) => (
                      <option key={u.id} value={u.name}>
                        {u.name} ({u.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] font-mono mb-1">Credential ID (ID реестра):</label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#02050d] border border-cyan-500/30 text-cyan-300 font-mono font-bold focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] font-mono mb-1">Образовательная программа:</label>
                  <input
                    type="text"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#02050d] border border-cyan-500/30 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] font-mono mb-1">Академический объём:</label>
                  <input
                    type="text"
                    value={academicHours}
                    onChange={(e) => setAcademicHours(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#02050d] border border-cyan-500/30 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] font-mono mb-1">Итоговая квалификация:</label>
                  <input
                    type="text"
                    value={finalScoreText}
                    onChange={(e) => setFinalScoreText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#02050d] border border-cyan-500/30 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] font-mono mb-1">Дата выдачи:</label>
                  <input
                    type="text"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#02050d] border border-cyan-500/30 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] font-mono mb-1">Должность подписанта:</label>
                  <input
                    type="text"
                    value={directorTitle}
                    onChange={(e) => setDirectorTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#02050d] border border-cyan-500/30 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] font-mono mb-1">ФИО Директора:</label>
                  <input
                    type="text"
                    value={directorName}
                    onChange={(e) => setDirectorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#02050d] border border-cyan-500/30 text-cyan-300 font-bold focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Control Deck */}
          <div className="p-4 rounded-2xl bg-[#040917] border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono uppercase">ВЫПУСКНИК:</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-[#02050d] border border-cyan-500/30 text-cyan-300 font-bold text-xs">
                {effectiveStudentName}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {copiedLink && (
                <span className="text-xs text-cyan-400 font-mono font-bold flex items-center gap-1 animate-in fade-in">
                  <Check className="w-3.5 h-3.5" /> Данные скопированы!
                </span>
              )}
              {downloadSuccess && (
                <span className="text-xs text-cyan-400 font-mono font-bold flex items-center gap-1 animate-in fade-in">
                  <Check className="w-3.5 h-3.5" /> HTML-диплом сохранен!
                </span>
              )}
              {saveSuccess && (
                <span className="text-xs text-cyan-400 font-mono font-bold flex items-center gap-1 animate-in fade-in">
                  <Check className="w-3.5 h-3.5" /> Записано в реестр!
                </span>
              )}

              {effectiveIsMentor && (
                <button
                  onClick={handleSaveToRegistry}
                  className="px-4 py-2 rounded-xl bg-purple-600/25 hover:bg-purple-600/35 text-purple-200 text-xs font-bold flex items-center gap-2 transition-all border border-purple-500/45 whitespace-nowrap"
                >
                  <Save className="w-4 h-4 text-purple-300" />
                  <span>Записать в реестр</span>
                </button>
              )}

              <button
                onClick={handleCopyVerification}
                className="px-4 py-2 rounded-xl bg-[#081329] hover:bg-[#0d1e40] text-slate-200 text-xs font-bold flex items-center gap-2 transition-all border border-cyan-500/30 whitespace-nowrap"
              >
                <Copy className="w-4 h-4 text-cyan-400" />
                <span>Скопировать крипто-справку</span>
              </button>

              <button
                onClick={handleDownloadHTML}
                className="px-4 py-2 rounded-xl bg-[#081329] hover:bg-[#0d1e40] text-slate-200 text-xs font-bold flex items-center gap-2 transition-all border border-cyan-500/30 whitespace-nowrap"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Скачать HTML-оригинал</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all whitespace-nowrap"
              >
                <Printer className="w-4 h-4" />
                <span>Печать А4 / Сохранить PDF</span>
              </button>
            </div>
          </div>

          {/* Main Interactive Holographic Certificate Display */}
          <div id="official-certificate-print-area" className="w-full flex justify-center">
            <div className="w-full max-w-5xl rounded-3xl overflow-hidden">
              <DevOpsAcademyCertificate
                studentName={effectiveStudentName}
                verificationCode={verificationCode}
                credentialUrl={credentialUrl}
                issueDate={issueDate}
                courseTitle={courseTitle}
                academicHours={academicHours}
                finalScoreText={finalScoreText}
                directorTitle={directorTitle}
                directorName={directorName}
              />
            </div>
          </div>

          {/* Mentor Certificate Registry Table */}
          {effectiveIsMentor && (
            <div className="p-6 rounded-3xl bg-[#040917] border border-cyan-500/25 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-cyan-400" /> Крипто-реестр выданных дипломов DEVOPS Academy ({certificates?.length || 0})
                </h3>
                <button
                  onClick={async () => {
                    await syncDataToSheets();
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-[#081329] hover:bg-[#0d1e40] text-xs text-cyan-300 font-semibold border border-cyan-500/30 transition-all flex items-center gap-1.5 self-start sm:self-auto whitespace-nowrap"
                >
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Синхронизировать реестр</span>
                </button>
              </div>

              {certificates && certificates.length > 0 ? (
                <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#02050d]">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#060d1f] text-slate-400 uppercase text-[10px] font-mono font-bold border-b border-slate-800">
                      <tr>
                        <th className="px-4 py-3">Credential ID</th>
                        <th className="px-4 py-3">ФИО Выпускника</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Программа</th>
                        <th className="px-4 py-3">Дата выдачи</th>
                        <th className="px-4 py-3 text-right">Управление</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {(certificates || []).map((cert) => (
                        <tr key={cert.certificateId} className="hover:bg-cyan-500/[0.04] transition-colors">
                          <td className="px-4 py-3 font-mono font-bold text-cyan-300 tabular-nums">{cert.certificateId}</td>
                          <td className="px-4 py-3 font-semibold text-white">{cert.studentName}</td>
                          <td className="px-4 py-3 text-slate-400 font-mono">{cert.studentEmail}</td>
                          <td className="px-4 py-3 text-slate-300">{normalizeCourseTitle(cert.courseName)}</td>
                          <td className="px-4 py-3 text-slate-400 font-mono tabular-nums">{cert.issuedAt}</td>
                          <td className="px-4 py-3 text-right space-x-2">
                            <button
                              onClick={() => {
                                setCustomStudentName(cert.studentName);
                                setVerificationCode(cert.certificateId);
                                if (cert.courseName) setCourseTitle(normalizeCourseTitle(cert.courseName));
                                if (cert.issuedAt) setIssueDate(cert.issuedAt);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 font-bold border border-cyan-500/35 text-[11px]"
                            >
                              Открыть
                            </button>
                            <button
                              onClick={() => deleteCertificate(cert.certificateId)}
                              className="px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 font-bold border border-rose-500/35 text-[11px]"
                            >
                              <Trash2 className="w-3.5 h-3.5 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#02050d] border border-slate-800/80 text-center text-xs text-slate-400 font-mono">
                  Реестр выданных сертификатов пуст.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
