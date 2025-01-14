import React from 'react';
import { Menu } from 'lucide-react';

interface MobileMenuButtonProps {
  onClick: () => void;
}

export function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className="md:hidden p-2"
    >
      <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
    </button>
  );
}