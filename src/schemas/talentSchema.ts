import { z } from 'zod';

export const talentSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  bio: z.string().min(100, 'Bio must be at least 100 characters'),
  hourlyRate: z.number()
    .min(1, 'Hourly rate must be greater than 0')
    .max(1000, 'Hourly rate must not exceed 1,000'),
  skills: z.array(z.string())
    .min(1, 'At least one skill is required')
    .max(10, 'Maximum 10 skills allowed'),
  availability: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT'])
});