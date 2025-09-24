const StatsBox = ({ products, messages, setActiveTab }) => {
  const stats = [
    {
      title: 'Vues du profil cette semaine',
      value: '178',
      trend: '+12.5%',
      trendUp: true,
      icon: '👁️',
      bgGradient: 'from-blue-500 to-blue-600',
      targetTab: 'statistics'
    },
    {
      title: 'Produits publiés',
      value: products.filter(p => p.status === 'active').length.toString(),
      trend: '+2 ce mois',
      trendUp: true,
      icon: '🛍️',
      bgGradient: 'from-green-500 to-green-600',
      targetTab: 'products'
    },
    {
      title: 'Demandes de devis',
      value: '12',
      trend: '+3 cette semaine',
      trendUp: true,
      icon: '📋',
      bgGradient: 'from-yellow-500 to-yellow-600',
      targetTab: 'demands'
    },
    {
      title: 'Messages non lus',
      value: messages.filter(m => !m.read).length.toString(),
      trend: '-2 depuis hier',
      trendUp: false,
      icon: '💬',
      bgGradient: 'from-red-500 to-red-600',
      targetTab: 'messages'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(stat.targetTab)}
            className="cursor-pointer bg-image-light-beige rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-image-orange to-image-dark-orange"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="text-3xl font-bold text-image-dark-text mb-2 group-hover:text-image-orange">
                  {stat.value}
                </div>
                <div className="text-image-dark-text/70 text-sm mb-2">
                  {stat.title}
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    stat.trendUp ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.trendUp ? '↗️' : '↘️'} {stat.trend}
                </div>
              </div>
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.bgGradient} flex items-center justify-center text-xl text-white shadow-lg`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subscription Status */}
      <div className="bg-image-light-beige rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-image-dark-text flex items-center gap-3">
            <span className="bg-image-orange/20 p-2 rounded-lg">⭐</span>
            Statut d'Abonnement
          </h2>
          <button
            onClick={() => setActiveTab('payments')}
            className="px-4 py-2 bg-image-orange/10 text-image-orange rounded-lg text-sm font-semibold hover:bg-image-orange/20 transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            <span>Voir plus</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-image-dark-text">Plan Actuel</h3>
              <span className="bg-image-orange text-white text-xs px-2 py-1 rounded-full">
                Premium
              </span>
            </div>
            <div className="text-3xl font-bold text-image-orange mb-2">
              1500 DA<span className="text-sm font-normal">/année</span>
            </div>
            <ul className="text-sm text-image-dark-text/80 space-y-1 mb-4">
              <li>✅ Produits illimités</li>
              <li>✅ Analytics avancés</li>
              <li>✅ Support prioritaire</li>
              <li>✅ Certifications vérifiées</li>
            </ul>
            <div className="text-xs text-image-dark-text/60">
              Prochain renouvellement: 15/09/2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBox;
