import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  onChange?: (value: string) => void;
}

export function SearchInput({ placeholder = 'Search', onChange }: SearchInputProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-64 pl-10 pr-4 py-2 border rounded-full bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
    </div>
  );
}