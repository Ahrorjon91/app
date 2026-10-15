import React, { useState } from 'react';
import { PortalProvider, usePortal } from './context/PortalContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CyberBackground } from './components/CyberBackground';
import { PersistenceStatus } from './components/PersistenceStatus';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { LessonsPage } from './pages/LessonsPage';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { LabsPage } from './pages/LabsPage';
import { LabDetailPage } from './pages/LabDetailPage';
import { HomeworkPage } from './pages/HomeworkPage';
import { QuizzesPage } from './pages/QuizzesPage';
import { QuizRunnerModal } from './pages/QuizRunnerModal';
import { FinalExamPage } from './pages/FinalExamPage';
import { MentorPage } from './pages/MentorPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { DownloadsPage } from './pages/DownloadsPage';
import { FaqPage } from './pages/FaqPage';
import { SettingsPage } from './pages/SettingsPage';
import { UserManagementPage } from './pages/UserManagementPage';
import { UnlockLessonsPage } from './pages/UnlockLessonsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AccessDeniedPage } from './pages/AccessDeniedPage';
import { LoginPage } from './pages/LoginPage';
import { XpBreakdownModal } from './components/XpBreakdownModal';
import { AiForLifeSyllabusModal } from './components/AiForLifeSyllabusModal';

const PortalApp: React.FC = () => {
  const {
    activePage,
    profile,
    isXpModalOpen,
    setIsXpModalOpen,
    isSyllabusModalOpen,
    setIsSyllabusModalOpen,
    xpBreakdown,
    badges,
  } = usePortal();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If not authenticated or on login page, display login
  if (!profile.isAuthenticated || activePage === 'login') {
    return (
      <div className="min-h-screen bg-[#0B0D13] text-slate-100 flex flex-col justify-center items-center relative overflow-hidden">
        <CyberBackground />
        <LoginPage />
      </div>
    );
  }

  // Render the current active view
  const renderCurrentPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'profile':
        return <ProfilePage />;
      case 'lessons':
        return <LessonsPage />;
      case 'lesson-detail':
        return <LessonDetailPage />;
      case 'labs':
        return <LabsPage />;
      case 'lab-detail':
        return <LabDetailPage />;
      case 'homework':
        return <HomeworkPage />;
      case 'quizzes':
      case 'tests':
        return <QuizzesPage />;
      case 'final-exam':
        return <FinalExamPage />;
      case 'mentor':
        return <MentorPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'certificates':
        return <CertificatesPage />;
      case 'downloads':
        return <DownloadsPage />;
      case 'faq':
        return <FaqPage />;
      case 'settings':
        return <SettingsPage />;
      case 'user-management':
        return <UserManagementPage />;
      case 'unlock-lessons':
        return <UnlockLessonsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'access-denied':
        return <AccessDeniedPage />;
      case 'quiz-runner':
        return <QuizRunnerModal />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D13] text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      <CyberBackground />

      {/* Main Sidebar Navigation */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main View Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        <Header
          onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
          onMobileToggle={() => setMobileSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1 px-2 py-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto relative z-10">
          <div className="mb-4 flex items-center justify-end md:hidden">
            <PersistenceStatus />
          </div>
          {renderCurrentPage()}
        </main>
      </div>

      {/* Modal Quiz Runner when triggered from buttons outside of page view */}
      {activePage === 'quiz-runner' && <QuizRunnerModal />}

      {/* Global XP Breakdown Modal */}
      <XpBreakdownModal
        isOpen={isXpModalOpen}
        onClose={() => setIsXpModalOpen(false)}
        xpBreakdown={xpBreakdown}
        userName={profile.name}
        badges={badges}
      />

      {/* Global AI for Life Course Syllabus Card & Passport Modal */}
      <AiForLifeSyllabusModal
        isOpen={isSyllabusModalOpen}
        onClose={() => setIsSyllabusModalOpen(false)}
      />
    </div>
  );
};

export function App() {
  return <PortalApp />;
}

export default App;
