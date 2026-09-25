export function ActivityFeed() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
      <ul className="mt-4 space-y-3 text-xs text-slate-600">
        <li>• Viewed <strong>Vertex Labs</strong> posting</li>
        <li>• Updated resume details</li>
        <li>• Received profile view from recruiter</li>
      </ul>
    </div>
  );
}