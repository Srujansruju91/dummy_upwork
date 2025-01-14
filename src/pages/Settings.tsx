import React from 'react';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { LanguageSelector } from '../components/common/LanguageSelector';

export function Settings() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Settings</h2>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Theme</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Choose between light and dark mode</p>
            </div>
            <ThemeToggle />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Language</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Select your preferred language</p>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </div>
  );
}