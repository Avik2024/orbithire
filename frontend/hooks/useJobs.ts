"use client";

import { useState, useEffect, useCallback } from "react";
import { Job, JobFilterParams } from "@/types/job";
import { getMockJobs, getMockJobById } from "@/lib/mock-api";

export interface UseJobsReturn {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  filters: JobFilterParams;
  setFilters: React.Dispatch<React.SetStateAction<JobFilterParams>>;
  refetch: () => Promise<void>;
  getJobById: (id: string) => Promise<Job | null>;
}

export function useJobs(initialFilters: JobFilterParams = {}): UseJobsReturn {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<JobFilterParams>(initialFilters);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMockJobs(filters);
      setJobs(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load job listings."
      );
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const getJobById = useCallback(async (id: string): Promise<Job | null> => {
    try {
      return await getMockJobById(id);
    } catch (err) {
      console.error(`Error fetching job with id ${id}:`, err);
      return null;
    }
  }, []);

  return {
    jobs,
    isLoading,
    error,
    filters,
    setFilters,
    refetch: fetchJobs,
    getJobById,
  };
}