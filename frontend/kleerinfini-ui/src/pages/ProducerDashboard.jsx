import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { getDashboard, updateDashboard } from "../api/dashboard";

import SidebarProducer from "../components/SidebarProducer";
import DashboardHeader from "../components/DashboardHeader";
import StatsBox from "../components/StatsBox";
import PaymentStatusCard from "../components/PaymentStatusCard";
import ProductCard from "../components/ProductCard";
import QuoteRequests from "../components/QuoteRequests";
import UploadDocumentForm from "../components/UploadDocumentForm";
import ProducerProfile from "../components/ProducerProfile";
import DetailedStatistics from "../components/DetailedStatistics";
import Messages from "../components/Messages";

const ProducerDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // state filled from backend
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [demands, setDemands] = useState([]);
  const [documents, setDocuments] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    id: null,
    name: "",
    shortDesc: "",
    longDesc: "",
    category: "",
    subCategory: "",
    price: "",
    capacity: "",
    file: null,
    video: "",
    certificates: "",
    exportable: false,
  });

  // fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // ⚠️ replace 1 with the real producer ID (from auth / context)
        const data = await getDashboard(1);
        setProducts(data.products || []);
        setMessages(data.messages || []);
        setDemands(data.demands || []);
        setDocuments(data.documents || []);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      }
    };
    fetchData();
  }, []);

  // form handler
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  // product add/edit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let updated;
      if (form.id) {
        // update existing
        updated = products.map((p) =>
          p.id === form.id ? { ...form } : p
        );
      } else {
        // add new product locally until you wire products API
        const newProduct = {
          ...form,
          id: Date.now(),
          status: "active",
          type: "Produit",
          dateAdded: new Date().toLocaleDateString("fr-FR"),
          views: 0,
          clicks: 0,
          image: "/images/default.jpg",
        };
        updated = [...products, newProduct];
      }

      setProducts(updated);
      await updateDashboard(1, { products: updated });

      setIsOpen(false);
      setForm({
        id: null,
        name: "",
        shortDesc: "",
        longDesc: "",
        category: "",
        subCategory: "",
        price: "",
        capacity: "",
        file: null,
        video: "",
        certificates: "",
        exportable: false,
      });
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const markMessageAsRead = (id) => {
    setMessages((msgs) =>
      msgs.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  };

  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  const renderDashboardContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <StatsBox
            products={products}
            messages={messages}
            setActiveTab={setActiveTab}
          />
        );
      case "products":
        return (
          <div className="bg-image-light-beige rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-image-dark-text mb-6">
              Tous les Produits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showActions={{ edit: true, delete: true, download: true }}
                  onEdit={(id) => {
                    const prod = products.find((p) => p.id === id);
                    setForm({ ...prod });
                    setIsOpen(true);
                  }}
                  onDelete={(id) => {
                    if (
                      window.confirm(
                        "Êtes-vous sûr de vouloir supprimer ce produit ?"
                      )
                    ) {
                      const updated = products.filter((p) => p.id !== id);
                      setProducts(updated);
                      updateDashboard(1, { products: updated });
                    }
                  }}
                  onDownload={(id) => {
                    const prod = products.find((p) => p.id === id);
                    const doc = new jsPDF();
                    doc.setFontSize(18);
                    doc.text(prod.name, 10, 20);
                    doc.setFontSize(12);
                    doc.text(`Prix: ${prod.price}`, 10, 30);
                    doc.text(`Stock: ${prod.stock}`, 10, 40);
                    doc.text(`Type: ${prod.type}`, 10, 50);
                    doc.text(`Date ajout: ${prod.dateAdded}`, 10, 60);
                    doc.save(`${prod.name}.pdf`);
                  }}
                />
              ))}
            </div>
          </div>
        );
      case "demands":
        return <QuoteRequests demands={demands} setDemands={setDemands} />;
      case "statistics":
        return <DetailedStatistics products={products} />;
      case "profile":
        return (
          <ProducerProfile
            onSave={async (profile) => {
              try {
                await updateDashboard(1, { profile });
              } catch (err) {
                console.error("Profile update failed:", err);
              }
            }}
          />
        );
      case "documents":
        return (
          <UploadDocumentForm
            documents={documents}
            setDocuments={setDocuments}
          />
        );
      case "payments":
        return <PaymentStatusCard />;
      case "messages":
        return (
          <Messages messages={messages} setMessages={setMessages} />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-image-gray-background">
        <SidebarProducer
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          unreadCount={unreadMessagesCount}
        />
        <div className="ml-72 flex-1 p-6">
          <DashboardHeader
            activeTab={activeTab}
            onAddProductClick={() => setIsOpen(true)}
            products={products}
          />
          {renderDashboardContent()}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative">
            <h2 className="text-xl font-bold text-image-dark-text mb-4">
              {form.id
                ? "Modifier le produit"
                : "Ajouter un nouveau produit/service"}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 max-h-[70vh] overflow-y-auto pr-2"
            >
              <input
                type="text"
                name="name"
                placeholder="Nom du produit"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                required
              />
              <input
                type="text"
                name="shortDesc"
                placeholder="Description courte"
                value={form.shortDesc}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
              <textarea
                name="longDesc"
                placeholder="Description longue"
                value={form.longDesc}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 h-24"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="category"
                  placeholder="Catégorie"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
                <input
                  type="text"
                  name="subCategory"
                  placeholder="Sous-catégorie"
                  value={form.subCategory}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  name="price"
                  placeholder="Prix indicatif"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
                <input
                  type="text"
                  name="capacity"
                  placeholder="Capacité / Planning"
                  value={form.capacity}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
              <input
                type="url"
                name="video"
                placeholder="Lien vidéo ou externe"
                value={form.video}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
              <input
                type="text"
                name="certificates"
                placeholder="Certificats associés"
                value={form.certificates}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  name="exportable"
                  checked={form.exportable}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                ✅ Disponible à l’export
              </label>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-image-orange text-white font-semibold hover:bg-orange-600"
                >
                  {form.id ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProducerDashboard;
