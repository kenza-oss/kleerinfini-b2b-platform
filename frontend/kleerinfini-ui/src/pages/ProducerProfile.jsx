import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProducerById } from '../services/apiProducer';
import ProducerGallery from '../components/ProducerGallery';
import CertificationBadge from '../components/CertificationBadge';
import ProductCard from '../components/ProductCard';

const ProducerProfile = () => {
  const { id } = useParams();
  const [producer, setProducer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getProducerById(id);
      setProducer(data);
    }
    fetchData();
  }, [id]);

  if (!producer) return <div className="p-6 text-center">Chargement...</div>;

  return (
    <>
      <div className="max-w-7xl mx-auto p-6 text-gray-800">
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-extrabold">{producer.name}</h1>
          <button
            onClick={() => setShowModal(true)}
            className="ml-16 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg shadow hover:from-blue-700 hover:to-blue-900 transition duration-300"
          >
            📩 Demander un devis
          </button>
        </div>

       {producer.address && (
         <p className="text-gray-600 mb-6">
            {producer.address}
            {producer.city ? `, ${producer.city}` : ""}
            {producer.country ? `, ${producer.country}` : ""}
          </p>
        )}
        <ProducerGallery images={producer.gallery} />
        <p className="text-lg mt-4 mb-8">{producer.description}</p>




        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Certifications</h2>
          <div className="flex flex-wrap gap-2">
            {producer.certifications.map((cert, i) => (
              <CertificationBadge key={i} name={cert} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Produits exportables</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {producer.products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Devis */}
      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white px-5 py-4 rounded-lg shadow-2xl w-full max-w-lg relative">
      <button
        className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-xl"
        onClick={() => setShowModal(false)}
      >
        ×
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center"> Demande de devis</h2>

      <form
        className="space-y-4 max-h-[80vh] overflow-y-auto"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Votre demande a été envoyée !");
          setShowModal(false);
        }}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">Souhaitez-vous importer ce produit ? *</label>
          <div className="flex items-center gap-6 mt-1">
            <label className="flex items-center">
              <input type="radio" name="import" value="oui" required className="mr-2" />
              Oui
            </label>
            <label className="flex items-center">
              <input type="radio" name="import" value="non" required className="mr-2" />
              Non
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Produit recherché</label>
          <input type="text" className="w-full border rounded px-3 py-2 mt-1" placeholder="Ex: Dattes biologiques" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Pays de destination</label>
          <input type="text" className="w-full border rounded px-3 py-2 mt-1" placeholder="Ex: France" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quantité souhaitée</label>
          <input type="text" className="w-full border rounded px-3 py-2 mt-1" placeholder="Ex: 1 tonne / mois" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Certifications nécessaires</label>
          <div className="flex flex-wrap gap-4 mt-1">
            {["Bio", "ISO", "Halal", "FairTrade"].map((cert) => (
              <label key={cert} className="flex items-center">
                <input type="checkbox" name="certifications" value={cert} className="mr-2" />
                {cert}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Budget estimé</label>
          <div className="flex flex-col gap-2 mt-1">
            <label><input type="radio" name="budget" value="<5K" className="mr-2" /> Moins de 5 000 €</label>
            <label><input type="radio" name="budget" value="5K-20K" className="mr-2" /> Entre 5 000 € et 20 000 €</label>
            <label><input type="radio" name="budget" value="20K-100K" className="mr-2" /> Entre 20 000 € et 100 000 €</label>
            <label><input type="radio" name="budget" value="100K+" className="mr-2" /> Plus de 100 000 €</label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description de la demande *</label>
          <textarea
            required
            rows={3}
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="Expliquez vos besoins spécifiques, délais, logistique, etc."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fichier joint (optionnel)</label>
          <input type="file" className="w-full mt-1" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom *</label>
            <input type="text" required className="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <input type="email" required className="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Téléphone</label>
            <input type="text" className="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Entreprise</label>
            <input type="text" className="w-full border rounded px-3 py-2 mt-1" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition mt-4"
        >
          Envoyer
        </button>
      </form>

    </div>
  </div>
)}


      {/* Message Button*/}
<div className="fixed bottom-16 right-10 z-50">
  <button
    onClick={() => alert("TODO: Afficher formulaire d'inscription client")}
    className="relative w-16 h-16 rounded-full bg-gray-900 shadow-lg flex items-center justify-center hover:bg-black transition duration-300"
  >
    <span className="text-white text-3xl">💬</span>
    <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white shadow"></span>
  </button>
</div>

    </>
  );
};

export default ProducerProfile;
