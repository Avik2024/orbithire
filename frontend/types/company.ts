export interface Company {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  location: string;
  industry: string;
  size: string;
  description: string;
  foundedYear?: number;
  openJobsCount?: number;
}