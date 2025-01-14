import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JobPostingForm } from '../../components/jobs/JobPostingForm';
import { createJob } from '../../services/jobService';
import type { JobPostingData } from '../../types/job';

export function PostJob() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: JobPostingData) => {
    try {
      setIsLoading(true);
      await createJob(data);
      navigate('/my-jobs');
    } catch (error) {
      console.error('Failed to post job:', error);
      // TODO: Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Post a New Job
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Create a detailed job posting to find the perfect talent
      </p>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <JobPostingForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}