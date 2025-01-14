import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { talentSchema } from '../../schemas/talentSchema';
import { FormField } from '../common/FormField';
import { SkillsInput } from '../common/SkillsInput';
import type { TalentData } from '../../types/talent';

export function TalentForm({ onSubmit }: { onSubmit: (data: TalentData) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<TalentData>({
    resolver: zodResolver(talentSchema),
    defaultValues: {
      skills: [],
      availability: 'FULL_TIME'
    }
  });

  const skills = watch('skills');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="First Name"
          error={errors.firstName?.message}
        >
          <input
            {...register('firstName')}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
          />
        </FormField>

        <FormField
          label="Last Name"
          error={errors.lastName?.message}
        >
          <input
            {...register('lastName')}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
          />
        </FormField>
      </div>

      <FormField
        label="Professional Title"
        error={errors.title?.message}
      >
        <input
          {...register('title')}
          placeholder="e.g., Senior Full Stack Developer"
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
        />
      </FormField>

      <FormField
        label="Bio"
        error={errors.bio?.message}
      >
        <textarea
          {...register('bio')}
          rows={4}
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Hourly Rate (USD)"
          error={errors.hourlyRate?.message}
        >
          <input
            {...register('hourlyRate', { valueAsNumber: true })}
            type="number"
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
          />
        </FormField>

        <FormField
          label="Availability"
          error={errors.availability?.message}
        >
          <select
            {...register('availability')}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
          >
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="CONTRACT">Contract</option>
          </select>
        </FormField>
      </div>

      <FormField
        label="Skills"
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
          Add Talent
        </button>
      </div>
    </form>
  );
}