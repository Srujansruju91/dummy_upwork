import { useState, useEffect } from 'react';
import { Job, JobStatus } from '../types';
import { getMyJobs } from '../services/jobService';

export function useMyJobs(status: JobStatus) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setIsLoading(true);
        const fetchedJobs = await getMyJobs(status);
        setJobs(fetchedJobs);
        setError(null);
      } catch (err) {
        setError('Failed to fetch jobs');
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobs();
  }, [status]);

  return { jobs, isLoading, error };
}