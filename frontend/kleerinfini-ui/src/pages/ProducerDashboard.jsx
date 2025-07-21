import React, { useState } from 'react';

const ProducerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    {
      title: 'Revenus ce mois',
      value: '$45,280',
      trend: '+12.5%',
      trendUp: true,
      icon: '💰',
      bgGradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Commandes traitées',
      value: '127',
      trend: '+8.2%',
      trendUp: true,
      icon: '📦',
      bgGradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Produits actifs',
      value: '24',
      trend: '+3 nouveaux',
      trendUp: true,
      icon: '🛍️',
      bgGradient: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Messages non lus',
      value: '5',
      trend: '-2 depuis hier',
      trendUp: false,
      icon: '💬',
      bgGradient: 'from-red-500 to-red-600'
    }
  ];

  const products = [
    { name: 'Huile d\'olive extra vierge', price: '$45/L', stock: '2,500L', status: 'active' },
    { name: 'Dattes Deglet Nour', price: '$12/kg', stock: '1,200kg', status: 'active' },
    { name: 'Couscous traditionnel', price: '$8/kg', stock: '500kg', status: 'inactive' },
    { name: 'Conserves de légumes', price: '$15/carton', stock: '800 unités', status: 'active' }
  ];

  const messages = [
    {
      sender: 'Jean Supplec',
      avatar: 'JS',
      time: 'Il y a 2h',
      message: 'Intéressé par votre huile d\'olive. Possible d\'avoir un échantillon ?'
    },
    {
      sender: 'MarketKing Ltd',
      avatar: 'MK',
      time: 'Il y a 5h',
      message: 'Commande de 500kg de dattes confirmée. Merci !'
    },
    {
      sender: 'FreshMart',
      avatar: 'FR',
      time: 'Hier',
      message: 'Pouvez-vous fournir des certifications bio ?'
    }
  ];

  const demands = [
    {
      title: 'Huile d\'olive premium - 1000L',
      price: '$47,000',
      client: 'EuroFood GmbH',
      country: 'Allemagne',
      deadline: '30 jours',
      status: 'En négociation'
    },
    {
      title: 'Dattes biologiques - 2000kg',
      price: '$24,000',
      client: 'Organic Plus',
      country: 'France',
      deadline: '15 jours',
      status: 'Nouveau'
    }
  ];

  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'products', icon: '🛍️', label: 'Produits' },
    { id: 'demands', icon: '📋', label: 'Demandes' },
    { id: 'messages', icon: '💬', label: 'Messages', badge: 5 },
    { id: 'payments', icon: '💳', label: 'Paiements' },
    { id: 'profile', icon: '👤', label: 'Profil' },
    { id: 'settings', icon: '⚙️', label: 'Paramètres' }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="ml-72 flex-1 p-6">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-700 to-red-600"></div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-blue-700">Dashboard Producteur</h1>
              <p className="text-slate-600 mt-2">Bienvenue dans votre espace de gestion</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-slate-100 text-blue-700 rounded-lg font-semibold hover:bg-slate-200 transition-all duration-300 flex items-center gap-2">
                📈 Rapport
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-700 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2">
                + Nouveau Produit
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-700 to-red-600"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
                  <div className="text-slate-600 text-sm mb-2">{stat.title}</div>
                  <div className={`flex items-center gap-1 text-sm font-semibold ${
                    stat.trendUp ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trendUp ? '↗️' : '↘️'} {stat.trend}
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.bgGradient} flex items-center justify-center text-xl text-white shadow-lg`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          {/* Products */}
          <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-blue-700 flex items-center gap-3">
                🛍️ Produits Récents
              </h2>
              <button className="px-4 py-2 bg-slate-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors">
                Voir tout
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-blue-700 text-sm">Produit</th>
                    <th className="text-left py-3 px-4 font-semibold text-blue-700 text-sm">Prix</th>
                    <th className="text-left py-3 px-4 font-semibold text-blue-700 text-sm">Stock</th>
                    <th className="text-left py-3 px-4 font-semibold text-blue-700 text-sm">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4">{product.name}</td>
                      <td className="py-4 px-4">{product.price}</td>
                      <td className="py-4 px-4">{product.stock}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status === 'active' ? 'Actif' : 'Rupture'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Messages */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-blue-700 flex items-center gap-3">
                💬 Messages Récents
              </h2>
              <button className="px-4 py-2 bg-slate-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors">
                Voir tout
              </button>
            </div>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className="flex gap-3 p-4 border border-slate-200 rounded-xl hover:border-red-300 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-700 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {message.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-blue-700">{message.sender}</span>
                      <span className="text-xs text-slate-500">{message.time}</span>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Demands and Payments */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Demands */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-blue-700 flex items-center gap-3">
                📋 Demandes Actives
              </h2>
              <button className="px-4 py-2 bg-slate-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors">
                Voir tout
              </button>
            </div>
            <div className="space-y-4">
              {demands.map((demand, index) => (
                <div key={index} className="p-6 border-2 border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="font-semibold text-blue-700 text-lg">{demand.title}</div>
                    <div className="font-bold text-red-600 text-xl">{demand.price}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                    <div><span className="font-semibold">Client:</span> {demand.client}</div>
                    <div><span className="font-semibold">Pays:</span> {demand.country}</div>
                    <div><span className="font-semibold">Délai:</span> {demand.deadline}</div>
                    <div><span className="font-semibold">Statut:</span> {demand.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payments */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-blue-700 flex items-center gap-3">
                💳 Résumé Paiements
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-transparent hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-2xl font-bold text-green-600 mb-2">$78,450</div>
                <div className="text-slate-600 text-sm">Paiements reçus ce mois</div>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-transparent hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-2xl font-bold text-yellow-600 mb-2">$12,300</div>
                <div className="text-slate-600 text-sm">Paiements en attente</div>
              </div>
            </div>
            <div className="h-48 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-500">
              <div className="text-2xl mb-2">📈</div>
              <div className="text-center">
                <div className="font-medium">Graphique des revenus mensuels</div>
                <div className="text-sm">(Intégration avec Chart.js)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducerDashboard;