import React from 'react';
import { Star } from 'lucide-react';

interface FreelancerInfoProps {
  name: string;
  title: string;
  rating: number;
}

export function FreelancerInfo({ name, title, rating }: FreelancerInfoProps) {
  return (
    <div className="flex-1">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{name}</h3>
      <p className="text-gray-600 dark:text-gray-300">{title}</p>
      <div className="flex items-center mt-2">
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
        <span className="ml-1 text-gray-600 dark:text-gray-300">{rating.toFixed(1)}</span>
      </div>
    </div>
  );
}