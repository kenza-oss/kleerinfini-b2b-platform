import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProducerById } from '../services/apiProducer';
import ProducerGallery from '../components/ProducerGallery';
import CertificationBadge from '../components/CertificationBadge';
import ProductCard from '../components/ProductCard';
import QuoteRequestModal from '../components/QuoteRequestModal';

const ProducerProfile = () => {
  const { id } = useParams();
  const [producer, setProducer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getProducerById(id);
      setProducer(data);
    }
    fetchData();
  }, [id]);

  if (!producer) return <div className="p-6 text-center">Chargement...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 text-gray-800">
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-extrabold">{producer.name}</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-32 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg shadow hover:from-blue-700 hover:to-blue-900 transition duration-300"
        >
          📩 Demander un devis
        </button>
      </div>

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
          {producer.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <QuoteRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ProducerProfile;
