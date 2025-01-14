import React from 'react';
import { FreelancerList } from '../components/freelancers/FreelancerList';
import { freelancers } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function FindTalent() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect freelancers to find work page
  React.useEffect(() => {
    if (user?.user_type === 'freelancer') {
      navigate('/find-work');
    }
  }, [user, navigate]);

  if (user?.user_type === 'freelancer') return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Find Talent</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Browse through our talented freelancers and find the perfect match for your project
        </p>
      </div>
      <FreelancerList freelancers={freelancers} />
    </div>
  );
}