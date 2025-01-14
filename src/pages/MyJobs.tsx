import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JobList } from '../components/jobs/JobList';
import { TabButton } from '../components/common/TabButton';
import { useMyJobs } from '../hooks/useMyJobs';
import type { JobStatus } from '../types';

export function MyJobs() {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState<JobStatus>('OPEN');
  const { jobs, isLoading } = useMyJobs(activeStatus);

  const handlePostJob = () => {
    navigate('/post-job');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">My Jobs</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Manage and track your job postings</p>
        </div>
        <button
          onClick={handlePostJob}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Post a New Job
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="p-4 flex space-x-4">
            <TabButton
              active={activeStatus === 'OPEN'}
              onClick={() => setActiveStatus('OPEN')}
            >
              Open Jobs
            </TabButton>
            <TabButton
              active={activeStatus === 'IN_PROGRESS'}
              onClick={() => setActiveStatus('IN_PROGRESS')}
            >
              In Progress
            </TabButton>
            <TabButton
              active={activeStatus === 'COMPLETED'}
              onClick={() => setActiveStatus('COMPLETED')}
            >
              Completed
            </TabButton>
            <TabButton
              active={activeStatus === 'CANCELLED'}
              onClick={() => setActiveStatus('CANCELLED')}
            >
              Cancelled
            </TabButton>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
            </div>
          ) : jobs.length === 0 ? (
            <EmptyState status={activeStatus} onPostJob={handlePostJob} />
          ) : (
            <JobList jobs={jobs} variant="manage" />
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ status, onPostJob }: { status: JobStatus; onPostJob: () => void }) {
  const messages = {
    OPEN: "You don't have any open jobs",
    IN_PROGRESS: "You don't have any jobs in progress",
    COMPLETED: "You don't have any completed jobs",
    CANCELLED: "You don't have any cancelled jobs",
  };

  return (
    <div className="text-center py-12">
      <p className="text-gray-500 dark:text-gray-400 text-lg">{messages[status]}</p>
      {status === 'OPEN' && (
        <button
          onClick={onPostJob}
          className="mt-4 px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
        >
          Post your first job
        </button>
      )}
    </div>
  );
}