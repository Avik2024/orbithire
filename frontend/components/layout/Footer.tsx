import React from "react";
import Link from "next/link";

const FOOTER_NAV = {
  forCandidates: [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Salary Insights", href: "/salary-insights" },
    { label: "Saved Jobs", href: "/saved-jobs" },
    { label: "Applications", href: "/applications" },
  ],
  forEmployers: [
    { label: "Post a Job", href: "/post-job" },
    { label: "Employer Dashboard", href: "/employer/dashboard" },
    { label: "Search Applicants", href: "/employer/applicants" },
  ],
  resources: [
    { label: "Career Advice", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-black text-sm text-white shadow-sm">
                OH
              </div>
              <span>
                Orbit<span className="text-indigo-600 dark:text-indigo-400">Hire</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Connecting world-class engineering and product talent with modern tech teams globally.
            </p>
          </div>

          {/* Column 1: Candidates */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              For Candidates
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_NAV.forCandidates.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Employers */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              For Employers
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_NAV.forEmployers.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Resources
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_NAV.resources.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-100 pt-8 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} OrbitHire Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};