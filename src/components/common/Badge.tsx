import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span className={`px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full ${className}`}>
      {children}
    </span>
  );
}