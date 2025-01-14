import React from 'react';
import { JobCard } from './JobCard';
import type { Job } from '../../types';

interface JobListProps {
  jobs: Job[];
}

export function JobList({ jobs }: JobListProps) {
  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}