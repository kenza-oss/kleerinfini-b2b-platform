import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border rounded-lg shadow hover:shadow-md transition overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{product.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
