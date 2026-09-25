type ApplicationProps = {
  company: string;
  title: string;
  appliedDate: string;
  status: "Interviewing" | "Under Review" | "Pending";
};

export function ApplicationCard({ company, title, appliedDate, status }: ApplicationProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
      <div>
        <h4 className="text-sm font-bold text-slate-900">{title}</h4>
        <p className="text-xs text-slate-500">{company} · Applied {appliedDate}</p>
      </div>
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
        {status}
      </span>
    </div>
  );
}