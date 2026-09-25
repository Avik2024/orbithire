export type Profile = {
  userId: string;
  fullName: string;
  headline: string;
  location: string;
  bio: string;
  skills: string[];
  experienceYears: number;
  resumeUrl?: string;
  completeness: number;
};