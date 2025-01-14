import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobPostingSchema } from '../../../schemas/jobSchema';
import { FormField } from './FormField';
import { SkillsInput } from './SkillsInput';
import { ExperienceSelect } from './ExperienceSelect';
import type { JobPostingData } from '../../../types';

export function JobPostingForm({ onSubmit }: { onSubmit: (data: JobPostingData) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<JobPostingData>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      skills: [],
      experience: 'ENTRY'
    }
  });

  const skills = watch('skills');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <FormField
        label="Job Title"
        error={errors.title?.message}
      >
        <input
          {...register('title')}
          placeholder="e.g., Senior React Developer"
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
        />
      </FormField>

      <FormField
        label="Description"
        error={errors.description?.message}
      >
        <textarea
          {...register('description')}
          rows={6}
          placeholder="Describe the job requirements, responsibilities, and qualifications..."
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Budget"
          error={errors.budget?.message}
        >
          <input
            {...register('budget', { valueAsNumber: true })}
            type="number"
            placeholder="Enter budget in USD"
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
          />
        </FormField>

        <FormField
          label="Experience Level"
          error={errors.experience?.message}
        >
          <ExperienceSelect
            value={watch('experience')}
            onChange={(value) => setValue('experience', value)}
          />
        </FormField>
      </div>

      <FormField
        label="Required Skills"
        error={errors.skills?.message}
      >
        <SkillsInput
          skills={skills}
          onChange={(newSkills) => setValue('skills', newSkills)}
        />
      </FormField>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-6 py-2 border rounded-md dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Post Job
        </button>
      </div>
    </form>
  );
}