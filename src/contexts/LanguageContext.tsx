import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, SupportedLanguage } from '@/i18n/settings';

// Add translations here (we'll keep it simple for now, expand as needed)
export const translations = {
  en: {
    nav: {
      categories: "Categories",
      preHarvest: "Pre-Harvest",
      howItWorks: "How It Works",
      globalReach: "Global Reach",
      signIn: "Sign In",
      joinNow: "Join Now"
    },
    footer: {
      about: "About Us",
      contact: "Contact Us",
      subscribe: "Subscribe",
      rights: "All rights reserved"
    }
  },
  ar: {
    nav: {
      categories: "الفئات",
      preHarvest: "ما قبل الحصاد",
      howItWorks: "كيف يعمل",
      globalReach: "الوصول العالمي",
      signIn: "تسجيل الدخول",
      joinNow: "انضم الآن"
    },
    footer: {
      about: "معلومات عنا",
      contact: "اتصل بنا",
      subscribe: "اشترك",
      rights: "جميع الحقوق محفوظة"
    }
  }
};

type TranslationType = typeof translations.en | typeof translations.ar;

type LanguageContextType = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  translations: TranslationType;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState<SupportedLanguage>('en');

  useEffect(() => {
    // Get saved language preference from localStorage
    const savedLanguage = localStorage.getItem('language') as SupportedLanguage;
    if (savedLanguage && Languages.includes(savedLanguage as any)) {
      setLanguageState(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }

    // Set document direction based on language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [i18n]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      translations: translations[language] 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
