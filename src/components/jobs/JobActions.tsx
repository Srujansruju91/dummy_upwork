import React from 'react';
import { MoreVertical, Edit2, XCircle, CheckCircle } from 'lucide-react';
import type { Job } from '../../types';

interface JobActionsProps {
  job: Job;
}

export function JobActions({ job }: JobActionsProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleAction = (action: string) => {
    console.log(`Performing ${action} on job ${job.id}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <MoreVertical className="h-5 w-5 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            <button
              onClick={() => handleAction('edit')}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Job
            </button>
            {job.status === 'OPEN' && (
              <button
                onClick={() => handleAction('close')}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Close Job
              </button>
            )}
            {job.status === 'IN_PROGRESS' && (
              <button
                onClick={() => handleAction('complete')}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Complete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}