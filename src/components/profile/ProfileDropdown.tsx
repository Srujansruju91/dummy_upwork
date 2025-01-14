import React, { useState } from 'react';
import { User, Settings, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { User as UserType } from '../../types/auth';

interface ProfileDropdownProps {
  user: UserType;
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
          <User className="w-5 h-5 text-green-600 dark:text-green-300" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>

            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </div>
            </Link>

            <Link
              to="/settings"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex items-center space-x-2">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}