export type CourseId = 'ai-for-life' | 'sysadmin-devops';

export interface CourseConfig {
  id: CourseId;
  title: string;
  shortName: string;
  tagline: string;
  description: string;
  badge: string;
  totalLessons: number;
  totalWeeks: number;
  colorScheme: {
    primary: string;
    gradient: string;
    border: string;
    text: string;
    bgPill: string;
  };
}

export const AVAILABLE_COURSES: CourseConfig[] = [
  {
    id: 'ai-for-life',
    title: 'AI for LIFE — Vibe Coding & Agentic AI',
    shortName: 'AI for LIFE',
    tagline: 'Vibe Coding & Agentic AI',
    description: 'Инженерия промптинга, создание веб-приложений через Cursor/Windsurf, мультимодальный ИИ, автономные агенты n8n и Capstone-проект.',
    badge: '🧠 AI & Vibe Coding',
    totalLessons: 24,
    totalWeeks: 12,
    colorScheme: {
      primary: 'cyan',
      gradient: 'from-cyan-500 to-blue-600',
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      bgPill: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    },
  },
  {
    id: 'sysadmin-devops',
    title: 'Linux & DevOps System Administration',
    shortName: 'Linux & SysAdmin',
    tagline: 'Linux, Servers & DevOps',
    description: 'Системное администрирование Linux, Bash-автоматизация, сети и маршрутизация, Nginx, PostgreSQL, Docker, CI/CD и Prometheus.',
    badge: '🐧 Linux & DevOps',
    totalLessons: 24,
    totalWeeks: 12,
    colorScheme: {
      primary: 'emerald',
      gradient: 'from-emerald-500 to-teal-600',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      bgPill: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    },
  },
];

export function getCourseConfig(courseId?: string): CourseConfig {
  if (courseId === 'sysadmin-devops' || (courseId && courseId.toLowerCase().includes('linux')) || (courseId && courseId.toLowerCase().includes('sysadmin'))) {
    return AVAILABLE_COURSES[1];
  }
  return AVAILABLE_COURSES[0];
}
