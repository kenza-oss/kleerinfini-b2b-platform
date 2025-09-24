// SidebarProducer.jsx
import React from 'react';

const navItems = [
  { id: 'dashboard', icon: '📊', label: 'Tableau de bord' },
  { id: 'products', icon: '🛍️', label: 'Mes produits / services' },
  { id: 'demands', icon: '📋', label: 'Demandes reçues' },
  { id: 'messages', icon: '💬', label: 'Messages' },
  { id: 'documents', icon: '📄', label: 'Mes documents' },
  { id: 'statistics', icon: '📈', label: 'Statistiques' },
  { id: 'payments', icon: '💳', label: 'Paiement / abonnement' },
  { id: 'profile', icon: '👤', label: 'Mon profil' },
];

export default function SidebarProducer({ activeTab, setActiveTab, unreadCount = 0 }) {
  const handleLogout = () => {
    // JWT logout logic would go here
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <div className="w-72 bg-gradient-to-b from-image-dark-text to-image-dark-text/95 text-white shadow-2xl fixed h-full left-0 top-0 overflow-y-auto z-10">
      {/* Logo */}
      <div className="p-6 border-b border-image-orange/30">
        <div className="flex items-center gap-3 text-xl font-bold">
          <span className="bg-image-orange text-white p-2 rounded-md">K</span>
          <span>KleerInfini</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 text-center border-b border-image-orange/30">
        <div className="w-20 h-20 bg-gradient-to-br from-image-orange to-image-dark-orange rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3 shadow-lg border-2 border-white">
          AM
        </div>
        <div className="font-semibold text-lg">Agromax Industries</div>
        <div className="text-image-orange text-sm mt-1">Producteur Premium</div>
        <div className="mt-3 bg-image-orange text-xs px-2 py-1 rounded-full inline-block">
          ★ Verified
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 p-3 rounded-xl mb-2 font-medium transition-all duration-300 hover:bg-image-orange/20 hover:translate-x-1 hover:shadow-lg ${
              activeTab === item.id ? 'bg-image-orange/20 translate-x-1 shadow-lg' : ''
            }`}
          >
            <span className="text-xl w-6">{item.icon}</span>
            <span className="flex-1 text-left">{item.label}</span>
            {item.id === 'messages' && unreadCount > 0 && (
              <span className="bg-image-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-8 mx-4 p-4 border-t border-image-orange/30 pt-4">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 text-image-orange hover:bg-image-orange/10 rounded-xl transition-colors"
        >
          <span className="text-xl">🔒</span>
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
}