import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { DashboardHome } from '../components/dashboard/DashboardHome';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname.split('/')[2] || 'overview';

  const handleTabChange = (tab: string) => {
    navigate(`/dashboard/${tab}`);
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={handleTabChange}>
      <DashboardHome />
    </DashboardLayout>
  );
};

export default DashboardPage;