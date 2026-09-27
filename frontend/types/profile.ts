export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: string; // YYYY-MM
  endDate?: string;  // YYYY-MM or undefined if current
  current: boolean;
  description?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
}

export interface UserProfile {
  userId: string;
  headline?: string;
  bio?: string;
  location?: string;
  phone?: string;
  website?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  resumeUrl?: string;
  completionPercentage: number;
}