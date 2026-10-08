"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./../ ui/Button";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Find Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "Salary Guide", href: "/salaries" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
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

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Action Menu (Desktop) */}
        <div className="hidden md:flex md:items-center md:gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                href="/saved-jobs"
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === "/saved-jobs"
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                )}
              >
                Saved
              </Link>
              <Link
                href="/applications"
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === "/applications"
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                )}
              >
                Applications
              </Link>
              <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="font-medium">
                  {user?.name || "Profile"}
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => logout()}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pb-6 pt-2 dark:border-slate-800 dark:bg-slate-900 md:hidden">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-base font-medium",
                  pathname === link.href
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/saved-jobs"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Saved Jobs
                </Link>
                <Link
                  href="/applications"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  My Applications
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Profile ({user?.name})
                </Link>
                <Button
                  variant="outline"
                  size="md"
                  className="mt-2 w-full"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" size="md" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};