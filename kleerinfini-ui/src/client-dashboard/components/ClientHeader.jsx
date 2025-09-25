// src/components/ClientHeader.jsx
import React from 'react';
import { FaBell } from 'react-icons/fa';
import clientAvatar from '../../assets/avatar.png';
import logo from '../../assets/logo.png';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../components/LanguageSelector';

const ClientHeader = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* LOGO EN SUPERPOSITION */}
      <div className="fixed top-0 left-12 z-50">
        <img
          src={logo}
          alt="Logo"
          className=" w-28 h-auto object-contain"
        />
      </div>

      <header className="fixed top-0 left-0 w-full h-24 bg-black flex justify-between items-center px-20 shadow-lg z-40">
        <div className="flex items-center gap-6 ml-64">
          <div>
            <h1 className="text-2xl font-semibold text-white">
              {t('clientHeader.greeting')}{' '}
              <span className="text-orange-500 font-bold">
                {t('clientHeader.clientName')}
              </span>{' '}
              👋
            </h1>
            <p className="text-sm text-gray-300">{t('clientHeader.subtitle')}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <LanguageSelector />
          <button className="relative text-white hover:text-orange-500">
            <FaBell className="text-2xl" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <img
            src={clientAvatar}
            alt={t('clientHeader.profileAlt')}
            className="w-12 h-12 rounded-full border-2 border-orange-400 object-cover"
          />
        </div>
      </header>
    </>
  );
};

export default ClientHeader;