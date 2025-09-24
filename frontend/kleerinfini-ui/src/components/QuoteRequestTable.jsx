// QuoteRequestTable.jsx
import React from 'react';

const QuoteRequestTable = ({ demands }) => {
  return (
    <div className="space-y-4">
      {demands.map((demand) => (
        <div key={demand.id} className="p-6 border-2 border-image-orange/10 rounded-xl hover:border-image-orange/30 hover:shadow-md transition-all duration-300 group">
          <div className="flex justify-between items-start mb-4">
            <div className="font-semibold text-image-dark-text text-lg group-hover:text-image-orange">{demand.title}</div>
            <div className="font-bold text-image-orange text-xl">{demand.price}</div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm text-image-dark-text/80">
            <div><span className="font-semibold">Client:</span> {demand.client}</div>
            <div><span className="font-semibold">Pays:</span> {demand.country}</div>
            <div><span className="font-semibold">Délai:</span> {demand.deadline}</div>
            <div><span className="font-semibold">Date:</span> {demand.date}</div>
            <div>
              <span className="font-semibold">Statut:</span> 
              <span className={`ml-1 px-2 py-1 rounded-full text-xs font-semibold ${
                demand.status === 'Nouveau' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {demand.status}
              </span>
            </div>
            {demand.file && (
              <div>
                <span className="font-semibold">Fichier:</span> 
                <a href="#" className="ml-1 text-image-orange hover:underline text-xs">📎 {demand.file}</a>
              </div>
            )}
          </div>
          <div className="mt-4 flex gap-2">
            <button className="px-4 py-2 bg-image-orange text-white rounded-lg text-sm font-semibold hover:bg-image-dark-orange transition-colors">
              Répondre
            </button>
            <button className="px-4 py-2 bg-white border border-image-orange text-image-orange rounded-lg text-sm font-semibold hover:bg-image-orange/10 transition-colors">
              Voir détails
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuoteRequestTable;