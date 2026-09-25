export type Job = {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  salary: string;
  description: string;
  requirements: string[];
  skills: string[];
  postedDate: string;
  featured?: boolean;
};