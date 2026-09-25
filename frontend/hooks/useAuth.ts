"use client";

import { useState } from "react";
import { MOCK_USER } from "@/data/users";
import { User } from "@/types/user";

export function useAuth() {
  const [user] = useState<User | null>(MOCK_USER);
  const [loading] = useState<boolean>(false);

  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
}