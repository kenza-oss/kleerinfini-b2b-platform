// DetailedStatistics.jsx
import React from 'react';

const DetailedStatistics = ({ products }) => {
  return (
    <div className="bg-image-light-beige rounded-2xl p-6 shadow-lg">

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold text-image-dark-text mb-4">Vues par produit</h3>
          <div className="space-y-4">
            {products.map(product => (
              <div key={product.id} className="flex items-center justify-between">
                <span className="text-image-dark-text">{product.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-image-gray-background rounded-full h-2">
                    <div 
                      className="bg-image-orange h-2 rounded-full" 
                      style={{ width: `${Math.min(product.views, 200) / 2}%` }}
                    ></div>
                  </div>
                  <span className="text-image-dark-text font-medium w-8 text-right">{product.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold text-image-dark-text mb-4">Clics sur "Demander un devis"</h3>
          <div className="space-y-4">
            {products.map(product => (
              <div key={product.id} className="flex items-center justify-between">
                <span className="text-image-dark-text">{product.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-image-gray-background rounded-full h-2">
                    <div 
                      className="bg-image-blue-accent h-2 rounded-full" 
                      style={{ width: `${Math.min(product.clicks, 50) * 2}%` }}
                    ></div>
                  </div>
                  <span className="text-image-dark-text font-medium w-8 text-right">{product.clicks}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h3 className="font-semibold text-image-dark-text mb-4">Répartition géographique des visiteurs</h3>
        <div className="h-64 bg-image-gray-background rounded-lg flex items-center justify-center">
          <span className="text-image-dark-text/50">Carte géographique des visiteurs</span>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="font-semibold text-image-dark-text mb-4">Évolution des interactions par mois</h3>
        <div className="h-64 bg-image-gray-background rounded-lg flex items-center justify-center">
          <span className="text-image-dark-text/50">Graphique d'évolution mensuelle</span>
        </div>
      </div>
    </div>
  );
};

export default DetailedStatistics;