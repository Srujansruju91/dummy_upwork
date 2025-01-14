import React, { useState } from 'react';
import { JobList } from '../components/jobs/JobList';
import { FreelancerList } from '../components/freelancers/FreelancerList';
import { TabButton } from '../components/common/TabButton';
import { jobs, freelancers } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export function Home() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'jobs' | 'freelancers'>(
    user?.user_type === 'client' ? 'freelancers' : 'jobs'
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white">
          {user?.user_type === 'freelancer' && (
            <TabButton
              active={activeTab === 'jobs'}
              onClick={() => setActiveTab('jobs')}
            >
              Find Jobs
            </TabButton>
          )}
          {user?.user_type === 'client' && (
            <TabButton
              active={activeTab === 'freelancers'}
              onClick={() => setActiveTab('freelancers')}
            >
              Find Talent
            </TabButton>
          )}
        </div>
      </div>

      {activeTab === 'jobs' && user?.user_type === 'freelancer' && (
        <JobList jobs={jobs} />
      )}
      {activeTab === 'freelancers' && user?.user_type === 'client' && (
        <FreelancerList freelancers={freelancers} />
      )}
    </main>
  );
}