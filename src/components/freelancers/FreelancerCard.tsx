import React from 'react';
import { Star } from 'lucide-react';
import { Badge } from '../common/Badge';
import { FreelancerInfo } from './FreelancerInfo';
import type { Freelancer } from '../../types';

interface FreelancerCardProps {
  freelancer: Freelancer;
}

export function FreelancerCard({ freelancer }: FreelancerCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(freelancer.name)}&background=random`}
          alt={freelancer.name}
          className="w-16 h-16 rounded-full"
        />
        <FreelancerInfo
          name={freelancer.name}
          title={freelancer.title}
          rating={freelancer.rating}
        />
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">${freelancer.hourlyRate}/hr</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Earned ${freelancer.totalEarned}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {freelancer.skills.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}