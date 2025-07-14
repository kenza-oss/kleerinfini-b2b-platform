import React from 'react';
import { useNavigate } from "react-router-dom";
import image10 from "../assets/image4.jpeg";

const ProductDetails = () => {
  const navigate = useNavigate();

  const product = {
    name: "Dattes Bio Fraîches",
    category: "Fruits",
    image: image10,
    description:
      "Dattes biologiques de première qualité récoltées dans les meilleures palmeraies. Idéales pour l'exportation avec une longue durée de conservation.",
    price: "Contactez-nous pour les prix",
    quantity: "Disponible en vrac (10kg, 20kg, 50kg)",
    origin: "Algérie",
    features: [
      "100% Biologique",
      "Longue durée de conservation",
      "Disponible toute l'année",
      "Idéal pour la vente en gros"
    ]
  };

  return (
    <div className="bg-[#f9f9f9] min-h-[700px] px-4 pt-20 relative">
      {/* Back Button */}
    <button
  onClick={() => navigate(-1)}
  className="absolute top-5 left-40 w-20 h-10 flex pl-30 items-center mt-10 justify-center bg-orange-600 text-white rounded-full hover:bg-orange-700 transition"
  aria-label="Retour"
>
  ←
</button>


      <div className="max-w-6xl bg-[#f5f2eb] mb-10 py-10 mx-auto flex flex-col md:flex-row gap-10">
        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-xl shadow-md object-cover w-[400px] h-[550px]"
          />
        </div>

        {/* Détails */}
        <div className="md:w-1/2 pt-10">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">{product.name}</h1>
          <p className="text-sm text-gray-600 mb-1">Catégorie : {product.category}</p>
          <p className="text-sm text-gray-600 mb-4">Origine : {product.origin}</p>

          <div className="text-lg text-green-700 font-semibold mb-2">{product.price}</div>
          <div className="text-gray-800 mb-6">{product.quantity}</div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <h3 className="text-md font-semibold mb-2">Caractéristiques principales :</h3>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            {product.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>

          <button className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition">
            Contacter le fournisseur
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;