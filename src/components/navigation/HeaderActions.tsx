import React from 'react';
import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SearchInput } from '../common/SearchInput';
import { NotificationBell } from '../common/NotificationBell';
import { ThemeToggle } from '../common/ThemeToggle';
import { LanguageSelector } from '../common/LanguageSelector';
import type { User } from '../../types/auth';

interface HeaderActionsProps {
  user: User | null;
  onLogout: () => void;
  t: (key: string) => string;
}

export function HeaderActions({ user, onLogout, t }: HeaderActionsProps) {
  return (
    <>
      <SearchInput 
        placeholder={t('common.search')}
        onChange={(value) => console.log('Search:', value)} 
      />
      
      <div className="flex items-center space-x-2">
        <LanguageSelector />
        <NotificationBell />
        <ThemeToggle />
        
        {user ? (
          <button
            onClick={onLogout}
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
          >
            <LogOut className="h-5 w-5 mr-1 dark:stroke-gray-300" />
            <span className="hidden md:inline">{t('common.logout')}</span>
          </button>
        ) : (
          <Link
            to="/login"
            className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
          >
            {t('common.login')}
          </Link>
        )}
      </div>
    </>
  );
}