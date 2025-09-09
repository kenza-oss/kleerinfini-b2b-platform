import React, { useState } from 'react';
import SidebarProducer from '../components/SidebarProducer';
import DashboardHeader from '../components/DashboardHeader';
import StatsBox from '../components/StatsBox';
import PaymentStatusCard from '../components/PaymentStatusCard';
const ProducerDashboard = () => {


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



  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">
      {/* Sidebar */}
      <SidebarProducer/>

      {/* Main Content */}
      <div className="ml-72 flex-1 p-6">
        {/* Header */}
        <DashboardHeader/>

        {/* Stats Grid */}
       <StatsBox/>

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
          <PaymentStatusCard/>
        </div>
      </div>
    </div>
  );
};

export default ProducerDashboard;