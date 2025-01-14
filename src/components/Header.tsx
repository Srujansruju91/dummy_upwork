import React, { useState } from 'react';
import { LogOut, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { Navigation } from './navigation/Navigation';
import { HeaderActions } from './navigation/HeaderActions';
import { MobileMenuButton } from './navigation/MobileMenuButton';
import { MobileMenu } from './common/MobileMenu';
import { ProfileDropdown } from './profile/ProfileDropdown';

export function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-green-600 dark:text-green-400">
              upwork
            </Link>
            <Navigation user={user} />
          </div>
          
          <div className="flex items-center space-x-4">
            <HeaderActions 
              user={user} 
              onLogout={handleLogout} 
              t={t}
            />
            {user && <ProfileDropdown user={user} />}
            <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)} />
          </div>
        </div>
      </div>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        userType={user?.user_type}
      />
    </header>
  );
}