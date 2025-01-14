import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

export function useLanguage() {
  const { i18n } = useTranslation();

  const setLanguage = useCallback((lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  }, [i18n]);

  return {
    currentLanguage: i18n.language,
    setLanguage,
    isRTL: i18n.dir() === 'rtl'
  };
}