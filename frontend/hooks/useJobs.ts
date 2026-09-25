import { useState, useEffect } from "react";

export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  tags: string[];
};

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulated asynchronous fetch
    const timer = setTimeout(() => {
      setJobs([
        {
          id: 1,
          title: "Senior Backend Engineer",
          company: "Vertex Labs",
          location: "London, UK · Hybrid",
          salary: "£95k–£125k",
          tags: ["Go", "Kubernetes", "AWS"],
        },
        {
          id: 2,
          title: "Product Designer",
          company: "Northstar",
          location: "Remote · Europe",
          salary: "€70k–€90k",
          tags: ["Figma", "Design Systems"],
        },
      ]);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return { jobs, loading, error };
}