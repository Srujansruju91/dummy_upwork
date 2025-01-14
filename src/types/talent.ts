export type Availability = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT';

export interface TalentData {
  firstName: string;
  lastName: string;
  title: string;
  bio: string;
  hourlyRate: number;
  skills: string[];
  availability: Availability;
}