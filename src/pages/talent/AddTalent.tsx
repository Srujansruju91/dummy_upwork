import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TalentForm } from '../../components/talent/TalentForm';
import type { TalentData } from '../../types/talent';

export function AddTalent() {
  const navigate = useNavigate();

  const handleSubmit = async (data: TalentData) => {
    try {
      // TODO: Implement talent addition logic
      console.log('Talent data:', data);
      navigate('/talents');
    } catch (error) {
      console.error('Failed to add talent:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Add New Talent</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Create a profile for a new talent</p>
      <TalentForm onSubmit={handleSubmit} />
    </div>
  );
}