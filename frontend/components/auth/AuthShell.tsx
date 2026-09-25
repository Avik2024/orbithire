import React from "react";

export function AuthShell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-slate-900">{title}</h2>
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}