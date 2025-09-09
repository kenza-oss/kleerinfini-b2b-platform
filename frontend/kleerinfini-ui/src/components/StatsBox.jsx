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


export default function StatsBox(){

    return(
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
    )
}