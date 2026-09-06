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
  "Senior Backend Engineer", "Lead React Developer", "Full Stack Engineer (Go/React)",
  "Staff Infrastructure Engineer", "DevOps Engineer (K8s/AWS)", "TypeScript Architect",
  "Machine Learning Engineer", "Database Performance Engineer", "Frontend Engineer",
  "Product Designer", "Engineering Manager", "Cloud Security Engineer", "Technical Product Manager"
];

const companies = [
  "Vertex Labs", "Axiom AI", "Pulse Commerce", "Northstar", "BrightPay", "Sentinel One",
  "Datadog", "Vercel", "Stripe", "Cloudflare", "Docker", "Grafana Labs"
];

const locations = [
  "London, UK · Hybrid", "Remote · Europe", "Berlin, Germany · Hybrid",
  "Amsterdam, Netherlands · Remote", "Zurich, Switzerland · Hybrid", "Dublin, Ireland · Hybrid",
  "Remote (US)", "Remote (Worldwide)", "San Francisco, CA", "New York, NY"
];

const types = ["Full-time", "Senior", "Mid-level", "Contract"];
const categories = ["Full-time", "Senior", "Mid-level"];
const tagPool = [
  "Go", "React", "TypeScript", "PostgreSQL", "Docker", "Kubernetes",
  "Next.js", "GraphQL", "TailwindCSS", "Python", "Redis", "AWS", "GCP", "Terraform"
];

/**
 * Generates `count` jobs, offsetting ids/index by `startIndex`
 * so newly-added jobs never collide with existing ones.
 */
function generateJobs(count: number, startIndex: number): Job[] {
  return Array.from({ length: count }, (_, offset) => {
    const i = startIndex + offset;
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
      featured: i < 6, // First 6 jobs overall are featured
      isRemote,
      tags: [
        tagPool[i % tagPool.length],
        tagPool[(i + 3) % tagPool.length],
        tagPool[(i + 5) % tagPool.length]
      ]
    };
  });
}

// In-memory job store (resets on server restart / redeploy).
// `let` so POST /api/jobs can mutate it by appending new jobs.
let GENERATED_JOBS: Job[] = generateJobs(124, 0);

// GET /api/jobs?filter=&remoteOnly=&search=&page=&limit=
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter") || "All";
  const remoteOnly = searchParams.get("remoteOnly") === "true";
  const search = searchParams.get("search")?.toLowerCase() || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

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

/**
 * POST /api/jobs
 * Appends newly generated jobs to the in-memory dataset.
 * Optional JSON body: { "count": number } — defaults to 100.
 */
export async function POST(request: Request) {
  let count = 100;

  try {
    const body = await request.json();
    if (body?.count && Number.isFinite(body.count) && body.count > 0) {
      count = Math.min(body.count, 1000);
    }
  } catch {
    // No/invalid JSON body — fall back to default
  }

  const startIndex = GENERATED_JOBS.length;
  const newJobs = generateJobs(count, startIndex);
  GENERATED_JOBS = [...GENERATED_JOBS, ...newJobs];

  return NextResponse.json(
    {
      message: `${newJobs.length} jobs added successfully.`,
      addedCount: newJobs.length,
      totalJobs: GENERATED_JOBS.length,
      jobs: newJobs
    },
    { status: 201 }
  );
}