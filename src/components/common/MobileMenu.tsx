import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userType?: 'client' | 'freelancer';
}

export function MobileMenu({ isOpen, onClose, userType }: MobileMenuProps) {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-64 bg-white shadow-lg">
        <div className="p-4 flex justify-end">
          <button onClick={onClose} className="p-2">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <nav className="px-4 space-y-4">
          {userType === 'client' ? (
            <>
              <Link 
                to="/my-jobs" 
                onClick={onClose}
                className={`block py-2 ${
                  location.pathname === '/my-jobs' 
                    ? 'text-green-600' 
                    : 'text-gray-700'
                }`}
              >
                My Jobs
              </Link>
              <Link 
                to="/find-talent" 
                onClick={onClose}
                className={`block py-2 ${
                  location.pathname === '/find-talent' 
                    ? 'text-green-600' 
                    : 'text-gray-700'
                }`}
              >
                Find Talent
              </Link>
            </>
          ) : userType === 'freelancer' ? (
            <Link 
              to="/find-work" 
              onClick={onClose}
              className={`block py-2 ${
                location.pathname === '/find-work' 
                  ? 'text-green-600' 
                  : 'text-gray-700'
              }`}
            >
              Find Work
            </Link>
          ) : null}
        </nav>
      </div>
    </div>
  );
}