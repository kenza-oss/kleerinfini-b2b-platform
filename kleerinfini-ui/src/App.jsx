import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import AppRoutes from "./routes/AppRoutes";
import './index.css';
import './i18n'; // Import de la configuration i18n

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Récupérer la langue sauvegardée ou utiliser le français par défaut
    const savedLanguage = localStorage.getItem('language') || 'fr';
    if (savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }

    // Gérer la direction RTL pour l'arabe
    const updateDirection = () => {
      document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = i18n.language;
      
      // Ajouter une classe CSS pour le body selon la langue
      document.body.className = `lang-${i18n.language}`;
    };

    // Appliquer la direction initiale
    updateDirection();

    // Écouter les changements de langue
    i18n.on('languageChanged', updateDirection);

    // Cleanup
    return () => {
      i18n.off('languageChanged', updateDirection);
    };
  }, [i18n]);

  return (
    <div className="app-container">
      <AppRoutes />
    </div>
  );
}

export default App;