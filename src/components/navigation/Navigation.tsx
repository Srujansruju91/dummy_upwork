import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { User } from '../../types/auth';

interface NavigationProps {
  user: User | null;
}

export function Navigation({ user }: NavigationProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const isClient = user?.user_type === 'client';

  if (!user) return null;

  return (
    <nav className="hidden md:ml-8 md:flex space-x-6">
      {isClient ? (
        <>
          <NavLink to="/my-jobs" current={location.pathname}>
            {t('common.myJobs')}
          </NavLink>
          <NavLink to="/find-talent" current={location.pathname}>
            Find Talent
          </NavLink>
        </>
      ) : (
        <NavLink to="/find-work" current={location.pathname}>
          {t('common.findWork')}
        </NavLink>
      )}
    </nav>
  );
}

interface NavLinkProps {
  to: string;
  current: string;
  children: React.ReactNode;
}

function NavLink({ to, current, children }: NavLinkProps) {
  return (
    <Link 
      to={to} 
      className={`${
        current === to
          ? 'text-green-600 dark:text-green-400' 
          : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
      }`}
    >
      {children}
    </Link>
  );
}