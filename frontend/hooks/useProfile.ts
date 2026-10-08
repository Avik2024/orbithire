"use client";

import { useState, useEffect, useCallback } from "react";
import { UserProfile } from "@/types/profile";
import { getMockUserProfile } from "@/lib/mock-api";

export interface UseProfileReturn {
  profile: UserProfile | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  updateProfile: (updatedFields: Partial<UserProfile>) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useProfile(userId: string = "user_01"): UseProfileReturn {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMockUserProfile(userId);
      setProfile(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load user profile."
      );
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(
    async (updatedFields: Partial<UserProfile>) => {
      setIsSaving(true);
      setError(null);

      try {
        // Simulate API network latency for saving updates
        await new Promise((resolve) => setTimeout(resolve, 300));

        setProfile((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            ...updatedFields,
          };
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to save profile changes."
        );
        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    []
  );

  return {
    profile,
    isLoading,
    isSaving,
    error,
    updateProfile,
    refetch: fetchProfile,
  };
}