import React from 'react';

interface JobMetaProps {
  budget: string;
  experience: string;
  postedDate: string;
}

export function JobMeta({ budget, experience, postedDate }: JobMetaProps) {
  return (
    <div className="flex items-center text-sm text-gray-600 mb-4">
      <span className="font-medium">{budget}</span>
      <span className="mx-2">•</span>
      <span>{experience}</span>
      <span className="mx-2">•</span>
      <span>{postedDate}</span>
    </div>
  );
}