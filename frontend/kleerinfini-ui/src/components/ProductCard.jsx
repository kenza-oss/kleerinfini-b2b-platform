import React from 'react';
import { FaCertificate } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border rounded-xl shadow hover:shadow-md transition overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.category}</p>
        {product.exportable && (
          <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
            Exportable
          </span>
        )}
        <div className="flex flex-wrap gap-2 mt-2">
          {product.certifications?.map((cert, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
              <FaCertificate className="text-xs" /> {cert}
            </span>
          ))}
        </div>
        <div className="pt-3">
          <Link
            to={`/producer/${product.id}`}
            className="text-sm text-blue-600 hover:underline"
          >
            En savoir plus →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
