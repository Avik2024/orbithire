// app/dashboard/page.tsx
"use client";

import Link from "next/link";
import { StatCard } from "@/components/dashboard/StatCard";
import { MatchCard } from "@/components/dashboard/MatchCard";
import { ApplicationCard } from "@/components/dashboard/ApplicationCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { ProfileStrength } from "@/components/profile/ProfileStrength";
import { useJobs } from "@/hooks/useJobs";

// Example applications list (can be moved to a hook/state as needed)
const RECENT_APPLICATIONS = [
  {
    id: "app-1",
    company: "OrbitHire Core",
    title: "Senior Full Stack Engineer",
    appliedDate: "Mar 20, 2026",
    status: "Interviewing" as const,
  },
  {
    id: "app-2",
    company: "CloudScale Systems",
    title: "Infrastructure Lead",
    appliedDate: "Mar 18, 2026",
    status: "Under Review" as const,
  },
];

export default function DashboardPage() {
  const { jobs, loading, error } = useJobs();

  // Safely extract recommended jobs
  const matchedJobs = jobs?.slice(0, 2) ?? [];

  return (
    <div className="space-y-8">
      {/* WELCOME BANNER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back, Avik 👋
          </h1>
          <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
            Here is a summary of your job search progress and matching roles.
          </p>
        </div>
        <Link
          href="/jobs"
          className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-cyan-600/20 transition hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2"
        >
          Browse All Jobs
        </Link>
      </div>

      {/* STAT CARDS GRID */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Applications Sent" value="8" trend="+2 this week" variant="cyan" />
        <StatCard title="Interviews Scheduled" value="2" trend="Next: Tomorrow, 2 PM" variant="emerald" />
        <StatCard title="Saved Roles" value="12" trend="3 expiring soon" variant="slate" />
        <StatCard title="Profile Views" value="45" trend="+18% vs last month" variant="indigo" />
      </div>

      {/* TWO COLUMN GRID */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* MAIN / PRIMARY SECTION */}
        <div className="space-y-8 lg:col-span-2">
          {/* RECOMMENDED MATCHES */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Recommended for You</h2>
                <p className="text-xs text-slate-500">Based on your tech stack and preference settings</p>
              </div>
              <Link href="/jobs" className="text-xs font-bold text-cyan-600 hover:text-cyan-700">
                View all
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {loading ? (
                <div className="space-y-3">
                  <div className="h-28 animate-pulse rounded-xl bg-slate-100" />
                  <div className="h-28 animate-pulse rounded-xl bg-slate-100" />
                </div>
              ) : error ? (
                <p className="text-xs text-rose-500">Failed to load recommendations. Please try again later.</p>
              ) : matchedJobs.length > 0 ? (
                matchedJobs.map((job) => (
                  <MatchCard key={job.id} job={job} matchScore={94} />
                ))
              ) : (
                <p className="py-6 text-center text-xs text-slate-500">
                  No match recommendations available right now.
                </p>
              )}
            </div>
          </section>

          {/* ACTIVE APPLICATIONS */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900">Recent Applications</h2>
              <Link href="/applications" className="text-xs font-bold text-cyan-600 hover:text-cyan-700">
                View status
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {RECENT_APPLICATIONS.map((app) => (
                <ApplicationCard
                  key={app.id}
                  company={app.company}
                  title={app.title}
                  appliedDate={app.appliedDate}
                  status={app.status}
                />
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT SIDEBAR SECTION */}
        <aside className="space-y-8">
          <ProfileStrength score={85} />
          <ActivityFeed />
        </aside>
      </div>
    </div>
  );
}