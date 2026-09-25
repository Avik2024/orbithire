"use client";

import { useState } from "react";

export function useProfile() {
  const [profile, setProfile] = useState({
    fullName: "Avik",
    headline: "Senior Full Stack Engineer",
    location: "London, UK",
    bio: "Passionate engineer building scalable applications.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js, Laravel"],
    completeness: 85,
  });

  return { profile, setProfile };
}