import { z } from 'zod';

export const jobPostingSchema = z.object({
  title: z.string()
    .min(10, 'Title must be at least 10 characters')
    .max(100, 'Title must not exceed 100 characters'),
  description: z.string()
    .min(50, 'Description must be at least 50 characters')
    .max(5000, 'Description must not exceed 5000 characters'),
  budget: z.number()
    .min(1, 'Budget must be greater than 0')
    .max(1000000, 'Budget must not exceed 1,000,000'),
  skills: z.array(z.string())
    .min(1, 'At least one skill is required')
    .max(10, 'Maximum 10 skills allowed'),
  experience: z.enum(['ENTRY', 'INTERMEDIATE', 'EXPERT'])
});