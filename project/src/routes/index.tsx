import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import Navbar from '@/components/Navbar';
import { TerminalLab } from '@/components/labs/TerminalLab';
import { Lab } from '@/types/lab';

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    <main className="min-h-screen bg-slate-50">
      {children}
    </main>
  </>
);

export const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
      }
    >
      <Routes>
        {/* Public routes */}
        <Route path="/" element={
          <PageLayout>
            {user ? <Navigate to="/dashboard" /> : <LandingPage />}
          </PageLayout>
        } />
        <Route path="/auth" element={
          user ? <Navigate to="/dashboard" /> : <AuthPage />
        } />

        {/* Public content routes */}
        <Route path="/courses" element={
          <PageLayout>
            <CoursesPage />
          </PageLayout>
        } />
        <Route path="/labs" element={
          <PageLayout>
            <LabsPage />
          </PageLayout>
        } />
        <Route path="/mentorship" element={
          <PageLayout>
            <MentorshipPage />
          </PageLayout>
        } />
        <Route path="/community" element={
          <PageLayout>
            <CommunityPage />
          </PageLayout>
        } />
        <Route path="/blog" element={
          <PageLayout>
            <BlogPage />
          </PageLayout>
        } />

        {/* Protected routes */}
        <Route path="/dashboard" element={
          <PageLayout>
            {user ? <DashboardPage /> : <Navigate to="/auth" />}
          </PageLayout>
        } />
        <Route path="/courses/:id" element={
          <PageLayout>
            {user ? <CourseDetailPage /> : <Navigate to="/auth" />}
          </PageLayout>
        } />
        <Route path="/labs/:id" element={
          <PageLayout>
            {user ? <LabDetailPage /> : <Navigate to="/auth" />}
          </PageLayout>
        } />
        <Route path="/profile" element={
          <PageLayout>
            {user ? <ProfilePage /> : <Navigate to="/auth" />}
          </PageLayout>
        } />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/terminal" element={
          <PageLayout>
            <TerminalLab lab={{} as Lab} onComplete={(success: boolean) => {
              console.log('Lab completed:', success);
            }} />
          </PageLayout>
        } />
      </Routes>
    </Suspense>
  );
};
// Lazy load pages
const LandingPage = React.lazy(() => import('@/pages/LandingPage'));
const AuthPage = React.lazy(() => import('@/pages/AuthPage'));
const DashboardPage = React.lazy(() => import('@/pages/DashboardPage'));
const CoursesPage = React.lazy(() => import('@/pages/CoursesPage'));
const CourseDetailPage = React.lazy(() => import('@/pages/CourseDetailPage'));
const LabsPage = React.lazy(() => import('@/pages/LabsPage'));
const LabDetailPage = React.lazy(() => import('@/pages/LabDetailPage'));
const MentorshipPage = React.lazy(() => import('@/pages/MentorshipPage'));
const CommunityPage = React.lazy(() => import('@/pages/CommunityPage'));
const BlogPage = React.lazy(() => import('@/pages/BlogPage'));
const ProfilePage = React.lazy(() => import('@/pages/ProfilePage'));


