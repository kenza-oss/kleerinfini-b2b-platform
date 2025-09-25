import React from "react";
import image1 from "../assets/image1.jpeg";
// import image2 from "../assets/image2.jpeg";
// import image3 from "../assets/image3.jpeg";
import image4 from "../assets/image4.jpeg";
// import image5 from "../assets/image5.jpeg";
// import image6 from "../assets/image6.jpeg";
// import image8 from "../assets/image8.jpeg";
import image9 from "../assets/image9.jpeg";
import image10 from "../assets/image10.jpeg";
import image11 from "../assets/image11.jpeg";
import image12 from "../assets/image12.jpeg";
const products = [
  { name: "Miel", image: image1, sector: "Apiculture" },
  { name: "Dattes", image: image4, sector: "Agriculture" },
  { name: "Tomates", image: image10, sector: "Agroalimentaire" },
  { name: "Savon Naturel", image: image9, sector: "Cosmétique" },
//   { name: "Textile", image: image6, sector: "Industrie" },
   { name: "Confiture", image: image11, sector: "Agroalimentaire" },
   { name: "Cosmetique", image: image12, sector: "Agroalimentaire" },
];

export default function ExportProductsSection() {
  return (
    <section className="py-20 px-8 bg-gradient-to-b from-[#f5f2eb] to-[#eee9dd] text-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-black">Produits à l'export</h2>
          <p className="text-lg text-gray-600 ">
            Découvrez l'authenticité des produits algériens d'excellence
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <a
              key={index}
              href="#"
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-[#D2B48C] border-opacity-30 hover:border-opacity-60"
              style={{
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(210,180,140,0.25), 0 8px 16px rgba(210,180,140,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
              }}
            >
      
              <div className="relative overflow-hidden">
                <div className="bg-gradient-to-br from-[#f5f2eb] to-[#ede7d9] p-6">
                  <div className="relative overflow-hidden rounded-xl">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-xl"></div>
                  </div>
                </div>
                
      
               
              </div>
              
   
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-black group-hover:text-orange-600 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-sm font-medium mb-4" style={{ color: '#D2B48C' }}>
                  Produit authentique d'Algérie
                </p>
                
                
           
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-orange-500 group-hover:text-orange-600 transition-colors duration-300">
                    Découvrir →
                  </span>
                  <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors duration-300">
                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button 
            className="bg-orange-500 text-white hover:bg-orange-600 font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg transform hover:scale-105"
            style={{
              boxShadow: '0 4px 20px rgba(249,115,22,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(210,180,140,0.4), 0 4px 16px rgba(249,115,22,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(249,115,22,0.3)';
            }}
          >
            Voir tous les produits
          </button>
        </div>
      </div>
    </section>
  );
}