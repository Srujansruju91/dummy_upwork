import React from 'react';
import { useNavigate } from 'react-router-dom';
import { JobList } from '../components/jobs/JobList';
import { jobs } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export function FindWork() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect clients to find talent page
  React.useEffect(() => {
    if (user?.user_type === 'client') {
      navigate('/find-talent');
    }
  }, [user, navigate]);

  if (user?.user_type === 'client') return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Available Jobs</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Browse through the latest job opportunities that match your skills</p>
      </div>
      <JobList jobs={jobs} />
    </div>
  );
}