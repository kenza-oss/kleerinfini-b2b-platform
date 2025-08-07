import React from 'react';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  FaGlobe, FaFileAlt, FaComments, FaReceipt,
  FaUserCheck, FaRocket, FaBoxOpen, FaQuoteLeft,
  FaVideo, FaChevronRight, FaUser
} from 'react-icons/fa';
import { IconContext } from "react-icons";
import heroVideo from '../assets/video4.mp4';


const DjazagroPage = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Huile d'olive extra vierge",
      category: "Alimentaire",
      exportable: true,
      certifications: ["BIO", "CE"],
      image: "/images/placeholder.png",
      description: "Huile d'olive premium pressée à froid, idéale pour la cuisine et les soins de santé."
    },
    {
      id: 2,
      name: "Dattes Deglet Nour",
      category: "Alimentaire",
      exportable: true,
      certifications: ["Agriculture Biologique"],
      image: "/images/placeholder.png",
      description: "Dattes naturelles de haute quality, riches en nutriments et en saveur."
    },
    {
      id: 3,
      name: "Couscous traditionnel",
      category: "Alimentaire",
      exportable: true,
      certifications: ["ISO 22000"],
      image: "/images/placeholder.png",
      description: "Couscous artisanal préparé selon les méthodes traditionnelles algériennes."
    },
  ];

  const testimonials = [
    {
      name: "Mohamed B., Skikda",
      role: "Producteur d'huile d'olive",
      message: "Grâce à KleerInfini, j'ai pu présenter mes certificats et recevoir 3 demandes de devis depuis la France sans bouger de chez moi !",
      avatar: ""
    },
    {
      name: "Fatima K., Blida",
      role: "Exportatrice de dattes",
      message: "Une vraie vitrine d'export digitale. Mes vidéos, fiches produits, et devis sont tous centralisés.",
      avatar: ""
    },
    {
      name: "Samir A., Biskra",
      role: "Agriculteur biologique",
      message: "KleerInfini m'a permis de me préparer au salon Djazagro avec une image professionnelle.",
      avatar: ""
    },
  ];

  const features = [
    {
      icon: <FaGlobe />,
      title: "Vitrine digitale",
      description: "Présentez vos produits 24/7 aux acheteurs internationaux"
    },
    {
      icon: <FaFileAlt />,
      title: "Documents centralisés",
      description: "Certificats, fiches techniques et vidéos en un seul endroit"
    },
    {
      icon: <FaComments />,
      title: "Demandes de devis",
      description: "Recevez des demandes directement de l'étranger"
    },
    {
      icon: <FaReceipt />,
      title: "Prolongez Djazagro",
      description: "Votre présence continue après le salon"
    }
  ];

  return (
    <div className="bg-white text-image-dark-text font-sans">
      <Header />

      <div>
        {/* Video Background */}
        <div className="absolute top-0 left-0 w-full h-[450px] z-0 overflow-hidden">
          <video
            className="w-full h-full object-cover"
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
          ></video>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Hero Content */}
        <section className="relative h-[350px] flex items-center justify-center text-center text-white z-10">
          <div className="relative z-10 p-6 pt-72 pb-12 rounded-xl">
            <h1 className="text-4xl font-bold mb-4">
              Export Algérie - Djazagro 2025 & KleerInfini
            </h1>
            <p className="text-xl mb-4">La révolution B2B commence ici</p>
            <p className="text-lg italic">
              Une vitrine digitale qui connecte vos produits au marché mondial
            </p>
            <div className="mt-6 flex justify-center">
              <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-full text-white text-lg flex items-center gap-2">
                <FaUserCheck /> Créer mon profil export maintenant
              </button>
            </div>
          </div>
        </section>



        {/* Section 2: Notre Mission*/}
        <section className="bg-black text-white py-16"> 
          <div className="max-w-6xl mx-auto px-6 sm:px-8"> 
            <div className="text-center mb-12 pt-24">
              <h2 className="text-3xl font-bold mb-4">
                KleerInfini & Djazagro 2025 : Digitalisez votre présence au salon
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Notre mission est de soutenir les producteurs algériens exposants ou intéressés par l'export,
                en leur offrant une plateforme digitale complète.
                <br />
                <span className="text-orange-500 font-semibold">
                    Votre vitrine d'export digitale made in Algérie.
                </span>
                </p>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-xl hover:shadow-md transition shadow-sm border border-gray-700">
                  <IconContext.Provider value={{ className: "text-image-orange text-3xl mb-4" }}>
                    {feature.icon}
                  </IconContext.Provider>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gray-900 p-6 rounded-xl text-center shadow-inner">
              <p className="text-lg font-semibold text-gray-100">
                Notre objectif : prolonger l'impact du salon sur le digital — pour toucher plus de clients, plus longtemps.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Produits mis en avant */}
        <section className="bg-image-light-beige py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">

            <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex justify-center items-center gap-3">
                <FaBoxOpen className="text-image-orange" /> Produits mis en avant
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
                Découvrez une sélection de produits algériens prêts à l'export
            </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>

            <div className="mt-12 flex justify-center">
            <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-full text-white text-lg flex items-center gap-2">
                Explorer tous les produits <FaChevronRight />
            </button>
            </div>
        </div>
        </section>


        {/* Section 4: Témoignages  */}
        <section
          className="relative py-16" 
          style={{ backgroundImage: "/images/placeholder.png", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          {/* Dark overlay/frame */}
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>

          {/* Content container: max width, auto margins, and padding */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 text-white">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Ils nous font confiance</h2>
              <p className="text-gray-200 max-w-2xl mx-auto">
                Découvrez ce que nos utilisateurs disent de notre plateforme
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-gray-800 bg-opacity-80 p-6 shadow-lg rounded-xl hover:shadow-xl transition border border-gray-700">
                  <div className="flex items-center gap-4 mb-4">
                    {t.avatar ? (
                    <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover"
                        loading="lazy"
                    />
                    ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xl">
                        <FaUser />
                    </div>
                    )}

                    <div>
                      <p className="font-semibold text-white">{t.name}</p>
                      <p className="text-sm text-gray-300">{t.role}</p>
                    </div>
                  </div>
                  <p className="italic text-gray-200 flex items-start gap-2">
                    <FaQuoteLeft className="text-gray-400 mt-1 flex-shrink-0" />
                    {t.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Vidéo Démo */}
        <section className="bg-image-light-beige py-16">
          <div className="max-w-4xl mx-auto px-6 sm:px-8"> 
            <h2 className="text-3xl font-bold mb-4 flex justify-center items-center gap-3">
              <FaVideo className="text-red-600" /> Démo
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Découvrez en 1 minute comment utiliser la plateforme pour booster vos exportations
            </p>

            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl border-4 border-image-orange">
              <iframe
                className="w-full h-96"
                src="https://www.youtube.com/embed/t1-SdYWIBB4?start=3&modestbranding=1&showinfo=0&rel=0"
                title="Démo KleerInfini"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Section 6: Footer CTA */}
        <section className="bg-gradient-to-r from-image-orange to-image-dark-orange text-white py-16">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">
            <h2 className="text-3xl font-bold mb-6 flex justify-center items-center gap-3">
              <FaRocket /> Prêt à exporter vos produits ?
            </h2>
            <p className="text-xl mb-8">
              Créez votre profil sur KleerInfini et rejoignez la vitrine algérienne à Djazagro 2025
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-image-orange px-8 py-4 rounded-full font-semibold hover:bg-gray-100 flex items-center gap-2 transition-all hover:scale-105">
                <FaUserCheck /> Créer mon profil export
              </button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default DjazagroPage;