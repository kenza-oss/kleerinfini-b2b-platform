import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 

export default function DashboardHeader({ activeTab, onAddProductClick, products = [] }) {
  
  const exportProductsPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Liste des Produits", 14, 22);


    autoTable(doc, {
      head: [["Nom", "Prix", "Stock", "Status", "Date d'ajout"]],
      body: products.map(p => [
        p.name,
        p.price,
        p.stock,
        p.status === "active" ? "Disponible" : "Rupture",
        p.dateAdded
      ]),
      startY: 30,
      theme: "grid",
    });

    doc.save("produits.pdf");
  };

  return (
    <div className="bg-image-light-beige rounded-2xl p-6 shadow-lg mb-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-image-orange to-image-dark-orange"></div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-image-dark-text">
            {activeTab === "products" ? "Gestion des Produits" : "Tableau de Bord Producteur"}
          </h1>
        </div>
        <div className="flex gap-3 flex-wrap">
          {activeTab === "products" && (
            <>
              <button
                onClick={exportProductsPDF} 
                className="px-6 py-3 bg-white text-image-dark-text rounded-lg font-semibold hover:bg-image-gray-background transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                <span>📈</span>
                <span>Exporter PDF</span>
              </button>
              <button
                onClick={onAddProductClick}
                className="px-6 py-3 bg-image-orange text-white rounded-lg font-semibold hover:bg-image-dark-orange transition-all duration-300 flex items-center gap-2 shadow-md"
              >
                <span>+</span>
                <span>Nouveau Produit</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
