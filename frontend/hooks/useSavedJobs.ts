"use client";

import { useState } from "react";

export function useSavedJobs() {
  const [savedIds, setSavedIds] = useState<string[]>(["job-1"]);

  const toggleSave = (jobId: string) => {
    setSavedIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  return { savedIds, toggleSave, isSaved: (id: string) => savedIds.includes(id) };
}