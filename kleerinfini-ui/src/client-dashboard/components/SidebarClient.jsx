import React from 'react';
import { FaChartPie, FaSearch, FaFileAlt, FaComments, FaFolderOpen, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import sidebarBg from '../../assets/sidebar.jpg'; // <-- chemin relatif à ton fichier

const SidebarClient = ({ onNavigate }) => {
  const { t } = useTranslation();

  const menuItems = [
    { label: t('sidebar.dashboard'), icon: <FaChartPie />, id: 'dashboard' },
    { label: t('sidebar.search'), icon: <FaSearch />, id: 'search' },
    { label: t('sidebar.requests'), icon: <FaFileAlt />, id: 'requests' },
    { label: t('sidebar.messages'), icon: <FaComments />, id: 'messages' },
    { label: t('sidebar.documents'), icon: <FaFolderOpen />, id: 'documents' },
    { label: t('sidebar.profile'), icon: <FaUser />, id: 'profile' },
    { label: t('sidebar.logout'), icon: <FaSignOutAlt />, id: 'logout' }
  ];

  return (
    <aside
      className="w-64 h-screen shadow-md fixed left-0 z-50 mt-16 bg-cover bg-center"
      style={{
        backgroundImage: `url(${sidebarBg})`
      }}
    >
      {/* Fond blanc transparent pour lisibilité */}
      <div className=" h-full p-5 overflow-y-auto">
        <nav className="space-y-4 mt-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex items-center gap-3 w-full text-left px-3 py-2 text-white hover:text-orange-400 rounded-lg transition"
            >
              <span className="text-xl text-orange-400">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default SidebarClient;
