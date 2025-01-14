import React from 'react';
import { Star } from 'lucide-react';
import type { Freelancer } from '../types';

interface FreelancerCardProps {
  freelancer: Freelancer;
}

export function FreelancerCard({ freelancer }: FreelancerCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(freelancer.name)}&background=random`}
          alt={freelancer.name}
          className="w-16 h-16 rounded-full"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{freelancer.name}</h3>
          <p className="text-gray-600">{freelancer.title}</p>
          <div className="flex items-center mt-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-gray-600">{freelancer.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">${freelancer.hourlyRate}/hr</p>
          <p className="text-sm text-gray-600">Earned ${freelancer.totalEarned}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {freelancer.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}