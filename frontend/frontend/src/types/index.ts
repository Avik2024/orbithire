export type UserRole = 'candidate' | 'employer';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  created_at?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface JobPosting {
  id: number;
  title: string;
  description: string;
  skills_required: string[] | null;
  location: string | null;
  job_type: 'full_time' | 'part_time' | 'contract' | 'internship';
  salary_min: string | null;
  salary_max: string | null;
  status: 'active' | 'closed' | 'draft';
  employer: {
    id: number;
    name: string;
  };
  created_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
  };
}

export interface Application {
  id: number;
  status: 'applied' | 'shortlisted' | 'rejected' | 'hired';
  cover_letter: string | null;
  job?: {
    id: number;
    title: string;
    location: string | null;
  };
  candidate?: {
    id: number;
    name: string;
    email: string;
  };
  applied_at: string;
}

export interface CandidateProfile {
  id: number;
  headline: string | null;
  skills: string[] | null;
  experience: string | null;
  resume_url: string | null;
  location: string | null;
  updated_at: string;
}

export interface EmployerProfile {
  id: number;
  company_name: string;
  company_logo: string | null;
  website: string | null;
  description: string | null;
  updated_at: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
