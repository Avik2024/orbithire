import { Job } from "@/hooks/useJobs";

export function MatchCard({ job, matchScore }: { job: Job; matchScore: number }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition hover:border-slate-200">
      <div>
        <h3 className="text-sm font-bold text-slate-900">{job.title}</h3>
        <p className="text-xs font-medium text-slate-500">{job.company} · {job.location}</p>
        <div className="mt-2 flex gap-1.5">
          {job.tags.map((tag) => (
            <span key={tag} className="rounded bg-white px-2 py-0.5 text-[10px] font-bold text-slate-600 border border-slate-200/60">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="text-right">
        <span className="inline-block rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-extrabold text-cyan-800">
          {matchScore}% Match
        </span>
        <p className="mt-1 text-xs font-semibold text-slate-700">{job.salary}</p>
      </div>
    </div>
  );
}