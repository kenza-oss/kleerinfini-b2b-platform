import React, { useState } from 'react';


const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'products', icon: '🛍️', label: 'Produits' },
    { id: 'demands', icon: '📋', label: 'Demandes' },
    { id: 'messages', icon: '💬', label: 'Messages', badge: 5 },
    { id: 'payments', icon: '💳', label: 'Paiements' },
    { id: 'profile', icon: '👤', label: 'Profil' },
    { id: 'settings', icon: '⚙️', label: 'Paramètres' }
  ];

export default function SidebarProducer(){
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="w-72  bg-gradient-to-b from-blue-700 to-blue-800 text-white shadow-2xl fixed h-full left-0 top-0 overflow-y-auto">
        {/* Logo */}
        <div className="p-6 border-b border-blue-600/30">
          <div className="flex items-center gap-3 text-xl font-bold">
             <span>KleerInfini</span>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-6 text-center border-b border-blue-600/30">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3 shadow-lg">
            AM
          </div>
          <div className="font-semibold">Agromax Industries</div>
          <div className="text-blue-200 text-sm">Producteur Premium</div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl mb-2 font-medium transition-all duration-300 hover:bg-white/15 hover:translate-x-1 hover:shadow-lg ${
                activeTab === item.id ? 'bg-white/15 translate-x-1 shadow-lg' : ''
              }`}
            >
              <span className="text-xl w-6">{item.icon}</span>
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    )
}

