import React from "react";
import {
  FaRocket, FaSearch, FaHandshake, FaChartLine,
  FaCloud, FaCogs, FaCode, FaGlobe, FaUserTie, FaDatabase, FaEye, FaLightbulb
} from "react-icons/fa";
import backgroundImage from "../../assets/about.jpg";
import bgBlurred from "../../assets/back.jpeg";
import partner1 from "../../assets/back.jpeg";
import partner2 from "../../assets/back.jpeg";
import partner3 from "../../assets/back.jpeg";
import partner4 from "../../assets/back.jpeg";
import partner5 from "../../assets/back.jpeg";
import partner6 from "../../assets/back.jpeg";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();

  const scrollToMissions = () => {
    document.getElementById("missions")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src={backgroundImage}
            alt="About background"
            className="w-full h-full object-cover"
            style={{ 
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              minWidth: '100vw',
              minHeight: '100vh'
            }}
          />
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="w-full max-w-5xl px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white  drop-shadow-lg">
              {t('about.title')}
            </h1>
            <p className="text-lg md:text-xl mb-6 text-white drop-shadow-md">
              {t('about.description')}
            </p>
            <button
              onClick={scrollToMissions}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200 shadow-lg"
            >
              {t('about.button')}
            </button>
          </div>
        </div>
      </div>

      {/* Missions Section */}
      <section id="missions" className="py-16 px-6 md:px-12 lg:px-20 bg-white">
        <h2 className="text-3xl font-bold text-orange-500 mb-12 text-center">{t('about.missionsTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <MissionCard icon={<FaRocket />} text={t('about.mission1')} />
          <MissionCard icon={<FaSearch />} text={t('about.mission2')} />
          <MissionCard icon={<FaHandshake />} text={t('about.mission3')} />
        </div>
      </section>

      {/* Ce que nous proposons */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-[#f5f2eb]">
        <h2 className="text-3xl font-bold  text-orange-500 mb-12 text-center">{t('about.offersTitle')}</h2>
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8">
          <OfferCard title={t('about.offer1.title')} icon={<FaChartLine />} desc={t('about.offer1.desc')} />
          <OfferCard title={t('about.offer2.title')} icon={<FaGlobe />} desc={t('about.offer2.desc')} />
          <OfferCard title={t('about.offer3.title')} icon={<FaUserTie />} desc={t('about.offer3.desc')} />
          <OfferCard title={t('about.offer4.title')} icon={<FaDatabase />} desc={t('about.offer4.desc')} />
        </div>
      </section>

      {/* Expertise */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-white">
        <h2 className="text-3xl font-bold text-orange-500 mb-12 text-center">{t('about.expertiseTitle')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <ExpertiseItem label={t('about.expertise1')} icon={<FaCode />} />
          <ExpertiseItem label={t('about.expertise2')} icon={<FaCloud />} />
          <ExpertiseItem label={t('about.expertise3')} icon={<FaCogs />} />
          <ExpertiseItem label={t('about.expertise4')} icon={<FaEye />} />
          <ExpertiseItem label={t('about.expertise5')} icon={<FaHandshake />} />
          <ExpertiseItem label={t('about.expertise6')} icon={<FaGlobe />} />
        </div>
      </section>

      {/* Valeurs + Vision */}
      <section
        className="py-20 px-6 md:px-12 lg:px-20 bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${bgBlurred})` }}
      >
        <div className="bg-black bg-opacity-60 p-10 rounded-lg max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-6">{t('about.valuesTitle')}</h2>
          <p className="text-lg mb-6">{t('about.values')}</p>
          <h2 className="text-3xl font-bold text-orange-400 mb-4">{t('about.visionTitle')}</h2>
          <p className="text-lg">{t('about.vision')}</p>
        </div>
      </section>

      {/* Partenaires */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-white">
        <h2 className="text-3xl font-bold text-orange-500 mb-12 text-center">{t('about.partnersTitle')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <PartnerCard name="Ali Benyoucef" role={t('about.partner1')} image={partner1} />
          <PartnerCard name="Sara Bensalem" role={t('about.partner2')} image={partner2} />
          <PartnerCard name="Nabil Ait" role={t('about.partner3')} image={partner3} />
          <PartnerCard name="Lina Brahimi" role={t('about.partner4')} image={partner4} />
          <PartnerCard name="Ahmed Djellal" role={t('about.partner5')} image={partner5} />
          <PartnerCard name="Yasmine Bacha" role={t('about.partner6')} image={partner6} />
        </div>
      </section>
    </div>
  );
}

function MissionCard({ icon, text }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-orange-500 text-5xl">{icon}</div>
      <p className="text-lg max-w-xs text-center">{text}</p>
    </div>
  );
}

function OfferCard({ title, icon, desc }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center">
      <div className="text-4xl text-orange-500 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}

function ExpertiseItem({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-4xl text-orange-500">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function PartnerCard({ image, name, role }) {
  return (
    <div className="bg-white p-4 shadow-md rounded-xl hover:shadow-lg transition flex flex-col items-center text-center">
      <img src={image} alt={name} className="w-28 h-28 rounded-full object-cover mb-4" />
      <h4 className="font-bold text-lg">{name}</h4>
      <p className="text-sm text-gray-600">{role}</p>
    </div>
  );
}