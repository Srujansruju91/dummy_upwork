export const SUPPORTED_LANGUAGES = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  hi: 'हिंदी',
  zh: '中文'
} as const;

export type LanguageCode = keyof typeof SUPPORTED_LANGUAGES;