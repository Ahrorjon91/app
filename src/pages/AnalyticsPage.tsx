import React, { useState, useMemo, useEffect } from 'react';
import { usePortal } from '../context/PortalContext';
import { MentorGradingGuide } from '../components/MentorGradingGuide';
import {
  TrendingUp,
  Award,
  BookOpen,
  FlaskConical,
  FileCheck,
  Users,
  CheckCircle2,
  Clock,
  ShieldCheck,
  RotateCcw,
  Printer,
  Layers,
  AlertTriangle,
  History,
  LayoutDashboard,
  BarChart3,
  FileSpreadsheet,
  AlertOctagon,
  ScrollText,
  Edit3
} from 'lucide-react';
import { UserAccount } from '../types';
import { calculateStudentTimeMetrics } from '../lib/calculationEngine';

import { AnalyticsDossierTab } from '../components/analytics/AnalyticsDossierTab';
import { AnalyticsChartsTab } from '../components/analytics/AnalyticsChartsTab';
import { AnalyticsTranscriptTab } from '../components/analytics/AnalyticsTranscriptTab';
import { AnalyticsErrorsTab } from '../components/analytics/AnalyticsErrorsTab';
import { AnalyticsActivityLogsTab } from '../components/analytics/AnalyticsActivityLogsTab';
import { AnalyticsCohortTab } from '../components/analytics/AnalyticsCohortTab';
import { StudentKpiReportModal } from '../components/analytics/StudentKpiReportModal';
import { ResetProgressModal } from '../components/analytics/ResetProgressModal';

type AnalyticsTabId = 'dossier' | 'charts' | 'transcript' | 'errors' | 'logs' | 'cohort';

export const AnalyticsPage: React.FC = () => {
  const {
    lessons,
    labs,
    labSubmissions,
    homeworks,
    homeworkSubmissions,
    testScores,
    quizSubmissions,
    readSections,
    userAccounts,
    profile,
    leaderboard,
    stats,
    totalXp,
    resetData,
    setActivePage,
    setSelectedLessonId,
    setSelectedLabId,
    setSelectedQuizId
  } = usePortal();

  const [activeTab, setActiveTab] = useState<AnalyticsTabId>('dossier');
  const [selectedStudentEmail, setSelectedStudentEmail] = useState<string>(() => {
    if (profile?.role === 'student' && profile?.email) return profile.email;
    if ((profile as any)?.linkedStudentEmail) return (profile as any).linkedStudentEmail;
    const firstStu = userAccounts.find((u) => u.role === 'student');
    return firstStu?.email || 'student@devopspro.tech';
  });
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [initialEditSignatures, setInitialEditSignatures] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Student accounts list
  const studentAccounts = useMemo(() => {
    return userAccounts.filter((u) => u.role === 'student');
  }, [userAccounts]);

  useEffect(() => {
    if (studentAccounts.length === 0) return;
    const cleanSelected = (selectedStudentEmail || '').toLowerCase().trim();
    const existsInStudents = studentAccounts.some(
      (u) => (u.email || '').toLowerCase().trim() === cleanSelected
    );
    if (!existsInStudents) {
      if (profile?.role === 'student' && profile?.email) {
        setSelectedStudentEmail(profile.email);
      } else if ((profile as any)?.linkedStudentEmail) {
        setSelectedStudentEmail((profile as any).linkedStudentEmail);
      } else {
        setSelectedStudentEmail(studentAccounts[0].email);
      }
    }
  }, [studentAccounts, selectedStudentEmail, profile]);

  const isCurrentLoggedUser = useMemo(() => {
    return (profile?.email || '').toLowerCase().trim() === (selectedStudentEmail || '').toLowerCase().trim();
  }, [profile, selectedStudentEmail]);

  // Find user in userAccounts and in leaderboard
  const rawAccount = useMemo(() => {
    return userAccounts.find(
      (u) => (u.email || '').toLowerCase().trim() === (selectedStudentEmail || '').toLowerCase().trim()
    );
  }, [userAccounts, selectedStudentEmail]);

  const lbUser = useMemo(() => {
    return leaderboard.find(
      (u) => (u.email || '').toLowerCase().trim() === (selectedStudentEmail || '').toLowerCase().trim()
    );
  }, [leaderboard, selectedStudentEmail]);

  // Student specific readSections
  const studentReadSections: Record<string, boolean> = useMemo(() => {
    const res: Record<string, boolean> = {};
    if (isCurrentLoggedUser) {
      Object.assign(res, readSections);
    }
    if (rawAccount?.readSections) {
      if (typeof rawAccount.readSections === 'object') {
        Object.assign(res, rawAccount.readSections);
      } else if (typeof rawAccount.readSections === 'string') {
        try {
          const parsed = JSON.parse(rawAccount.readSections);
          if (parsed && typeof parsed === 'object') Object.assign(res, parsed);
        } catch {}
      }
    }
    if (typeof window !== 'undefined' && selectedStudentEmail) {
      try {
        const stored = localStorage.getItem(`user_read_sections_${selectedStudentEmail.toLowerCase().trim()}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && typeof parsed === 'object') Object.assign(res, parsed);
        }
      } catch {}
    }
    return res;
  }, [isCurrentLoggedUser, readSections, rawAccount, selectedStudentEmail]);

  // Student specific lab submissions
  const studentLabSubmissions = useMemo(() => {
    const targetEmail = (selectedStudentEmail || '').toLowerCase().trim();
    const targetId = (rawAccount?.id || '').trim();
    return (labSubmissions || []).filter((l) => {
      const e = String(l.studentEmail || '').toLowerCase().trim();
      const id = String(l.studentId || '').trim();
      return (targetEmail && e === targetEmail) || (targetId && id === targetId);
    });
  }, [labSubmissions, selectedStudentEmail, rawAccount]);

  // Student specific homework submissions
  const studentHwSubmissions = useMemo(() => {
    const targetEmail = (selectedStudentEmail || '').toLowerCase().trim();
    const targetId = (rawAccount?.id || '').trim();
    return (homeworkSubmissions || []).filter((h) => {
      const e = String(h.studentEmail || '').toLowerCase().trim();
      const id = String(h.studentId || '').trim();
      return (targetEmail && e === targetEmail) || (targetId && id === targetId);
    });
  }, [homeworkSubmissions, selectedStudentEmail, rawAccount]);

  // Student specific quiz submissions / test scores
  const studentTestScores = useMemo(() => {
    const rawScores: Record<string, any> = {};
    if (isCurrentLoggedUser) {
      Object.assign(rawScores, testScores);
    } else if (rawAccount?.testScores) {
      Object.assign(rawScores, rawAccount.testScores);
    }
    const scores: Record<string, any> = {};
    Object.entries(rawScores).forEach(([k, val]) => {
      if (typeof val === 'number') {
        scores[k] = { scorePct: val, passed: val >= 60 };
      } else if (val && typeof val === 'object') {
        const sPct = Number(val.scorePct ?? val.score ?? 0);
        scores[k] = {
          ...val,
          scorePct: sPct,
          passed: Boolean(val.passed !== undefined ? val.passed : sPct >= 60),
        };
      }
    });
    const targetEmail = (selectedStudentEmail || '').toLowerCase().trim();
    const targetId = (rawAccount?.id || '').trim();
    (quizSubmissions || []).forEach((q) => {
      const e = String(q.studentEmail || '').toLowerCase().trim();
      const id = String(q.studentId || '').trim();
      if ((targetEmail && e === targetEmail) || (targetId && id === targetId)) {
        const sPct = Number(q.scorePct ?? (q as any).score ?? 0);
        scores[q.quizId] = {
          scorePct: sPct,
          passed: Boolean(q.passed !== undefined ? q.passed : sPct >= 60),
          completedAt: q.submittedAt,
        };
      }
    });
    return scores;
  }, [isCurrentLoggedUser, testScores, rawAccount, quizSubmissions, selectedStudentEmail]);

  // Set of approved HW lesson IDs for active student
  const approvedHwLessonIds = useMemo(() => {
    const set = new Set<number>();
    studentHwSubmissions.forEach((h) => {
      if (h.status === 'Approved' || (h as any).submissionStatus === 'Approved') {
        const lId = Number(h.lessonId || (h as any).id);
        if (lId >= 1 && lId <= 24) set.add(lId);
      }
    });
    if (isCurrentLoggedUser) {
      Object.entries(homeworks).forEach(([k, v]) => {
        if (v && (v as any).status === 'Approved') {
          const lId = Number(k);
          if (lId >= 1 && lId <= 24) set.add(lId);
        }
      });
    }
    return set;
  }, [studentHwSubmissions, isCurrentLoggedUser, homeworks]);

  // Accurate list of completed lessons (strictly verified work done or approved HW)
  const completedLessonsList = useMemo(() => {
    return lessons.filter((l) => {
      if (approvedHwLessonIds.has(l.id)) return true;
      const isExplicitInArray = Array.isArray((rawAccount as any)?.completedLessons) && (rawAccount as any).completedLessons.includes(l.id);
      if (approvedHwLessonIds.size > 0) {
        return false;
      }
      return (
        (isCurrentLoggedUser && l.isCompleted) ||
        isExplicitInArray
      );
    });
  }, [lessons, approvedHwLessonIds, isCurrentLoggedUser, rawAccount]);

  const actualCompletedLessonsCount = completedLessonsList.length;

  // Accurate count of approved labs
  const approvedLabsCount = useMemo(() => {
    const approvedSet = new Set<number>();
    studentLabSubmissions.forEach((l) => {
      if (l.submissionStatus === 'Approved' || (l as any).status === 'Approved' || l.isCompleted) {
        approvedSet.add(Number(l.id || (l as any).labId));
      }
    });
    if (isCurrentLoggedUser) {
      labs.forEach((l) => {
        if (l.isCompleted || l.submissionStatus === 'Approved') {
          approvedSet.add(l.id);
        }
      });
    }
    return approvedSet.size;
  }, [studentLabSubmissions, isCurrentLoggedUser, labs]);

  // Accurate count of approved homeworks
  const approvedHwCount = approvedHwLessonIds.size;

  // Accurate test pass count
  const studentPassedQuizCount = useMemo(() => {
    const passedFromSubmissions = Object.values(studentTestScores).filter((t: any) => t?.passed).length;
    if (isCurrentLoggedUser) {
      return Math.max(passedFromSubmissions, (stats.passedTestsCount || 0) + (stats.passedMiniTestsCount || 0));
    }
    return Math.max(passedFromSubmissions, rawAccount?.passedQuizCount || 0);
  }, [isCurrentLoggedUser, stats, studentTestScores, rawAccount]);

  // Accurate EXP points & rank
  const studentTotalPoints = isCurrentLoggedUser
    ? totalXp
    : (lbUser?.totalPoints ?? rawAccount?.totalPoints ?? 0);

  const studentRank = isCurrentLoggedUser
    ? (stats.rank || 1)
    : (lbUser?.rank || 1);

  // Time metrics: totally spent time & last time online
  const timeMetrics = useMemo(() => {
    return calculateStudentTimeMetrics({
      studentEmail: selectedStudentEmail,
      studentId: rawAccount?.id,
      completedLessonsCount: actualCompletedLessonsCount,
      inProgressLessonsCount: Math.max(1, 24 - actualCompletedLessonsCount > 0 ? 1 : 0),
      approvedLabsCount,
      approvedHwCount,
      passedQuizzesCount: studentPassedQuizCount,
      isCurrentUser: isCurrentLoggedUser,
    });
  }, [
    selectedStudentEmail,
    rawAccount,
    actualCompletedLessonsCount,
    approvedLabsCount,
    approvedHwCount,
    studentPassedQuizCount,
    isCurrentLoggedUser,
  ]);

  // Enriched active student object
  const activeStudent: UserAccount = useMemo(() => {
    return {
      ...(rawAccount || {
        id: 'STD-01',
        name: isCurrentLoggedUser ? profile?.name || 'Студент' : 'John Smith',
        email: selectedStudentEmail,
        role: 'student' as const,
        registeredAt: '2026-08-01',
        unlockedLessonsCount: Math.min(24, actualCompletedLessonsCount + 1),
        completedLessonsCount: actualCompletedLessonsCount,
        completedLabsCount: approvedLabsCount,
        passedQuizCount: studentPassedQuizCount,
        attendancePct: 100,
        status: 'Active' as const,
        group: 'Группа 1 (Август 2026)',
      }),
      unlockedLessonsCount: Math.min(24, Math.max(rawAccount?.unlockedLessonsCount || 1, actualCompletedLessonsCount + 1)),
      completedLessonsCount: actualCompletedLessonsCount,
      completedLabsCount: approvedLabsCount,
      completedHomeworkCount: approvedHwCount,
      totalPoints: studentTotalPoints,
      rank: studentRank,
      passedQuizCount: studentPassedQuizCount,
      totalTimeSpentMinutes: timeMetrics.totalMinutes,
      lastOnlineAt: timeMetrics.lastOnlineText,
    };
  }, [
    rawAccount,
    isCurrentLoggedUser,
    profile,
    selectedStudentEmail,
    actualCompletedLessonsCount,
    approvedLabsCount,
    approvedHwCount,
    studentTotalPoints,
    studentRank,
    studentPassedQuizCount,
    timeMetrics,
  ]);

  // Enriched student accounts for dropdown & cohort tab
  const enrichedStudentAccounts = useMemo(() => {
    return studentAccounts.map((st) => {
      const sEmail = (st.email || '').toLowerCase().trim();
      const sId = (st.id || '').trim();
      const isCurr = (profile?.email || '').toLowerCase().trim() === sEmail;
      const lb = leaderboard.find((u) => (u.email || '').toLowerCase().trim() === sEmail);

      const stHwApproved = new Set<number>();
      (homeworkSubmissions || []).forEach((h) => {
        const he = String(h.studentEmail || '').toLowerCase().trim();
        const hid = String(h.studentId || '').trim();
        if (((sEmail && he === sEmail) || (sId && hid === sId)) && (h.status === 'Approved' || (h as any).submissionStatus === 'Approved')) {
          stHwApproved.add(Number(h.lessonId || (h as any).id));
        }
      });

      const stLabApproved = new Set<number>();
      (labSubmissions || []).forEach((l) => {
        const le = String(l.studentEmail || '').toLowerCase().trim();
        const lid = String(l.studentId || '').trim();
        if (((sEmail && le === sEmail) || (sId && lid === sId)) && (l.submissionStatus === 'Approved' || (l as any).status === 'Approved' || l.isCompleted)) {
          stLabApproved.add(Number(l.id || (l as any).labId));
        }
      });

      const stQuizPassed = new Set<string>();
      (quizSubmissions || []).forEach((q) => {
        const qe = String(q.studentEmail || '').toLowerCase().trim();
        const qid = String(q.studentId || '').trim();
        const sPct = Number(q.scorePct ?? (q as any).score ?? 0);
        if (((sEmail && qe === sEmail) || (sId && qid === sId)) && (q.passed || sPct >= 60)) {
          stQuizPassed.add(String(q.quizId));
        }
      });

      const hwCnt = Math.max(stHwApproved.size, st.completedHomeworkCount ?? 0);
      const labCnt = Math.max(stLabApproved.size, st.completedLabsCount ?? 0);
      const quizCnt = Math.max(stQuizPassed.size, st.passedQuizCount ?? 0);
      const compl = isCurr
        ? Math.max(stats.completedLessonsCount, hwCnt)
        : Math.max(lb?.completedLessons ?? st.completedLessonsCount ?? 0, hwCnt);
      const pts = isCurr ? totalXp : (lb?.totalPoints ?? st.totalPoints ?? 0);
      const rk = isCurr ? stats.rank : (lb?.rank ?? 1);

      const stTime = calculateStudentTimeMetrics({
        studentEmail: st.email,
        studentId: st.id,
        completedLessonsCount: compl,
        inProgressLessonsCount: compl < 24 ? 1 : 0,
        approvedLabsCount: labCnt,
        approvedHwCount: hwCnt,
        passedQuizzesCount: quizCnt,
        isCurrentUser: isCurr,
      });

      return {
        ...st,
        totalPoints: pts,
        completedLessonsCount: compl,
        completedHomeworkCount: hwCnt,
        completedLabsCount: labCnt,
        passedQuizCount: quizCnt,
        unlockedLessonsCount: Math.min(24, Math.max(st.unlockedLessonsCount || 1, compl + 1)),
        totalTimeSpentMinutes: stTime.totalMinutes,
        lastOnlineAt: stTime.lastOnlineText,
        rank: rk,
      };
    });
  }, [studentAccounts, profile, leaderboard, totalXp, stats, homeworkSubmissions, labSubmissions, quizSubmissions]);

  // 6 AI for LIFE Competency calculation - dynamically aligned with syllabus blocks
  const competencies = useMemo(() => {
    const blockNames = [
      'Блок 1: AI Foundations & Prompting',
      'Блок 2: Vibe Coding & Cursor IDE',
      'Блок 3: AI Productivity & Second Brain',
      'Блок 4: Generative Media & Visuals',
      'Блок 5: Autonomous Agents & RAG',
      'Блок 6: Capstone Project & Launch'
    ];

    return blockNames.map((domain, idx) => {
      const blockId = idx + 1;
      const startLesson = (blockId - 1) * 4 + 1;
      const endLesson = blockId * 4;

      const completedInBlock = completedLessonsList.filter(
        (l) => l.id >= startLesson && l.id <= endLesson
      ).length;

      // Also count sections read in this block for partial progress
      let sectionsReadInBlock = 0;
      for (let lId = startLesson; lId <= endLesson; lId++) {
        const secPrefix = `sec-${lId}-`;
        if (studentReadSections[`${secPrefix}lecture`]) sectionsReadInBlock++;
        if (studentReadSections[`${secPrefix}lab`]) sectionsReadInBlock++;
        if (studentReadSections[`${secPrefix}quiz`]) sectionsReadInBlock++;
        if (studentReadSections[`${secPrefix}homework`] || studentReadSections[`${secPrefix}hw`]) sectionsReadInBlock++;
      }

      const labsInBlock = (studentLabSubmissions || []).filter(
        (l) => {
          const idNum = Number(l.id || (l as any).labId);
          return (idNum >= startLesson && idNum <= endLesson) && (l.submissionStatus === 'Approved' || l.isCompleted);
        }
      ).length;

      const hwInBlock = (studentHwSubmissions || []).filter(
        (h) => {
          const idNum = Number(h.lessonId || (h as any).id);
          return (idNum >= startLesson && idNum <= endLesson) && (h.status === 'Approved' || (h as any).submissionStatus === 'Approved');
        }
      ).length;

      const testScore = studentTestScores[`TEST_${blockId}`];
      const testScorePct = testScore ? (testScore.scorePct ?? (testScore.passed ? 100 : 0)) : 0;

      // Score calculation (0 to 100):
      // Theory / lessons: up to 40% (based on completed lessons or sections read)
      const theoryScore = Math.max((completedInBlock / 4) * 40, (sectionsReadInBlock / 16) * 40);
      // Labs: up to 30% (based on approved labs)
      const labScore = (labsInBlock / 4) * 30;
      // Homeworks: up to 15% (based on approved homeworks)
      const hwScore = (hwInBlock / 4) * 15;
      // Test: up to 15% (based on test score)
      const testScoreVal = (testScorePct / 100) * 15;

      const rawScore = Math.round(theoryScore + labScore + hwScore + testScoreVal);
      const score = Math.min(100, Math.max(0, rawScore));

      let level = 'Не начат';
      let status: 'high' | 'medium' | 'low' = 'low';

      if (score >= 85) {
        level = 'Advanced (Продвинутый)';
        status = 'high';
      } else if (score >= 65) {
        level = 'Proficient (Уверенный)';
        status = 'high';
      } else if (score >= 40) {
        level = 'Developing (Базовый)';
        status = 'medium';
      } else if (score > 0) {
        level = 'In Progress (В процессе)';
        status = 'medium';
      } else {
        level = 'Not Started (Не начат)';
        status = 'low';
      }

      return {
        domain,
        score,
        level,
        status
      };
    });
  }, [completedLessonsList, studentReadSections, studentLabSubmissions, studentHwSubmissions, studentTestScores]);

  // Weak sides diagnostic
  const weakSides = useMemo(() => {
    const issues: string[] = [];
    if (actualCompletedLessonsCount < 24) {
      issues.push(
        `Текущий прогресс: завершено ${actualCompletedLessonsCount} из 24 уроков. Рекомендуется регулярное прохождение занятий для допуска к Финальному Экзамену.`
      );
    }
    if (approvedLabsCount < actualCompletedLessonsCount) {
      issues.push(
        `Практика: ${actualCompletedLessonsCount - approvedLabsCount} лабораторных работ ожидают выполнения или проверки ментором.`
      );
    }
    if (approvedHwCount < actualCompletedLessonsCount) {
      issues.push(
        `Домашние задания: ${actualCompletedLessonsCount - approvedHwCount} ДЗ требуют отправки на ревью для поддержания 100% успеваемости.`
      );
    }
    if (issues.length === 0) {
      issues.push(
        'Все академические нормативы выполняются в строгом соответствии с графиком учебного плана.'
      );
    }
    return issues;
  }, [actualCompletedLessonsCount, approvedLabsCount, approvedHwCount]);

  // Strengths
  const strengths = useMemo(() => {
    return [
      `Академический рейтинг: набрано ${studentTotalPoints} EXP, занято ${studentRank}-е место в рейтинге потока.`,
      `Учебный план: успешно освоено ${actualCompletedLessonsCount} уроков с полным изучением лекционных материалов.`,
      `Практическая квалификация: ${approvedLabsCount} лабораторных работ и ${approvedHwCount} домашних заданий зачтено преподавателем.`,
    ];
  }, [studentTotalPoints, studentRank, actualCompletedLessonsCount, approvedLabsCount, approvedHwCount]);

  // Recommendations for managers and parents
  const recommendations = useMemo(() => {
    return [
      `Продолжать освоение учебной программы со средней нагрузкой 3–4 академических часа в неделю (текущее время: ${timeMetrics.timeSpentFormatted}).`,
      `Для разблокировки Финального Комплексного Экзамена (60 Вопросов) необходимо завершить все 24 урока программы, включая все лабораторные, ДЗ, мини-квизы и блочные тесты.`,
      `Кураторам курса рекомендуется отслеживать своевременность сдачи отчетов по стендам в разделе «Ведомость 24 Уроков».`,
    ];
  }, [timeMetrics.timeSpentFormatted]);

  // Navigation handlers
  const handleNavigateLesson = (lessonId: number) => {
    setSelectedLessonId(lessonId);
    setActivePage('lessons');
  };

  const handleNavigateLab = (labId: number) => {
    setSelectedLabId(labId);
    setActivePage('labs');
  };

  const handleNavigateQuiz = (quizId: string) => {
    setSelectedQuizId(quizId);
    setActivePage('tests');
  };

  const handleResetData = async (targetEmail?: string) => {
    await resetData(targetEmail);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Banner */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-[#161618] border border-white/[0.08] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] text-[#ff791a] text-xs font-semibold tracking-wide mb-3 border border-white/[0.08]">
            <ShieldCheck className="w-3.5 h-3.5" /> DEVOPS PRO ACADEMY
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#f5f5f7] tracking-tight flex items-center gap-2.5">
            <TrendingUp className="w-7 h-7 text-[#0071e3]" /> Академическая Аналитика и Метрики
          </h1>
          <p className="text-sm text-[#86868b] mt-1.5 max-w-2xl">
            История активности, академический прогресс по 24 урокам, карта компетенций и табель успеваемости
          </p>
        </div>

        {/* Header Action Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Student Selector */}
          <div className="flex items-center gap-2">
            <select
              id="analytics-student-selector"
              value={selectedStudentEmail}
              onChange={(e) => setSelectedStudentEmail(e.target.value)}
              className="px-4 py-2.5 rounded-xl text-xs bg-[#1c1c1e] border border-white/[0.12] text-[#f5f5f7] font-medium focus:outline-none focus:border-[#0071e3] transition-colors shadow-sm"
            >
              {enrichedStudentAccounts.map((st) => (
                <option key={st.id || st.email} value={st.email}>
                  {st.name || st.email} ({st.totalPoints || 0} EXP)
                </option>
              ))}
            </select>
          </div>

          {/* KPI Report Modal Trigger */}
          <button
            id="open-kpi-report-modal-btn"
            onClick={() => {
              setInitialEditSignatures(false);
              setIsReportModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl text-xs font-medium bg-[#0071e3] hover:bg-[#0077ed] text-white flex items-center gap-2 shadow-sm transition-colors active:scale-95"
          >
            <Printer className="w-4 h-4" /> Отчет KPI (Руководство)
          </button>

          {/* Edit Signatures Trigger */}
          <button
            id="open-edit-signatures-btn"
            onClick={() => {
              setInitialEditSignatures(true);
              setIsReportModalOpen(true);
            }}
            className="px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#f5f5f7] bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] flex items-center gap-1.5 transition-colors active:scale-95"
            title="Настройка подписей в академическом отчете: Технический Ментор и Руководитель Программы"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#86868b]" /> Лица отчета
          </button>

          {/* Reset Academic Data Button */}
          <button
            id="open-reset-academic-modal-btn"
            onClick={() => setIsResetModalOpen(true)}
            className="px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#ff453a] bg-[#ff453a]/10 hover:bg-[#ff453a]/20 border border-[#ff453a]/20 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Сбросить успеваемость
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="p-1 rounded-2xl bg-[#161618] border border-white/[0.08] flex items-center gap-1 overflow-x-auto text-xs font-medium">
        <button
          id="tab-btn-dossier"
          onClick={() => setActiveTab('dossier')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'dossier'
              ? 'bg-[#0071e3] text-white font-semibold shadow-sm'
              : 'text-[#86868b] hover:text-[#f5f5f7]'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" /> Досье и Метрики
        </button>

        <button
          id="tab-btn-charts"
          onClick={() => setActiveTab('charts')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'charts'
              ? 'bg-[#0071e3] text-white font-semibold shadow-sm'
              : 'text-[#86868b] hover:text-[#f5f5f7]'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Диаграммы и Аналитика
        </button>

        <button
          id="tab-btn-transcript"
          onClick={() => setActiveTab('transcript')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'transcript'
              ? 'bg-[#0071e3] text-white font-semibold shadow-sm'
              : 'text-[#86868b] hover:text-[#f5f5f7]'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" /> Ведомость 24 Уроков
        </button>

        <button
          id="tab-btn-errors"
          onClick={() => setActiveTab('errors')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'errors'
              ? 'bg-[#ff453a] text-white font-semibold shadow-sm'
              : 'text-[#86868b] hover:text-[#f5f5f7]'
          }`}
        >
          <AlertOctagon className="w-4 h-4" /> Ошибки и Повторение
        </button>

        <button
          id="tab-btn-logs"
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'logs'
              ? 'bg-[#0071e3] text-white font-semibold shadow-sm'
              : 'text-[#86868b] hover:text-[#f5f5f7]'
          }`}
        >
          <History className="w-4 h-4" /> Журнал Действий (Логи)
        </button>

        <button
          id="tab-btn-cohort"
          onClick={() => setActiveTab('cohort')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'cohort'
              ? 'bg-[#0071e3] text-white font-semibold shadow-sm'
              : 'text-[#86868b] hover:text-[#f5f5f7]'
          }`}
        >
          <Users className="w-4 h-4" /> Сводка Потока Курса
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'dossier' && (
        <AnalyticsDossierTab
          student={activeStudent}
          lessons={lessons}
          labs={labs}
          homeworks={Object.values(homeworks)}
          testScores={studentTestScores}
          readSections={studentReadSections}
          weakSides={weakSides}
          strengths={strengths}
          recommendations={recommendations}
          totalStudents={studentAccounts.length}
          timeSpentFormatted={timeMetrics.timeSpentFormatted}
          totalTimeSpentMinutes={timeMetrics.totalMinutes}
          lastOnlineText={timeMetrics.lastOnlineText}
          isOnline={timeMetrics.isOnline}
          onOpenReportModal={() => setIsReportModalOpen(true)}
          onOpenResetModal={() => setIsResetModalOpen(true)}
          onSelectTab={(tabId) => setActiveTab(tabId as AnalyticsTabId)}
        />
      )}

      {activeTab === 'charts' && (
        <AnalyticsChartsTab
          student={activeStudent}
          lessons={lessons}
          labs={labs}
          homeworks={Object.values(homeworks)}
          testScores={studentTestScores}
          competencies={competencies}
          completedLessonIds={completedLessonsList.map((l) => l.id)}
          readSections={studentReadSections}
        />
      )}

      {activeTab === 'transcript' && (
        <AnalyticsTranscriptTab
          student={activeStudent}
          lessons={lessons}
          labs={labs}
          labSubmissions={labSubmissions as any}
          homeworks={homeworks}
          homeworkSubmissions={homeworkSubmissions}
          testScores={studentTestScores}
          readSections={studentReadSections}
          onNavigateLesson={handleNavigateLesson}
        />
      )}

      {activeTab === 'errors' && (
        <AnalyticsErrorsTab
          student={activeStudent}
          lessons={lessons}
          labs={labs}
          homeworks={homeworks}
          testScores={studentTestScores}
          readSections={studentReadSections}
          onNavigateLesson={handleNavigateLesson}
          onNavigateQuiz={handleNavigateQuiz}
          onNavigateLab={handleNavigateLab}
        />
      )}

      {activeTab === 'logs' && (
        <AnalyticsActivityLogsTab
          students={enrichedStudentAccounts}
          selectedStudent={activeStudent}
          onSelectStudent={(st) => {
            if (st) setSelectedStudentEmail(st.email);
          }}
        />
      )}

      {activeTab === 'cohort' && (
        <AnalyticsCohortTab
          students={enrichedStudentAccounts}
          selectedStudent={activeStudent}
          onSelectStudent={(st) => {
            setSelectedStudentEmail(st.email);
            setActiveTab('dossier');
          }}
          onOpenReportModal={(st) => {
            setSelectedStudentEmail(st.email);
            setIsReportModalOpen(true);
          }}
        />
      )}

      {/* Modals */}
      <StudentKpiReportModal
        isOpen={isReportModalOpen}
        onClose={() => {
          setIsReportModalOpen(false);
          setInitialEditSignatures(false);
        }}
        student={activeStudent}
        lessons={lessons}
        labs={labs}
        homeworks={Object.values(homeworks)}
        testScores={studentTestScores}
        competencies={competencies}
        weakSides={weakSides}
        strengths={strengths}
        recommendations={recommendations}
        initialEditSignatures={initialEditSignatures}
      />

      <ResetProgressModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        selectedStudent={activeStudent}
        onReset={handleResetData}
      />

      {/* Mentor Grading Rules Reference Section */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
        <MentorGradingGuide />
      </div>
    </div>
  );
};

