import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SkillsInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export function SkillsInput({ skills, onChange }: SkillsInputProps) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newSkill = input.trim();
      
      if (newSkill && !skills.includes(newSkill)) {
        onChange([...skills, newSkill]);
      }
      setInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {skills.map(skill => (
          <span
            key={skill}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="ml-2 focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a skill and press Enter"
        className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
      />
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Press Enter or comma to add a skill
      </p>
    </div>
  );
}