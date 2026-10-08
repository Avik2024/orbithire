"use client";

import { useState, useEffect, useCallback } from "react";
import { Application, ApplicationStatus, ApplicationUpdatePayload } from "@/types/application";
import { getMockApplications } from "@/lib/mock-api";

export interface UseApplicationsReturn {
  applications: Application[];
  isLoading: boolean;
  error: string | null;
  statusFilter: ApplicationStatus | "All";
  setStatusFilter: (status: ApplicationStatus | "All") => void;
  filteredApplications: Application[];
  updateApplication: (id: string, payload: ApplicationUpdatePayload) => Promise<void>;
  addApplication: (newApp: Omit<Application, "id" | "appliedDate" | "status">) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useApplications(): UseApplicationsReturn {
  const [applications, setApplications] = useState<Application[]>([]);
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "All">("All");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMockApplications();
      setApplications(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load job applications."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const filteredApplications = applications.filter((app) => {
    if (statusFilter === "All") return true;
    return app.status === statusFilter;
  });

  const updateApplication = useCallback(
    async (id: string, payload: ApplicationUpdatePayload) => {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, ...payload } : app
        )
      );
    },
    []
  );

  const addApplication = useCallback(
    async (newApp: Omit<Application, "id" | "appliedDate" | "status">) => {
      const application: Application = {
        ...newApp,
        id: `app-${Date.now()}`,
        appliedDate: new Date().toISOString(),
        status: "Submitted",
      };

      setApplications((prev) => [application, ...prev]);
    },
    []
  );

  return {
    applications,
    isLoading,
    error,
    statusFilter,
    setStatusFilter,
    filteredApplications,
    updateApplication,
    addApplication,
    refetch: fetchApplications,
  };
}