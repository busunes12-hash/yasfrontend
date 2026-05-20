import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import i18n from '../i18n';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'yasbeads_lang';

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem(STORAGE_KEY) || 'ar');

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem(STORAGE_KEY, lang);
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((cur) => (cur === 'ar' ? 'en' : 'ar'));
  }, []);

  const setLanguage = useCallback((next) => {
    if (next === 'ar' || next === 'en') setLang(next);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLanguage, isRTL: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
