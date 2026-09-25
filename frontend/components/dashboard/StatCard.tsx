type StatCardProps = {
  title: string;
  value: string;
  trend: string;
  variant?: "cyan" | "emerald" | "slate" | "indigo";
};

export function StatCard({ title, value, trend, variant = "slate" }: StatCardProps) {
  const accentClasses = {
    cyan: "border-l-cyan-500",
    emerald: "border-l-emerald-500",
    slate: "border-l-slate-400",
    indigo: "border-l-indigo-500",
  };

  return (
    <div className={`rounded-2xl border border-slate-200/80 border-l-4 ${accentClasses[variant]} bg-white p-5 shadow-sm`}>
      <p className="text-xs font-semibold text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-black text-slate-900">{value}</p>
      <p className="mt-1 text-[11px] font-medium text-slate-400">{trend}</p>
    </div>
  );
}