import { NextResponse } from "next/server";

export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: string;
  category: string;
  salary: string;
  posted: string;
  featured: boolean;
  isRemote: boolean;
  tags: string[];
}

// Tech stack generator data
const titles = [
  "Senior Go Backend Engineer", "Lead React Developer", "Full Stack Engineer (Go/React)",
  "Staff Infrastructure Engineer", "DevOps Engineer (K8s/AWS)", "TypeScript Architect",
  "Python ML Platform Engineer", "Database Performance Engineer", "Frontend Systems Engineer",
  "Product Designer", "Engineering Manager"
];

const companies = [
  "Datadog", "Vercel", "Stripe", "Cloudflare", "Docker", "Grafana Labs",
  "Supabase", "Postman", "Elastic", "Tailwind Labs", "Sentry", "Linear"
];

const locations = ["Remote (US)", "Remote (Worldwide)", "San Francisco, CA", "New York, NY", "London, UK", "Berlin, DE"];
const types = ["Full-time", "Senior", "Mid-level", "Contract"];
const categories = ["Full-time", "Senior", "Mid-level"];
const tagPool = ["Go", "React", "TypeScript", "PostgreSQL", "Docker", "Kubernetes", "Next.js", "GraphQL", "TailwindCSS", "Python", "Redis"];

// Generate 120+ jobs programmatically
const GENERATED_JOBS: Job[] = Array.from({ length: 124 }, (_, i) => {
  const id = `job-${i + 1}`;
  const title = titles[i % titles.length];
  const company = companies[i % companies.length];
  const isRemote = i % 2 === 0;
  const category = categories[i % categories.length];
  
  return {
    id,
    title,
    company,
    logo: company.substring(0, 2).toUpperCase(),
    location: isRemote ? "Remote" : locations[i % locations.length],
    type: types[i % types.length],
    category,
    salary: `$${120 + (i % 8) * 15}k - $${160 + (i % 8) * 20}k`,
    posted: `${(i % 5) + 1}d ago`,
    featured: i < 6, // First 6 jobs are featured
    isRemote,
    tags: [tagPool[i % tagPool.length], tagPool[(i + 3) % tagPool.length], tagPool[(i + 5) % tagPool.length]]
  };
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const filter = searchParams.get("filter") || "All";
  const remoteOnly = searchParams.get("remoteOnly") === "true";
  const search = searchParams.get("search")?.toLowerCase() || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  // Apply filtering
  let filtered = GENERATED_JOBS;

  if (filter !== "All") {
    filtered = filtered.filter((j) => j.category === filter || j.type === filter);
  }

  if (remoteOnly) {
    filtered = filtered.filter((j) => j.isRemote);
  }

  if (search) {
    filtered = filtered.filter(
      (j) =>
        j.title.toLowerCase().includes(search) ||
        j.company.toLowerCase().includes(search) ||
        j.tags.some((t) => t.toLowerCase().includes(search))
    );
  }

  // Calculate Pagination
  const totalJobs = filtered.length;
  const totalPages = Math.ceil(totalJobs / limit);
  const startIndex = (page - 1) * limit;
  const paginatedJobs = filtered.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    jobs: paginatedJobs,
    pagination: {
      totalJobs,
      totalPages,
      currentPage: page,
      hasMore: page < totalPages
    }
  });
}