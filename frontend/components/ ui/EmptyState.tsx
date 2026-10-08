import React from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 dark:border-slate-800 p-8 sm:p-12 text-center bg-slate-50/50 dark:bg-slate-900/40 transition-colors",
        className
      )}
    >
      {icon ? (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
          {icon}
        </div>
      ) : (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      )}

      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </h3>

      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      )}

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};