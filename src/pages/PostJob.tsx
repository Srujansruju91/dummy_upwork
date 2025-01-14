import React from 'react';
import { useNavigate } from 'react-router-dom';
import { JobPostingForm } from '../components/jobs/posting/JobPostingForm';
import type { JobPostingData } from '../types';

export function PostJob() {
  const navigate = useNavigate();

  const handleSubmit = async (data: JobPostingData) => {
    try {
      // TODO: Implement job posting logic
      console.log('Job posting data:', data);
      navigate('/my-jobs');
    } catch (error) {
      console.error('Failed to post job:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
      <p className="text-gray-600 mb-8">Create a detailed job posting to find the perfect talent</p>
      <JobPostingForm onSubmit={handleSubmit} />
    </div>
  );
}