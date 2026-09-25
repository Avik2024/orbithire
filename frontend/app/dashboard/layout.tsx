// app/dashboard/layout.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    label: "My Applications",
    href: "/applications",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    label: "Saved Jobs",
    href: "/saved-jobs",
    icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
  },
  {
    label: "Profile",
    href: "/profile",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    label: "Salary Insights",
    href: "/salary-insights",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900 pb-16 lg:pb-0">
      {/* HEADER */}
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 sm:px-6 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-600 rounded-lg">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-600 font-bold text-white shadow-md shadow-cyan-600/20">
              O
            </span>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              Orbit<span className="text-cyan-600">Hire</span>
            </span>
          </Link>
          <span className="hidden h-4 w-px bg-slate-200 sm:inline-block" />
          <span className="hidden text-xs font-bold uppercase tracking-wider text-slate-400 sm:inline-block">
            Candidate Portal
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/build-profile"
            className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            Edit Profile
          </Link>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-cyan-600 text-xs font-bold text-white shadow-sm">
            AM
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* DESKTOP SIDEBAR NAVIGATION */}
        <aside className="hidden min-h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-slate-200/80 py-8 pr-8 lg:block">
          <nav aria-label="Sidebar navigation" className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all ${
                    active
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <svg
                    className={`h-4 w-4 ${active ? "text-cyan-400" : "text-slate-400"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 py-8 lg:pl-8">{children}</main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav aria-label="Mobile navigation" className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-lg lg:hidden">
        <div className="flex items-center justify-around p-2">
          {NAV_ITEMS.map((item) => {
            const active = isLinkActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1 rounded-lg p-2 text-[10px] font-bold ${
                  active ? "text-cyan-600" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}