export interface SalaryRoleData {
  id: string;
  role: string;
  category: "Engineering" | "Design" | "Product" | "DevOps" | "Data";
  averageSalary: number;
  minSalary: number;
  maxSalary: number;
  percentiles: {
    p25: number;
    p50: number;
    p75: number;
    p90: number;
  };
  sampleSize: number;
  topSkills: string[];
}

export const MOCK_SALARY_DATA: SalaryRoleData[] = [
  {
    id: "sal-1",
    role: "Senior Backend Engineer",
    category: "Engineering",
    averageSalary: 145000,
    minSalary: 110000,
    maxSalary: 190000,
    percentiles: {
      p25: 125000,
      p50: 145000,
      p75: 165000,
      p90: 185000,
    },
    sampleSize: 1420,
    topSkills: ["Go", "Node.js", "PostgreSQL", "AWS", "Distributed Systems"],
  },
  {
    id: "sal-2",
    role: "Full Stack Next.js Engineer",
    category: "Engineering",
    averageSalary: 138000,
    minSalary: 100000,
    maxSalary: 180000,
    percentiles: {
      p25: 118000,
      p50: 138000,
      p75: 158000,
      p90: 175000,
    },
    sampleSize: 980,
    topSkills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL"],
  },
  {
    id: "sal-3",
    role: "Lead Product Designer",
    category: "Design",
    averageSalary: 135000,
    minSalary: 95000,
    maxSalary: 175000,
    percentiles: {
      p25: 115000,
      p50: 135000,
      p75: 155000,
      p90: 170000,
    },
    sampleSize: 640,
    topSkills: ["Figma", "Design Systems", "UX Research", "Prototyping"],
  },
  {
    id: "sal-4",
    role: "DevOps / Cloud Architect",
    category: "DevOps",
    averageSalary: 152000,
    minSalary: 115000,
    maxSalary: 205000,
    percentiles: {
      p25: 130000,
      p50: 152000,
      p75: 175000,
      p90: 198000,
    },
    sampleSize: 810,
    topSkills: ["Kubernetes", "Terraform", "AWS", "Docker", "CI/CD"],
  },
];