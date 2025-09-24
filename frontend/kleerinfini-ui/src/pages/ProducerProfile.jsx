import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CertificationBadge from "../components/CertificationBadge";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { getProfileById } from "../api/profiles";
import { getProductsByProducer } from "../api/products";

const ProducerProfile = () => {
  const { id } = useParams();
  const [producer, setProducer] = useState(null);
  const [products, setProducts] = useState([]);
  const [showDevisModal, setShowDevisModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const profileData = await getProfileById(id);
        const productsData = await getProductsByProducer(id);
        setProducer(profileData);
        setProducts(productsData);
      } catch (err) {
        console.error("Error fetching producer or products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleVoirPlus = (product) => {
    setSelectedProduct(product);
    setShowDevisModal(true);
  };

  if (loading)
    return (
      <div className="p-6 text-center text-image-dark-text">
        Chargement...
      </div>
    );

  if (!producer)
    return (
      <div className="p-6 text-center text-red-500">
        Profil introuvable.
      </div>
    );

  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="relative">
        <div
          className="w-full h-[700px] bg-cover bg-center relative"
          style={{ backgroundImage: "url('/images/oil.webp')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>
          <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center px-6">
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 shadow-2xl animate-fade-in">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-white animate-slide-in-left">
                  {producer.name}
                </h1>
                <button
                  onClick={() => setShowDevisModal(true)}
                  className="ml-0 md:ml-6 px-6 py-3 bg-gradient-to-r from-image-orange to-image-dark-orange font-semibold rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 animate-slide-in-right"
                >
                  📩 Demander un devis
                </button>
              </div>

              {producer.address && (
                <p className="text-gray-300 text-lg mb-4">
                  {producer.address}
                  {producer.city ? `, ${producer.city}` : ""}
                  {producer.country ? `, ${producer.country}` : ""}
                </p>
              )}
              <p className="text-gray-200 text-lg">{producer.description}</p>

              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4 text-white">
                  Certifications
                </h2>
                <div className="flex flex-wrap gap-3">
                  {producer.certifications?.map((cert, i) => (
                    <CertificationBadge key={i} name={cert} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-image-light-beige pt-10 pb-32 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-image-dark-text tracking-wide">
              Produits exportables
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products?.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onVoirPlus={() => handleVoirPlus(product)}
                  showActions={{
                    edit: false,
                    delete: false,
                    download: false,
                    voirPlus: true,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Devis Modal */}
      {showDevisModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-start pt-10 z-50 overflow-y-auto">
          <div className="bg-white px-6 py-8 rounded-2xl shadow-2xl w-full max-w-2xl relative">
            <button
              className="absolute top-3 right-4 text-black hover:text-red-500 text-2xl font-bold"
              onClick={() => setShowDevisModal(false)}
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-vblack mb-5 text-center">
              Demande de devis
            </h2>

            <form
              className="space-y-4 max-h-[80vh] overflow-y-auto"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Votre demande a été envoyée !");
                setShowDevisModal(false);
              }}
            >
              {/* Form Fields */}
              <div>
                <label className="block text-sm font-medium text-black">
                  Souhaitez-vous importer ce produit ? *
                </label>
                <div className="flex items-center gap-6 mt-1 text-black">
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
                <label className="block text-sm font-medium text-black">Produit recherché</label>
                <input type="text" className="w-full border rounded px-3 py-2 mt-1" placeholder="Ex: Dattes" />
              </div>

              <div>
                <label className="block text-sm font-medium text-black">Pays de destination</label>
                <input type="text" className="w-full border rounded px-3 py-2 mt-1" placeholder="Ex: France" />
              </div>

              <div>
                <label className="block text-sm font-medium text-black">Quantité souhaitée</label>
                <input type="text" className="w-full border rounded px-3 py-2 mt-1" placeholder="Ex: 1 tonne / mois" />
              </div>

              <div>
                <label className="block text-sm font-medium text-black">Certifications nécessaires</label>
                <div className="flex flex-wrap gap-4 mt-1 text-black">
                  {["Bio", "ISO", "Halal", "FairTrade"].map((cert) => (
                    <label key={cert} className="flex items-center">
                      <input type="checkbox" name="certifications" value={cert} className="mr-2" />
                      {cert}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black">Budget estimé</label>
                <div className="flex flex-col gap-2 mt-1 text-black">
                  <label><input type="radio" name="budget" value="<5K" className="mr-2" />Moins de 5 000 €</label>
                  <label><input type="radio" name="budget" value="5K-20K" className="mr-2" />Entre 5 000 € et 20 000 €</label>
                  <label><input type="radio" name="budget" value="20K-100K" className="mr-2" />Entre 20 000 € et 100 000 €</label>
                  <label><input type="radio" name="budget" value="100K+" className="mr-2" />Plus de 100 000 €</label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black">Description de la demande *</label>
                <textarea required rows={3} className="w-full border rounded px-3 py-2 mt-1" placeholder="Expliquez vos besoins spécifiques, délais, logistique, etc."></textarea>
              </div>

              <button type="submit" className="w-full bg-image-orange hover:bg-image-dark-orange text-black font-semibold py-2 rounded-md transition mt-4">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Message Button */}
      <div className="fixed bottom-16 right-10 z-50">
        <button
          onClick={() => alert("TODO: Afficher formulaire d'inscription client")}
          className="relative w-16 h-16 rounded-full bg-gray-900 shadow-lg flex items-center justify-center hover:bg-black transition duration-300"
        >
          <span className="text-white text-3xl">💬</span>
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white shadow"></span>
        </button>
      </div>

      <Footer />
    </>
  );
};

export default ProducerProfile;
