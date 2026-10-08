import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "outline";
  size?: "sm" | "md";
  showDot?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  size = "md",
  showDot = false,
  onRemove,
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center font-medium rounded-full transition-colors select-none";

  const variantStyles = {
    default:
      "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
    primary:
      "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60",
    secondary:
      "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60",
    success:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60",
    warning:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60",
    danger:
      "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60",
    outline:
      "bg-transparent text-slate-700 border border-slate-300 dark:text-slate-300 dark:border-slate-700",
  };

  const dotVariantStyles = {
    default: "bg-slate-500",
    primary: "bg-indigo-500",
    secondary: "bg-purple-500",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-rose-500",
    outline: "bg-slate-400",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
  };

  return (
    <span
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {showDot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            dotVariantStyles[variant]
          )}
          aria-hidden="true"
        />
      )}

      <span>{children}</span>

      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="-mr-1 ml-0.5 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-current"
          aria-label="Remove tag"
        >
          <svg
            className="h-3 w-3 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
};