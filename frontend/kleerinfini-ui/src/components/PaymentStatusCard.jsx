// src/components/PaymentStatusCard.jsx
import React, { useState, useEffect } from "react";
import { getPayments, createPayment } from "../api/payments";

export default function PaymentStatusCard() {
  const [payments, setPayments] = useState([]);
  const [nextDue, setNextDue] = useState(null);
  const [amount, setAmount] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // fetch payments on mount
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getPayments();
        setPayments(data || []);
        const nextPayment = data?.find((p) => !p.paid);
        if (nextPayment) {
          setNextDue(nextPayment.due_date);
          setAmount(nextPayment.amount);
        }
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };

    fetchPayments();
  }, []);

  const handleFileChange = (e) => setUploadFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!uploadFile) return;

    const formData = new FormData();
    formData.append("file", uploadFile);

    try {
      setLoading(true);
      await createPayment(formData);
      alert("Reçu de paiement téléversé avec succès !");
      setUploadFile(null);

      // refresh payments after upload
      const updated = await getPayments();
      setPayments(updated);
      const nextPayment = updated?.find((p) => !p.paid);
      if (nextPayment) {
        setNextDue(nextPayment.due_date);
        setAmount(nextPayment.amount);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Erreur lors du téléversement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-image-light-beige rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 space-y-6">
      {/* Header + Status */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-image-dark-text flex items-center gap-3">
          <span className="bg-image-orange/20 p-2 rounded-lg">💳</span>
          Paiement & Abonnement
        </h2>
        <span
          className={`px-4 py-1 text-sm font-semibold rounded-full border shadow-sm ${
            payments.every((p) => p.paid)
              ? "bg-green-100 text-green-700 border-green-300"
              : "bg-yellow-100 text-yellow-700 border-yellow-300"
          }`}
        >
          {payments.every((p) => p.paid) ? "🔵 Payé" : "⏳ En attente"}
        </span>
      </div>

      {/* Montant + échéance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-transparent hover:border-green-300 transition-all duration-300 transform hover:-translate-y-1 shadow-md">
          <div className="text-2xl font-bold text-green-700 mb-2">
            {amount ? `${amount} DA` : "-"}
          </div>
          <div className="text-image-dark-text/80 text-sm">Montant total</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-transparent hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1 shadow-md">
          <div className="text-lg font-semibold text-blue-700 mb-2">{nextDue || "-"}</div>
          <div className="text-image-dark-text/80 text-sm">📅 Prochaine échéance</div>
        </div>
      </div>

      {/* Tranches */}
      <div className="bg-gradient-to-br from-white to-image-gray-background p-6 rounded-xl border border-image-orange/20 shadow-sm">
        <h3 className="font-semibold text-image-dark-text mb-4">Détails des tranches</h3>
        <ul className="space-y-3">
          {payments.map((p, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span>Tranche {idx + 1}</span>
              <span
                className={`px-3 py-1 text-sm rounded-lg shadow-sm ${
                  p.paid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {p.paid ? "✔️ Payée" : "⏳ En attente"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Upload proof */}
      <div className="bg-gradient-to-br from-white to-image-gray-background p-6 rounded-xl border border-image-orange/20 shadow-md">
        <h3 className="font-semibold text-image-dark-text mb-4">Preuve de paiement</h3>
        <div className="mb-4 p-4 border border-dashed border-image-orange/50 rounded-lg text-center hover:bg-orange-50 transition">
          <div className="text-2xl mb-2">📤</div>
          <p className="text-image-dark-text/70 text-sm mb-3">Téléversez votre reçu de paiement</p>
          <label
            htmlFor="payment-proof"
            className="cursor-pointer bg-image-orange/10 text-image-orange px-4 py-2 rounded-lg text-sm font-medium hover:bg-image-orange/20 transition-colors inline-block"
          >
            Choisir un fichier
          </label>
          <input id="payment-proof" type="file" className="hidden" onChange={handleFileChange} />
        </div>
        <button
          disabled={!uploadFile || loading}
          onClick={handleUpload}
          className="px-4 py-2 rounded-lg bg-image-orange text-white font-semibold hover:bg-orange-600 transition"
        >
          {loading ? "Téléversement..." : "Téléverser"}
        </button>
        <div className="text-xs text-image-dark-text/50 mt-2">
          Formats acceptés : PDF, JPG, PNG (max 5MB)
        </div>
      </div>

      {/* Automatic reminder */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200 flex items-center justify-between shadow-md hover:shadow-lg transition">
        <div>
          <p className="font-medium text-blue-700">🔁 Relance automatique</p>
          <p className="text-sm text-blue-600">SMS & email envoyés si paiement en retard</p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition shadow-sm">
          Gérer les rappels
        </button>
      </div>
    </div>
  );
}
