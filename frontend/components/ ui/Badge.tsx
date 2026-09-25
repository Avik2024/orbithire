import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "cyan" | "emerald" | "amber";
}) {
  const styles = {
    default: "bg-slate-100 text-slate-700 border-slate-200",
    cyan: "bg-cyan-50 text-cyan-700 border-cyan-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-tight",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}