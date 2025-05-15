
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const Languages = ['en', 'ar'] as const;
export type SupportedLanguage = typeof Languages[number];

const resources = {
  en: {
    translation: {
      categories: 'Categories',
      preHarvest: 'Pre-Harvest',
      howItWorks: 'How It Works',
      globalReach: 'Global Reach',
      signIn: 'Sign In',
      join: 'Join',
      myAccount: 'My Account',
      profile: 'Profile',
      sellerDashboard: 'Seller Dashboard',
      logout: 'Logout',
      myListings: 'My Listings'
    }
  },
  ar: {
    translation: {
      categories: 'الفئات',
      preHarvest: 'ما قبل الحصاد',
      howItWorks: 'كيف يعمل',
      globalReach: 'الوصول العالمي',
      signIn: 'تسجيل الدخول',
      join: 'انضم الآن',
      myAccount: 'حسابي',
      profile: 'الملف الشخصي',
      sellerDashboard: 'لوحة تحكم البائع',
      logout: 'تسجيل الخروج',
      myListings: 'قوائمي'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: typeof window !== 'undefined' ? localStorage.getItem('language') || 'en' : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already does escaping
    }
  });

export default i18n;
