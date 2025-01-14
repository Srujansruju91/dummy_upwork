import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobPostingSchema } from '../../schemas/jobSchema';
import { FormField } from '../common/FormField';
import { SkillsInput } from '../common/SkillsInput';
import type { JobPostingData } from '../../types/job';

interface JobPostingFormProps {
  onSubmit: (data: JobPostingData) => Promise<void>;
  isLoading?: boolean;
}

export function JobPostingForm({ onSubmit, isLoading }: JobPostingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<JobPostingData>({
    resolver: zodResolver(jobPostingSchema)
  });

  const skills = watch('skills') || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField label="Job Title" error={errors.title?.message}>
        <input
          {...register('title')}
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-800"
          placeholder="e.g., Senior React Developer Needed"
        />
      </FormField>

      <FormField label="Description" error={errors.description?.message}>
        <textarea
          {...register('description')}
          rows={6}
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-800"
          placeholder="Describe the job requirements and responsibilities..."
        />
      </FormField>

      <FormField label="Budget (USD)" error={errors.budget?.message}>
        <input
          type="number"
          {...register('budget', { valueAsNumber: true })}
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-800"
          placeholder="Enter budget amount"
        />
      </FormField>

      <FormField label="Experience Level" error={errors.experience_level?.message}>
        <select
          {...register('experience_level')}
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-800"
        >
          <option value="ENTRY">Entry Level</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="EXPERT">Expert</option>
        </select>
      </FormField>

      <FormField label="Required Skills" error={errors.skills?.message}>
        <SkillsInput
          skills={skills}
          onChange={(newSkills) => setValue('skills', newSkills)}
        />
      </FormField>

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {isLoading ? 'Posting...' : 'Post Job'}
        </button>
      </div>
    </form>
  );
}