import React, { createContext, useContext, useState, useEffect } from 'react';
import { es } from './es';
import { en } from './en';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved === 'es' || saved === 'en') return saved;
    
    // Auto-detect browser language
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'es' ? 'es' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Helper to resolve dotted path strings (e.g., 'hero.headline')
  const t = (path: string): any => {
    const dictionary = language === 'es' ? es : en;
    const parts = path.split('.');
    let current: any = dictionary;
    
    for (const part of parts) {
      if (current === undefined || current === null) return path;
      current = current[part];
    }
    
    return current !== undefined ? current : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
