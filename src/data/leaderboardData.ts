import { LeaderboardUser } from '../types';
import studentAvatarSvg from '../assets/images/student_avatar.svg';
import mentorAvatarSvg from '../assets/images/mentor_avatar.svg';

export interface StudentExpBreakdown {
  lessonsExp: number;
  labsExp: number;
  quizzesExp: number;
  homeworkExp: number;
  attendanceExp: number;
  bonusExp: number;
}

export interface StudentExpDetail {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  group: string;
  avatar: string;
  mentorAvatarUrl?: string;
  level: number;
  levelTitle: string;
  totalPoints: number;
  rank: number;
  completedLessons: number;
  completedLabs: number;
  passedQuizzes: number;
  homeworkScore: number;
  attendancePct: number;
  badgesCount: number;
  expBreakdown: StudentExpBreakdown;
  status: 'Active' | 'Pending' | 'Blocked';
  hiddenFromLeaderboard?: boolean;
}

/**
 * Individual Student EXP & Leaderboard records saved in /src/data/leaderboardData.ts
 */
export const STUDENT_EXP_DETAILS: StudentExpDetail[] = [];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [];

