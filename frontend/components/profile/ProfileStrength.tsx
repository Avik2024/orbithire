export function ProfileStrength({ score }: { score: number }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <h3 className="text-sm font-bold text-slate-900">Profile Completeness</h3>
      <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-cyan-500" style={{ width: `${score}%` }} />
      </div>
      <p className="mt-2 text-xs font-semibold text-slate-500">{score}% completed</p>
    </div>
  );
}