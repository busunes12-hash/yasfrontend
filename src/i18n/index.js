import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ar from './ar.json';

const STORAGE_KEY = 'yasbeads_lang';

// Safely get initial language with fallback
let initialLang = 'ar';
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    initialLang = localStorage.getItem(STORAGE_KEY) || 'ar';
  }
} catch (e) {
  console.warn('localStorage not available:', e);
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: initialLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnEmptyString: false,
});

// Apply direction & lang on initial load
if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLang;
  document.documentElement.dir = initialLang === 'ar' ? 'rtl' : 'ltr';
}

export default i18n;
