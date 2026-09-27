export type JobType = "Full-time" | "Part-time" | "Contract" | "Remote" | "Internship";

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: JobType;
  salary: string;
  description: string;
  requirements: string[];
  skills: string[];
  postedDate: string;
  featured?: boolean;
}

export interface JobFilterParams {
  query?: string;
  location?: string;
  type?: JobType | "All";
  minSalary?: number;
}