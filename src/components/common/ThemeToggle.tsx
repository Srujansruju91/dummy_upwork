import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" />
      ) : (
        <Sun className="h-5 w-5 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" />
      )}
    </button>
  );
}