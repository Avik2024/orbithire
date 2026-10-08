"use client";

import { useState, useEffect, useCallback } from "react";

const SAVED_JOBS_KEY = "orbithire_saved_jobs";

export interface UseSavedJobsReturn {
  savedJobIds: string[];
  isSaved: (jobId: string) => boolean;
  toggleSaveJob: (jobId: string) => void;
  saveJob: (jobId: string) => void;
  removeSavedJob: (jobId: string) => void;
  clearAllSavedJobs: () => void;
}

export function useSavedJobs(): UseSavedJobsReturn {
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);

  // Load saved job IDs from localStorage on initial client mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(SAVED_JOBS_KEY);
      if (stored) {
        setSavedJobIds(JSON.parse(stored) as string[]);
      }
    } catch (error) {
      console.error("Failed to load saved jobs from localStorage:", error);
    }
  }, []);

  // Sync state changes to localStorage
  const persistSavedJobs = useCallback((updatedIds: string[]) => {
    setSavedJobIds(updatedIds);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updatedIds));
      } catch (error) {
        console.error("Failed to persist saved jobs to localStorage:", error);
      }
    }
  }, []);

  const isSaved = useCallback(
    (jobId: string): boolean => savedJobIds.includes(jobId),
    [savedJobIds]
  );

  const saveJob = useCallback(
    (jobId: string) => {
      if (!savedJobIds.includes(jobId)) {
        persistSavedJobs([...savedJobIds, jobId]);
      }
    },
    [savedJobIds, persistSavedJobs]
  );

  const removeSavedJob = useCallback(
    (jobId: string) => {
      persistSavedJobs(savedJobIds.filter((id) => id !== jobId));
    },
    [savedJobIds, persistSavedJobs]
  );

  const toggleSaveJob = useCallback(
    (jobId: string) => {
      if (savedJobIds.includes(jobId)) {
        removeSavedJob(jobId);
      } else {
        saveJob(jobId);
      }
    },
    [savedJobIds, saveJob, removeSavedJob]
  );

  const clearAllSavedJobs = useCallback(() => {
    persistSavedJobs([]);
  }, [persistSavedJobs]);

  return {
    savedJobIds,
    isSaved,
    toggleSaveJob,
    saveJob,
    removeSavedJob,
    clearAllSavedJobs,
  };
}