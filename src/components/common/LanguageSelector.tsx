import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { SUPPORTED_LANGUAGES, type LanguageCode } from '../../i18n/constants';

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600">
        <Globe className="h-5 w-5 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" />
        <span className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
          {currentLanguage.toUpperCase()}
        </span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 hidden group-hover:block">
        <div className="py-1" role="menu">
          {(Object.entries(SUPPORTED_LANGUAGES) as [LanguageCode, string][]).map(([code, name]) => (
            <button
              key={code}
              onClick={() => setLanguage(code)}
              className={`block px-4 py-2 text-sm w-full text-left ${
                currentLanguage === code
                  ? 'bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-400'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}