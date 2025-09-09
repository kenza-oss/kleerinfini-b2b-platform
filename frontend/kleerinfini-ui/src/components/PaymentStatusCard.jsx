


export default function PaymentStatusCard(){

    return(
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
    )
}