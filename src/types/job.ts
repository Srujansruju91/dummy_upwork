export type ExperienceLevel = 'ENTRY' | 'INTERMEDIATE' | 'EXPERT';
export type JobStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface JobPostingData {
  title: string;
  description: string;
  budget: number;
  experience_level: ExperienceLevel;
  skills: string[];
}

export interface Job extends JobPostingData {
  id: string;
  status: JobStatus;
  client_id: string;
  freelancer_id: string | null;
  created_at: string;
  updated_at: string;
  client?: {
    first_name: string;
    last_name: string;
  };
}