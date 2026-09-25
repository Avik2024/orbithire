import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-cyan-600 text-white hover:bg-cyan-500 shadow-md shadow-cyan-600/20",
    secondary: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-4 py-2 text-xs font-bold rounded-xl",
    lg: "px-6 py-3 text-sm font-bold rounded-xl",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-bold transition-all focus:outline-none focus:ring-2 focus:ring-cyan-600 disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}