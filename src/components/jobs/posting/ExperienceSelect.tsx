import React from 'react';
import type { ExperienceLevel } from '../../../types';

interface ExperienceSelectProps {
  value: ExperienceLevel;
  onChange: (value: ExperienceLevel) => void;
}

export function ExperienceSelect({ value, onChange }: ExperienceSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as ExperienceLevel)}
      className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
    >
      <option value="ENTRY">Entry Level</option>
      <option value="INTERMEDIATE">Intermediate</option>
      <option value="EXPERT">Expert</option>
    </select>
  );
}