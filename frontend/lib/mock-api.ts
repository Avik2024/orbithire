import { Job, JobFilterParams } from "@/types/job";
import { Company } from "@/types/company";
import { Application } from "@/types/application";
import { UserProfile } from "@/types/profile";
import { User } from "@/types/user";

// Default artificial network delay in milliseconds
const SIMULATED_DELAY = 400;

const delay = (ms: number = SIMULATED_DELAY) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * MOCK API SERVICE
 * Provides asynchronous data fetching functions mimicking server REST endpoints.
 */

// 1. JOBS API
export async function getMockJobs(params?: JobFilterParams): Promise<Job[]> {
  await delay();
  const { MOCK_JOBS } = await import("@/data/jobs");

  if (!params) return MOCK_JOBS;

  return MOCK_JOBS.filter((job) => {
    const matchesQuery = params.query
      ? job.title.toLowerCase().includes(params.query.toLowerCase()) ||
        job.company.toLowerCase().includes(params.query.toLowerCase()) ||
        job.skills.some((s) => s.toLowerCase().includes(params.query!.toLowerCase()))
      : true;

    const matchesLocation = params.location
      ? job.location.toLowerCase().includes(params.location.toLowerCase())
      : true;

    const matchesType =
      params.type && params.type !== "All" ? job.type === params.type : true;

    return matchesQuery && matchesLocation && matchesType;
  });
}

export async function getMockJobById(id: string): Promise<Job | null> {
  await delay(250);
  const { MOCK_JOBS } = await import("@/data/jobs");
  return MOCK_JOBS.find((job) => job.id === id) || null;
}

// 2. COMPANIES API
export async function getMockCompanies(): Promise<Company[]> {
  await delay();
  const { MOCK_COMPANIES } = await import("@/data/companies");
  return MOCK_COMPANIES;
}

export async function getMockCompanyById(id: string): Promise<Company | null> {
  await delay(250);
  const { MOCK_COMPANIES } = await import("@/data/companies");
  return MOCK_COMPANIES.find((comp) => comp.id === id) || null;
}

// 3. APPLICATIONS API
export async function getMockApplications(): Promise<Application[]> {
  await delay();
  const { MOCK_APPLICATIONS } = await import("@/data/applications");
  return MOCK_APPLICATIONS;
}

// 4. USER & PROFILE API
export async function getMockUserProfile(userId: string): Promise<UserProfile | null> {
  await delay(300);
  const { MOCK_PROFILE } = await import("@/data/users");
  return MOCK_PROFILE;
}

export async function getMockCurrentUser(): Promise<User> {
  await delay(200);
  const { MOCK_USER } = await import("@/data/users");
  return MOCK_USER;
}