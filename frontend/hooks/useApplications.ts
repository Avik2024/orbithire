"use client";

import { useState } from "react";
import { MOCK_APPLICATIONS } from "@/data/applications";

export function useApplications() {
  const [applications] = useState(MOCK_APPLICATIONS);

  return { applications, loading: false };
}