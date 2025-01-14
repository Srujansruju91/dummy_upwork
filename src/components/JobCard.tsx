import React from 'react';
import type { Job } from '../types';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <span className="font-medium">{job.budget}</span>
        <span className="mx-2">•</span>
        <span>{job.experience}</span>
        <span className="mx-2">•</span>
        <span>{job.postedDate}</span>
      </div>
      <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>
      <div className="flex flex-wrap gap-2">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}