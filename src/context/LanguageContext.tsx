'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import translations, { Language, Translations } from '@/lib/translations';

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lang') as Language | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored === 'he') setLangState('he');
    } catch { /* noop */ }
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Language) => {
    setLangState(l);
    try { localStorage.setItem('lang', l); } catch { /* noop */ }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang], isRTL: lang === 'he' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
