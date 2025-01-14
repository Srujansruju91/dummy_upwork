import React from 'react';
import { Badge } from '../common/Badge';
import { JobMeta } from './JobMeta';
import { JobActions } from './JobActions';
import type { Job } from '../../types';

interface JobCardProps {
  job: Job;
  variant?: 'default' | 'manage';
}

export function JobCard({ job, variant = 'default' }: JobCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{job.title}</h3>
          <JobMeta
            budget={job.budget}
            experience={job.experience}
            postedDate={job.postedDate}
          />
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{job.description}</p>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </div>
        {variant === 'manage' && (
          <div className="ml-6">
            <JobActions job={job} />
          </div>
        )}
      </div>
    </div>
  );
}