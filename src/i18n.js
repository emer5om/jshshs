// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import translationEn from './locales/en.json';

// Initialize i18next instance
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEn },
    },
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language if translation is missing
    interpolation: { escapeValue: false },
  });

export default i18n;