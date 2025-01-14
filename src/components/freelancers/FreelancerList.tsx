import React from 'react';
import { FreelancerCard } from './FreelancerCard';
import type { Freelancer } from '../../types';

interface FreelancerListProps {
  freelancers: Freelancer[];
}

export function FreelancerList({ freelancers }: FreelancerListProps) {
  return (
    <div className="space-y-6">
      {freelancers.map((freelancer) => (
        <FreelancerCard key={freelancer.id} freelancer={freelancer} />
      ))}
    </div>
  );
}