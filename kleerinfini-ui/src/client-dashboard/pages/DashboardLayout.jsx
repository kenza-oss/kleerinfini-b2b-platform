import React, { useState } from 'react';
import SidebarClient from '../components/SidebarClient';
import ClientHeader from '../components/ClientHeader';
import DashboardHome from './DashboardHome';
import MyProfile from '../components/ProfileForm';
import DocumentCard from '../components/DocumentCard'; 
import Messages from '../pages/Messages';
import ProducerSearch from '../pages/ProducerSearch';
import MyRequests from '../pages/MyRequests';
import { useTranslation } from 'react-i18next';
import WelcomeBanner from '../components/WelcomeBanner';

const DashboardLayout = () => {
  const { i18n, t } = useTranslation();
  
  const [activeSection, setActiveSection] = useState('welcome');
  const [showLogoutPrompt, setShowLogoutPrompt] = useState(false);

  const handleLogoutConfirm = () => {
    window.location.href = "/login";
  };



  const handleLogoutPrompt = () => (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white p-6 rounded shadow-md text-center space-y-4">
        <h2 className="text-lg font-semibold">{t('dashboard.logoutMessage')}</h2>
        <div className="flex justify-center gap-4">
          <button onClick={handleLogoutConfirm} className="bg-orange-500 text-white px-4 py-2 rounded">{t('dashboard.logoutButton')}</button>
          <button onClick={() => setActiveSection('welcome')} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">{t('dashboard.cancelButton')}</button>
        </div>
      </div>
    </div>
  );



  const renderSection = () => {
    switch (activeSection) {
      case 'welcome':
        return <WelcomeBanner />;
      case 'dashboard':
        return <DashboardHome />;
      case 'profile':
        return <MyProfile />;

      case 'logout':
        return handleLogoutPrompt();
      case 'documents':
        return <DocumentCard />;
      case 'messages':
        return <Messages />;
      case 'search':
        return <ProducerSearch />;
      case 'requests':
        return <MyRequests />;
      default:
        return <WelcomeBanner />;
    }
  };

  return (
    <div className="flex">
      <SidebarClient onNavigate={setActiveSection} />
      <div className="flex-1 ml-64">
        <ClientHeader />
        <main className="p-6 min-h-screen flex justify-center items-center">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;