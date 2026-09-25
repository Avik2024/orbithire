import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="w-full space-y-1">
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
      <input
        className={cn(
          "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-cyan-600 focus:outline-none focus:ring-1 focus:ring-cyan-600",
          error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-[10px] font-medium text-rose-500">{error}</p>}
    </div>
  );
}