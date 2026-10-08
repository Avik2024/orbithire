"use client";

import React from "react";
import Link from "next/link";
import { Job } from "@/types/job";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  className?: string;
}

export const JobCard: React.FC<JobCardProps> = ({ job, className }) => {
  const { isSaved, saveJob, removeJob } = useSavedJobs();
  const saved = isSaved(job.id);

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (saved) {
      removeJob(job.id);
    } else {
      saveJob(job);
    }
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-900/60",
        className
      )}
    >
      <div>
        {/* Header Section: Company Icon, Title & Save Button */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={`${job.company} logo`}
                className="h-12 w-12 rounded-lg border border-slate-100 object-cover dark:border-slate-800"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                <span className="text-base font-bold">
                  {job.company.substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}

            <div>
              <Link href={`/jobs/${job.id}`}>
                <h3 className="text-base font-semibold text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-slate-100 dark:group-hover:text-indigo-400">
                  {job.title}
                </h3>
              </Link>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {job.company}
              </p>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={handleBookmarkToggle}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            aria-label={saved ? "Remove from saved jobs" : "Save job"}
          >
            <svg
              className="h-5 w-5"
              fill={saved ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          </button>
        </div>

        {/* Short Description */}
        {job.description && (
          <p className="mt-3 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
            {job.description}
          </p>
        )}

        {/* Badges / Tags */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {job.type && <Badge variant="secondary">{job.type}</Badge>}
          {job.location && <Badge variant="outline">{job.location}</Badge>}
          {job.experienceLevel && (
            <Badge variant="outline">{job.experienceLevel}</Badge>
          )}
        </div>
      </div>

      {/* Footer Section: Salary & Action */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800/80">
        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {job.salary ? job.salary : "Salary undisclosed"}
        </div>

        <Link href={`/jobs/${job.id}`}>
          <Button variant="ghost" size="sm" className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};