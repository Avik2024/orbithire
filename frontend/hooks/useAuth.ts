"use client";

import { useState, useEffect, useCallback } from "react";
import { User, UserAuthSession } from "@/types/user";
import {
  getAuthSession,
  setAuthSession,
  clearAuthSession,
} from "@/lib/auth";

export interface UseAuthReturn {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  refreshSession: () => void;
}

export function useAuth(): UseAuthReturn {
  const [session, setSession] = useState<UserAuthSession>({
    user: null,
    token: undefined,
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize and read auth state on initial mount
  useEffect(() => {
    const currentSession = getAuthSession();
    setSession(currentSession);
    setIsLoading(false);
  }, []);

  const login = useCallback((user: User, token: string) => {
    setAuthSession(user, token);
    setSession({
      user,
      token,
      isAuthenticated: true,
    });
  }, []);

  const logout = useCallback(() => {
    clearAuthSession();
    setSession({
      user: null,
      token: undefined,
      isAuthenticated: false,
    });
  }, []);

  const refreshSession = useCallback(() => {
    const currentSession = getAuthSession();
    setSession(currentSession);
  }, []);

  return {
    user: session.user,
    token: session.token || null,
    isAuthenticated: session.isAuthenticated,
    isLoading,
    login,
    logout,
    refreshSession,
  };
}