import React, { useState, useEffect } from "react";
import axios from "axios";

// Icônes SVG
const Eye = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const Reply = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
  </svg>
);

const Calendar = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const Package = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const User = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const Filter = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const MyRequests = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les quotes depuis le backend
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/quotes/");
        setRequests(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des demandes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  // Fonction pour style du statut
  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Texte en français
  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "En attente";
      case "processed":
        return "Répondu";
      case "closed":
        return "Clôturé";
      default:
        return status;
    }
  };

  const handleView = (id) => {
    console.log("Voir demande ID:", id);
  };

  const handleReply = (id) => {
    console.log("Répondre demande ID:", id);
  };

  // Filtrage
  const filteredRequests = statusFilter
    ? requests.filter((req) => req.status === statusFilter)
    : requests;

  return (
    <div className="fixed top-[80px] left-64 right-0 bottom-0 bg-[#f5f2eb] overflow-y-auto ">
      {/* En-tête */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes demandes</h1>
            <p className="text-gray-600">
              Suivez l'état de vos demandes envoyées aux producteurs
            </p>
          </div>

          {/* Filtre par statut */}
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Tous</option>
              <option value="pending">En attente</option>
              <option value="processed">Répondu</option>
              <option value="closed">Clôturé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-s font-medium text-gray-500">Date</th>
                  <th className="px-6 py-3 text-left text-s font-medium text-gray-500">Producteur</th>
                  <th className="px-6 py-3 text-left text-s font-medium text-gray-500">Produit</th>
                  <th className="px-6 py-3 text-left text-s font-medium text-gray-500">Statut</th>
                  <th className="px-6 py-3 text-left text-s font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((req) => (
                  <tr key={req.id}>
                    <td className="px-6 py-4 text-sm">{new Date(req.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm">{req.producer?.company_name || "-"}</td>
                    <td className="px-6 py-4 text-sm">{req.product?.name || "-"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(req.status)}`}>
                        {getStatusText(req.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <button onClick={() => handleView(req.id)} className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs">
                        Voir
                      </button>
                      {req.status === "processed" && (
                        <button onClick={() => handleReply(req.id)} className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs">
                          Répondre
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredRequests.length === 0 && (
              <div className="text-center py-6 text-gray-500">Aucune demande trouvée</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;
