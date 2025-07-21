

export default function DashboardHeader(){
    return(
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
    )
}