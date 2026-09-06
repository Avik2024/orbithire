"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";

interface IconProps {
  name: string;
  className?: string;
}

function Icon({ name, className = "h-5 w-5" }: IconProps) {
  const paths: Record<string, React.ReactNode> = {
    back: (
      <>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </>
    ),
    trending: (
      <>
        <path d="M23 6l-9.5 9.5-5-5L1 18" />
        <path d="M17 6h6v6" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6M3 11h18M10 11v3h4v-3" />
      </>
    ),
    layers: (
      <>
        <path d="m12 2 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 17 9 5 9-5" />
      </>
    ),
  };

  if (!paths[name]) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

// Dataset: Base salary indexed by role, adjusted by seniority + location multipliers
const roles = [
  "Software Engineer",
  "Backend Engineer",
  "Frontend Engineer",
  "Product Designer",
  "Machine Learning Engineer",
  "DevOps Engineer",
  "Product Manager",
  "Data Scientist",
] as const;

const baseSalaries: Record<string, number> = {
  "Software Engineer": 78000,
  "Backend Engineer": 82000,
  "Frontend Engineer": 76000,
  "Product Designer": 72000,
  "Machine Learning Engineer": 95000,
  "DevOps Engineer": 88000,
  "Product Manager": 90000,
  "Data Scientist": 92000,
};

const seniorityMultipliers: Record<string, number> = {
  Junior: 0.65,
  "Mid-level": 1.0,
  Senior: 1.42,
  "Staff+": 1.95,
};

const locations = [
  { name: "London, UK", currency: "£", multiplier: 1.0, yoy: 8.2 },
  { name: "Berlin, Germany", currency: "€", multiplier: 0.92, yoy: 5.1 },
  { name: "Amsterdam, Netherlands", currency: "€", multiplier: 0.98, yoy: 6.4 },
  { name: "Zurich, Switzerland", currency: "CHF ", multiplier: 1.55, yoy: 4.3 },
  { name: "San Francisco, US", currency: "$", multiplier: 1.68, yoy: 3.7 },
  { name: "Remote (Global)", currency: "$", multiplier: 1.1, yoy: 9.6 },
];

const quarterLabels = [
  "Q1'24",
  "Q2'24",
  "Q3'24",
  "Q4'24",
  "Q1'25",
  "Q2'25",
  "Q3'25",
  "Q4'25",
  "Q1'26",
  "Q2'26",
];

function generateTrend(seed: number) {
  const points = [];
  let value = 55 + (seed % 20);
  for (let i = 0; i < 10; i++) {
    value += ((seed + i * 7) % 13) - 4;
    value = Math.max(30, Math.min(98, value));
    points.push(value);
  }
  return points;
}

function formatCurrency(amount: number, currency: string) {
  return `${currency}${Math.round(amount).toLocaleString()}`;
}

export default function SalaryInsightsPage() {
  const roleSelectId = useId();
  const senioritySelectId = useId();
  const locationSelectId = useId();

  const [role, setRole] = useState<string>(roles[0]);
  const [seniority, setSeniority] = useState<string>("Senior");
  const [locationIndex, setLocationIndex] = useState<number>(0);

  const location = locations[locationIndex] || locations[0];

  const estimate = useMemo(() => {
    const base = baseSalaries[role] ?? 80000;
    const seniorityMult = seniorityMultipliers[seniority] ?? 1.0;
    const midpoint = base * seniorityMult * location.multiplier;
    const low = midpoint * 0.87;
    const high = midpoint * 1.18;
    return { low, midpoint, high };
  }, [role, seniority, location]);

  const seed = useMemo(
    () => role.length * 31 + seniority.length * 17 + locationIndex * 13,
    [role, seniority, locationIndex]
  );

  const trend = useMemo(() => generateTrend(seed), [seed]);

  const comparisons = useMemo(() => {
    const activeSeniorityMult = seniorityMultipliers[seniority] ?? 1.0;
    const filteredRoles = roles.filter((r) => r !== role).slice(0, 4);

    const data = filteredRoles.map((r) => {
      const val = baseSalaries[r] * activeSeniorityMult * location.multiplier;
      return { role: r, value: val };
    });

    const maxValue = Math.max(...data.map((d) => d.value), 1);
    return { data, maxValue };
  }, [role, seniority, location]);

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-950 font-sans antialiased">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-5 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="OrbitHire home">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-white">
              <span className="text-lg font-black tracking-[-0.08em]">
                O<span className="text-cyan-400">.</span>
              </span>
            </span>
            <span className="text-lg font-extrabold tracking-tight">orbithire</span>
          </Link>
          <Link
            href="/"
            className="ml-auto inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-slate-950"
          >
            <Icon name="back" className="h-4 w-4" /> Back to jobs
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
        <div className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
          <Icon name="trending" className="h-4 w-4" /> SALARY INSIGHTS
        </div>
        <h1 className="max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
          Know your market value.
        </h1>
        <p className="mt-4 max-w-xl text-slate-600">
          Filter by role, seniority, and location to see live compensation benchmarks pulled from thousands of listings.
        </p>

        {/* FILTERS */}
        <div className="mt-10 grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-3">
          <div>
            <label htmlFor={roleSelectId} className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Icon name="briefcase" className="h-3.5 w-3.5" /> Role
            </label>
            <select
              id={roleSelectId}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={senioritySelectId} className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Icon name="layers" className="h-3.5 w-3.5" /> Seniority
            </label>
            <select
              id={senioritySelectId}
              value={seniority}
              onChange={(e) => setSeniority(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            >
              {Object.keys(seniorityMultipliers).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={locationSelectId} className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Icon name="pin" className="h-3.5 w-3.5" /> Location
            </label>
            <select
              id={locationSelectId}
              value={locationIndex}
              onChange={(e) => setLocationIndex(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            >
              {locations.map((loc, i) => (
                <option key={loc.name} value={i}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* RESULTS */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Salary range card */}
          <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {seniority} {role} · {location.name}
            </p>
            <p className="mt-3 text-4xl font-black">
              {formatCurrency(estimate.midpoint, location.currency)}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-400">Estimated median annual salary</p>

            <div className="mt-6 flex items-center gap-2">
              <span className="rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs font-black text-emerald-300">
                +{location.yoy}% YoY
              </span>
              <span className="text-xs font-medium text-slate-500">vs. last year</span>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6 text-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Low (25th pct)</p>
                <p className="mt-1 text-lg font-black">{formatCurrency(estimate.low, location.currency)}</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-right">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">High (90th pct)</p>
                <p className="mt-1 text-lg font-black">{formatCurrency(estimate.high, location.currency)}</p>
              </div>
            </div>
          </div>

          {/* Trend chart */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">3-year trend</p>
                <p className="mt-1 text-lg font-black">Compensation trajectory</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">
                +{location.yoy}% YoY
              </span>
            </div>
            <div className="mt-8 flex h-44 items-end gap-2.5">
              {trend.map((h, i) => (
                <div
                  key={quarterLabels[i] ?? i}
                  className="flex-1 rounded-t-lg bg-gradient-to-t from-blue-700 to-cyan-400 transition-all duration-300"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="mt-3 flex justify-between text-[10px] font-semibold text-slate-400">
              {quarterLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            How {role} compares to similar roles
          </p>
          <p className="mt-1 text-lg font-black">Same seniority & location, different roles</p>

          <div className="mt-6 space-y-3">
            {comparisons.data.map(({ role: r, value }) => {
              const percentOfMax = Math.min(100, Math.max(10, (value / comparisons.maxValue) * 100));
              return (
                <div key={r} className="flex items-center gap-4">
                  <p className="w-48 shrink-0 text-sm font-semibold text-slate-600">{r}</p>
                  <div className="h-3 flex-1 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300"
                      style={{ width: `${percentOfMax}%` }}
                    />
                  </div>
                  <p className="w-28 shrink-0 text-right text-sm font-black text-slate-950">
                    {formatCurrency(value, location.currency)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="text-lg font-black">Want a personalized offer review?</h3>
            <p className="mt-1 text-sm text-slate-500">Build your profile so we can benchmark your specific offer.</p>
          </div>
          <Link
            href="/build-profile"
            className="shrink-0 rounded-xl bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-600"
          >
            Build my profile
          </Link>
        </div>
      </main>
    </div>
  );
}