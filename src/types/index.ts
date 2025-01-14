// Add these types to your existing types/index.ts file
export type ExperienceLevel = 'ENTRY' | 'INTERMEDIATE' | 'EXPERT';

export interface JobPostingData {
  title: string;
  description: string;
  budget: number;
  skills: string[];
  experience: ExperienceLevel;
}