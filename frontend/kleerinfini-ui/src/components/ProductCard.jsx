import React from "react";
import { FaEdit, FaTrash, FaDownload, FaArrowRight } from "react-icons/fa";

const ProductCard = ({
  product,
  onEdit,
  onDelete,
  onDownload,
  onVoirPlus,
  showActions = { edit: true, delete: true, download: true, voirPlus: false },
}) => {
  return (
    <div className="w-full md:w-[300px] min-h-[200px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-image-orange/10">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={product.image || "/images/placeholder.png"}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        {/* Status badge */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
            product.status === "active"
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-red-100 text-red-700 border border-red-200"
          }`}
        >
          {product.status === "active" ? "✅ Disponible" : "❌ Rupture"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title & Type */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-image-dark-text group-hover:text-image-orange transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-image-dark-text/70 capitalize">{product.type}</p>
          </div>
          <span className="text-xs text-image-dark-text/50">{product.dateAdded}</span>
        </div>

        {/* Price & Stock */}
        <div className="text-sm text-image-dark-text/80 space-y-1">
          {product.price && (
            <p>
              💲 Prix: <span className="font-semibold">{product.price}</span>
            </p>
          )}
          {product.stock && (
            <p>
              📦 Stock: <span className="font-semibold">{product.stock}</span>
            </p>
          )}
        </div>

        {/* Actions */}
        {(showActions.edit || showActions.delete || showActions.download || showActions.voirPlus) && (
          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
            {showActions.edit && (
              <button
                onClick={() => onEdit?.(product.id)}
                className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                <FaEdit className="w-4 h-4" /> Modifier
              </button>
            )}
            {showActions.delete && (
              <button
                onClick={() => onDelete?.(product.id)}
                className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
              >
                <FaTrash className="w-4 h-4" /> Supprimer
              </button>
            )}
            {showActions.download && (
              <button
                onClick={() => onDownload?.(product.id)}
                className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-800 transition-colors"
              >
                <FaDownload className="w-4 h-4" /> Fiche technique
              </button>
            )}
            {showActions.voirPlus && (
              <button
                onClick={() => onVoirPlus?.(product.id)}
                className="flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-800 transition-colors"
              >
                <FaArrowRight className="w-4 h-4" /> Voir plus
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
