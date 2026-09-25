import { MOCK_JOBS } from "@/data/jobs";

export async function getJobs() {
  await new Promise((res) => setTimeout(res, 400));
  return MOCK_JOBS;
}

export async function getJobById(id: string) {
  await new Promise((res) => setTimeout(res, 300));
  return MOCK_JOBS.find((j) => j.id === id) || null;
}