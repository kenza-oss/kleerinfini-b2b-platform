// QuoteRequests.jsx
import React, { useState } from 'react';

const QuoteRequests = () => {
  const [demands, setDemands] = useState([
    {
      id: 1,
      date: '12/08/2023',
      client: 'EuroFood GmbH',
      country: 'Allemagne',
      product: 'Huile d\'olive premium - 1000L',
      status: 'en cours',
      file: 'demande_eurofood.pdf',
      price: '$47,000',
      deadline: '30 jours'
    },
    {
      id: 2,
      date: '14/08/2023',
      client: 'Organic Plus',
      country: 'France',
      product: 'Dattes biologiques - 2000kg',
      status: 'nouveau',
      file: null,
      price: '$24,000',
      deadline: '15 jours'
    },
    {
      id: 3,
      date: '16/08/2023',
      client: 'Mediterranean Delights',
      country: 'Espagne',
      product: 'Conserves de légumes - 500 cartons',
      status: 'répondu',
      file: 'specifications_med.pdf',
      price: '$7,500',
      deadline: '20 jours'
    },
    {
      id: 4,
      date: '18/08/2023',
      client: 'North African Imports',
      country: 'Royaume-Uni',
      product: 'Couscous traditionnel - 800kg',
      status: 'refusé',
      file: 'requirements_na.pdf',
      price: '$6,400',
      deadline: '25 jours'
    }
  ]);

  const [selectedDemand, setSelectedDemand] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [responseFile, setResponseFile] = useState(null);

  const handleRespond = (demand) => {
    setSelectedDemand(demand);
    setResponseText('');
    setResponseFile(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResponseFile(file);
    }
  };

  const submitResponse = () => {
    // Update the status of the demand to "répondu"
    const updatedDemands = demands.map(d => 
      d.id === selectedDemand.id ? {...d, status: 'répondu'} : d
    );
    setDemands(updatedDemands);
    setSelectedDemand(null);
    alert('Réponse envoyée avec succès!');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'nouveau': { color: 'bg-blue-100 text-blue-800', text: 'Nouveau' },
      'en cours': { color: 'bg-yellow-100 text-yellow-800', text: 'En cours' },
      'répondu': { color: 'bg-green-100 text-green-800', text: 'Répondu' },
      'refusé': { color: 'bg-red-100 text-red-800', text: 'Refusé' }
    };
    
    const config = statusConfig[status] || statusConfig['nouveau'];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="bg-image-light-beige rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-image-orange text-image-orange rounded-lg text-sm font-semibold hover:bg-image-orange/10 transition-colors">
            Filtrer
          </button>
          <button className="px-4 py-2 bg-white border border-image-orange text-image-orange rounded-lg text-sm font-semibold hover:bg-image-orange/10 transition-colors">
            Exporter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-image-orange/30">
              <th className="text-left py-3 px-4 font-semibold text-image-dark-text text-sm uppercase tracking-wider">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-image-dark-text text-sm uppercase tracking-wider">Client</th>
              <th className="text-left py-3 px-4 font-semibold text-image-dark-text text-sm uppercase tracking-wider">Pays</th>
              <th className="text-left py-3 px-4 font-semibold text-image-dark-text text-sm uppercase tracking-wider">Produit/Service</th>
              <th className="text-left py-3 px-4 font-semibold text-image-dark-text text-sm uppercase tracking-wider">Statut</th>
              <th className="text-left py-3 px-4 font-semibold text-image-dark-text text-sm uppercase tracking-wider">Fichier</th>
              <th className="text-left py-3 px-4 font-semibold text-image-dark-text text-sm uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {demands.map((demand) => (
              <tr key={demand.id} className="border-b border-image-orange/10 hover:bg-image-orange/5 transition-colors">
                <td className="py-4 px-4 text-image-dark-text/80">{demand.date}</td>
                <td className="py-4 px-4 font-medium text-image-dark-text">{demand.client}</td>
                <td className="py-4 px-4 text-image-dark-text/80">{demand.country}</td>
                <td className="py-4 px-4 text-image-dark-text/80">{demand.product}</td>
                <td className="py-4 px-4">{getStatusBadge(demand.status)}</td>
                <td className="py-4 px-4">
                  {demand.file ? (
                    <a href="#" className="text-image-orange hover:text-image-dark-orange text-sm flex items-center gap-1">
                      <span>📎</span>
                      <span>Télécharger</span>
                    </a>
                  ) : (
                    <span className="text-image-dark-text/50 text-sm">Aucun fichier</span>
                  )}
                </td>
                <td className="py-4 px-4">
                  <button 
                    onClick={() => handleRespond(demand)}
                    disabled={demand.status === 'répondu' || demand.status === 'refusé'}
                    className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                      demand.status === 'répondu' || demand.status === 'refusé'
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-image-orange text-white hover:bg-image-dark-orange'
                    }`}
                  >
                    Répondre
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Response Modal */}
      {selectedDemand && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-image-dark-text mb-4">
              Répondre à {selectedDemand.client}
            </h3>
            
            <div className="mb-4">
              <p className="text-image-dark-text/80 mb-2">
                <strong>Produit:</strong> {selectedDemand.product}
              </p>
              <p className="text-image-dark-text/80 mb-2">
                <strong>Prix demandé:</strong> {selectedDemand.price}
              </p>
              <p className="text-image-dark-text/80 mb-4">
                <strong>Délai:</strong> {selectedDemand.deadline}
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-image-dark-text mb-2">
                Votre réponse
              </label>
              <textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                rows={4}
                className="w-full p-3 border border-image-orange/30 rounded-lg focus:ring-2 focus:ring-image-orange focus:border-image-orange"
                placeholder="Rédigez votre réponse ici..."
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-image-dark-text mb-2">
                Joindre un document (PDF, devis)
              </label>
              <div className="border border-dashed border-image-orange/50 rounded-lg p-4 text-center">
                <input
                  type="file"
                  id="response-file"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="response-file" className="cursor-pointer text-image-orange hover:text-image-dark-orange flex flex-col items-center">
                  <span className="text-2xl mb-2">📎</span>
                  <span className="text-sm">
                    {responseFile ? responseFile.name : 'Choisir un fichier'}
                  </span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedDemand(null)}
                className="px-4 py-2 bg-white border border-image-orange text-image-orange rounded-lg font-semibold hover:bg-image-orange/10 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={submitResponse}
                className="px-4 py-2 bg-image-orange text-white rounded-lg font-semibold hover:bg-image-dark-orange transition-colors"
              >
                Envoyer la réponse
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteRequests;