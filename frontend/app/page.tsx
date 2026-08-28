"use client";

import { useMemo, useState } from "react";

type Job = {
  id: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: string;
  level: string;
  salary: string;
  posted: string;
  tags: string[];
  featured?: boolean;
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Senior Backend Engineer",
    company: "Vertex Labs",
    logo: "VL",
    location: "London, UK · Hybrid",
    type: "Full-time",
    level: "Senior",
    salary: "£95k–£125k",
    posted: "2h ago",
    tags: ["Go", "Kubernetes", "AWS"],
    featured: true,
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Northstar",
    logo: "N",
    location: "Remote · Europe",
    type: "Full-time",
    level: "Mid-level",
    salary: "€70k–€90k",
    posted: "5h ago",
    tags: ["Figma", "Design Systems", "Research"],
    featured: true,
  },
  {
    id: 3,
    title: "Machine Learning Engineer",
    company: "Axiom AI",
    logo: "AI",
    location: "Berlin, Germany · Hybrid",
    type: "Full-time",
    level: "Senior",
    salary: "€100k–€135k",
    posted: "7h ago",
    tags: ["Python", "PyTorch", "MLOps"],
  },
  {
    id: 4,
    title: "Frontend Engineer",
    company: "Pulse Commerce",
    logo: "PC",
    location: "Amsterdam, Netherlands · Remote",
    type: "Full-time",
    level: "Mid-level",
    salary: "€65k–€85k",
    posted: "1d ago",
    tags: ["React", "TypeScript", "Next.js"],
  },
  {
    id: 5,
    title: "Cloud Security Engineer",
    company: "Sentinel One",
    logo: "S1",
    location: "Zurich, Switzerland · Hybrid",
    type: "Full-time",
    level: "Senior",
    salary: "CHF 120k–150k",
    posted: "1d ago",
    tags: ["GCP", "Terraform", "Zero Trust"],
  },
  {
    id: 6,
    title: "Technical Product Manager",
    company: "BrightPay",
    logo: "BP",
    location: "Dublin, Ireland · Hybrid",
    type: "Full-time",
    level: "Mid-level",
    salary: "€75k–€95k",
    posted: "2d ago",
    tags: ["B2B SaaS", "API", "Roadmaps"],
  },
];

const companies = ["Vertex Labs", "Axiom AI", "Pulse", "Northstar", "BrightPay", "Sentinel"];

function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="7" {...common} /><path d="m20 20-4-4" {...common} /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" {...common} /><circle cx="12" cy="10" r="2.5" {...common} /></>,
    briefcase: <><rect x="3" y="6" width="18" height="13" rx="2" {...common} /><path d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6M3 11h18M10 11v3h4v-3" {...common} /></>,
    spark: <><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" {...common} /><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" {...common} /></>,
    arrow: <><path d="M5 12h14" {...common} /><path d="m13 6 6 6-6 6" {...common} /></>,
    chevron: <path d="m7 10 5 5 5-5" {...common} />,
    heart: <path d="M20.8 8.6c0 5.6-8.8 10.1-8.8 10.1S3.2 14.2 3.2 8.6a4.6 4.6 0 0 1 8.8-1.8 4.6 4.6 0 0 1 8.8 1.8Z" {...common} />,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" {...common} /><path d="M10 21h4" {...common} /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" {...common} /></>,
    check: <path d="m5 12 4 4L19 6" {...common} />,
    filter: <><path d="M4 6h16M7 12h10M10 18h4" {...common} /></>,
    user: <><circle cx="12" cy="8" r="4" {...common} /><path d="M4 21c.7-4 3.3-6 8-6s7.3 2 8 6" {...common} /></>,
  };

  return <svg viewBox="0 0 24 24" aria-hidden className={className}>{paths[name]}</svg>;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [saved, setSaved] = useState<number[]>([]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredJobs = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    const normalizedLocation = location.toLowerCase().trim();

    return jobs.filter((job) => {
      const queryMatch = !normalizedQuery || [job.title, job.company, job.location, ...job.tags]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
      const locationMatch = !normalizedLocation || job.location.toLowerCase().includes(normalizedLocation);
      const remoteMatch = !remoteOnly || job.location.toLowerCase().includes("remote");
      const filterMatch = activeFilter === "All" || job.type === activeFilter || job.level === activeFilter;
      return queryMatch && locationMatch && remoteMatch && filterMatch;
    });
  }, [query, location, remoteOnly, activeFilter]);

  const toggleSaved = (id: number) => {
    setSaved((current) => current.includes(id) ? current.filter((jobId) => jobId !== id) : [...current, id]);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center gap-6 px-5 lg:px-8">
          <a href="#" className="flex shrink-0 items-center gap-2.5" aria-label="Optihire home">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-white shadow-lg shadow-slate-950/10">
              <span className="text-xl font-black tracking-[-0.08em]">O<span className="text-cyan-400">.</span></span>
            </span>
            <span className="text-xl font-extrabold tracking-tight">optihire</span>
          </a>

          <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
            {['Find Jobs', 'Companies', 'Career Hub', 'Salary Insights'].map((item, index) => (
              <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} className={`rounded-lg px-3 py-2 transition ${index === 0 ? 'bg-slate-100 text-slate-950' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`}>{item}</a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 sm:block">Sign in</button>
            <button className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800">Post a job</button>
            <button className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-700 md:hidden" aria-label="Open menu"><Icon name="menu" /></button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.10),transparent_30%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-18 pt-14 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:pb-24 lg:pt-20">
            <div className="max-w-3xl self-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3.5 py-2 text-xs font-bold text-cyan-800">
                <span className="h-2 w-2 rounded-full bg-cyan-500" /> 18,492 new roles this week
              </div>
              <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Find work that <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 bg-clip-text text-transparent">fits your ambition.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                Optihire connects exceptional people with high-impact teams. Search smarter, match faster, and build a career you actually want.
              </p>

              <div className="mt-9 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_70px_-30px_rgba(15,23,42,.28)] sm:p-2.5">
                <div className="flex flex-col gap-2 lg:flex-row">
                  <label className="flex min-h-13 flex-1 items-center gap-3 rounded-xl bg-slate-50 px-4 focus-within:ring-2 focus-within:ring-cyan-400/30">
                    <Icon name="search" className="h-5 w-5 shrink-0 text-slate-400" />
                    <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400" placeholder="Job title, skills, company" />
                  </label>
                  <label className="flex min-h-13 flex-1 items-center gap-3 rounded-xl bg-slate-50 px-4 focus-within:ring-2 focus-within:ring-cyan-400/30">
                    <Icon name="pin" className="h-5 w-5 shrink-0 text-slate-400" />
                    <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400" placeholder="City, country or remote" />
                  </label>
                  <button className="min-h-13 rounded-xl bg-slate-950 px-7 text-sm font-bold text-white transition hover:bg-slate-800">Search jobs</button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
                <span>Popular:</span>
                {['Software Engineer', 'Product Manager', 'Data Scientist', 'Remote'].map((item) => (
                  <button key={item} onClick={() => item === 'Remote' ? setRemoteOnly(true) : setQuery(item)} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-600 transition hover:border-slate-300 hover:text-slate-950">{item}</button>
                ))}
              </div>
            </div>

            <div className="relative hidden min-h-[440px] lg:block">
              <div className="absolute right-3 top-6 w-[92%] rotate-[4deg] rounded-[28px] border border-slate-200 bg-slate-950 p-4 shadow-2xl">
                <div className="rounded-[20px] bg-slate-900 p-5 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-flex rounded-full bg-cyan-400/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">AI match</span>
                      <p className="mt-4 text-2xl font-black">98% fit</p>
                      <p className="mt-1 text-sm text-slate-400">Senior Backend Engineer</p>
                    </div>
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-sm font-black">VL</span>
                  </div>
                  <div className="mt-7 h-2 rounded-full bg-white/10"><div className="h-full w-[98%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" /></div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {['Go', 'System design', 'Cloud', 'Leadership'].map((skill) => <div key={skill} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300"><span className="mr-1.5 text-emerald-300">✓</span>{skill}</div>)}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-5 left-0 w-64 -rotate-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_25px_80px_-25px_rgba(15,23,42,.35)]">
                <div className="flex items-center justify-between"><span className="text-xs font-bold text-slate-400">YOUR WEEK</span><span className="text-xs font-black text-emerald-600">+24%</span></div>
                <div className="mt-6 flex h-28 items-end gap-2">
                  {[38, 54, 46, 72, 63, 92, 78].map((h, i) => <div key={i} className="flex-1 rounded-t-lg bg-slate-100" style={{ height: `${h}%` }}><div className="h-full w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-cyan-400 opacity-90" /></div>)}
                </div>
                <div className="mt-3 flex justify-between text-[10px] font-semibold text-slate-400"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-slate-50/80">
          <div className="mx-auto max-w-7xl px-5 py-7 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Trusted by teams at</p>
              <div className="flex flex-wrap items-center gap-x-9 gap-y-4 text-sm font-extrabold tracking-tight text-slate-500">
                {companies.map((company) => <span key={company}>{company}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section id="find-jobs" className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-cyan-600"><span className="h-1.5 w-5 rounded-full bg-cyan-500" /> CURATED FOR YOU</div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Opportunities worth your time</h2>
              <p className="mt-3 max-w-2xl text-slate-600">High-signal roles from product-led companies, growth-stage startups, and global technology teams.</p>
            </div>
            <a href="#all-jobs" className="inline-flex items-center gap-2 text-sm font-bold text-slate-950">View all jobs <Icon name="arrow" className="h-4 w-4" /></a>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {['All', 'Full-time', 'Senior', 'Mid-level'].map((filter) => (
              <button key={filter} onClick={() => setActiveFilter(filter)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${activeFilter === filter ? 'bg-slate-950 text-white' : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-950'}`}>{filter}</button>
            ))}
            <button onClick={() => setRemoteOnly((value) => !value)} className={`ml-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition ${remoteOnly ? 'border-cyan-300 bg-cyan-50 text-cyan-800' : 'border-slate-200 bg-white text-slate-600'}`}><span className={`h-2 w-2 rounded-full ${remoteOnly ? 'bg-cyan-500' : 'bg-slate-300'}`} /> Remote only</button>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-2">
            {filteredJobs.map((job) => (
              <article key={job.id} className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5">
                {job.featured && <span className="absolute right-5 top-5 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-amber-700">Featured</span>}
                <div className="flex gap-4">
                  <div className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-sm">{job.logo}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3 pr-16">
                      <div>
                        <h3 className="text-lg font-extrabold tracking-tight text-slate-950">{job.title}</h3>
                        <p className="mt-1 text-sm font-semibold text-slate-500">{job.company}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
                      <span className="inline-flex items-center gap-1.5"><Icon name="pin" className="h-3.5 w-3.5" />{job.location}</span>
                      <span className="inline-flex items-center gap-1.5"><Icon name="briefcase" className="h-3.5 w-3.5" />{job.type}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.tags.map((tag) => <span key={tag} className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-bold text-slate-600">{tag}</span>)}
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <div><p className="text-sm font-extrabold text-slate-950">{job.salary}</p><p className="mt-0.5 text-xs font-medium text-slate-400">Posted {job.posted}</p></div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => toggleSaved(job.id)} aria-label={saved.includes(job.id) ? 'Remove saved job' : 'Save job'} className={`grid h-10 w-10 place-items-center rounded-xl border transition ${saved.includes(job.id) ? 'border-cyan-200 bg-cyan-50 text-cyan-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}><Icon name="heart" className="h-4.5 w-4.5" /></button>
                        <button className="rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition group-hover:bg-blue-600">View role</button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400"><Icon name="search" /></div>
              <h3 className="mt-4 text-lg font-extrabold">No matching jobs</h3>
              <p className="mt-2 text-sm text-slate-500">Try a broader skill, company, or location.</p>
            </div>
          )}
        </section>

        <section id="career-hub" className="border-y border-slate-200 bg-slate-950 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-2 text-sm font-bold text-cyan-300"><Icon name="spark" className="h-4 w-4" /> OPTIHIRE INTELLIGENCE</div>
              <h2 className="text-3xl font-black tracking-tight sm:text-5xl">Your next role should match more than your keywords.</h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">Build a profile once. Optihire scores your experience, skills, seniority, preferences, and goals against live roles to surface the opportunities with the strongest potential.</p>
              <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
                {[['98%', 'match confidence'], ['4.7×', 'more relevant roles'], ['12 min', 'to build profile']].map(([value, label]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-2xl font-black">{value}</p><p className="mt-1 text-xs font-semibold text-slate-400">{label}</p></div>)}
              </div>
            </div>
            <button className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-50">Build my profile <Icon name="arrow" className="h-4 w-4" /></button>
          </div>
        </section>

        <section id="companies" className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-3xl bg-slate-100 p-7 sm:p-8">
              <span className="inline-flex rounded-xl bg-white p-3 text-slate-950 shadow-sm"><Icon name="briefcase" /></span>
              <h3 className="mt-6 text-xl font-black">For candidates</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Discover roles aligned with your strengths, not just your current title. Track applications and save the teams you want to join.</p>
              <a href="#find-jobs" className="mt-7 inline-flex items-center gap-2 text-sm font-black">Explore jobs <Icon name="arrow" className="h-4 w-4" /></a>
            </div>
            <div className="rounded-3xl bg-blue-600 p-7 text-white sm:p-8">
              <span className="inline-flex rounded-xl bg-white/15 p-3"><Icon name="user" /></span>
              <h3 className="mt-6 text-xl font-black">For hiring teams</h3>
              <p className="mt-3 text-sm leading-6 text-blue-100">Meet qualified candidates faster with structured profiles, intent signals, and a focused pipeline your recruiters will actually use.</p>
              <button className="mt-7 inline-flex items-center gap-2 text-sm font-black">Explore employer tools <Icon name="arrow" className="h-4 w-4" /></button>
            </div>
            <div className="rounded-3xl bg-slate-950 p-7 text-white sm:p-8">
              <span className="inline-flex rounded-xl bg-white/10 p-3 text-cyan-300"><Icon name="spark" /></span>
              <h3 className="mt-6 text-xl font-black">For your growth</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">Salary benchmarks, interview preparation, career guides, and skill signals that help you make better moves.</p>
              <button className="mt-7 inline-flex items-center gap-2 text-sm font-black">Open career hub <Icon name="arrow" className="h-4 w-4" /></button>
            </div>
          </div>
        </section>

        <section id="salary-insights" className="border-t border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
            <div>
              <div className="mb-4 text-sm font-bold text-blue-600">SALARY INSIGHTS</div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Know your market value.</h2>
              <p className="mt-4 max-w-xl text-slate-600">Compare compensation by role, seniority, location, and company type before you negotiate your next offer.</p>
              <button className="mt-7 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white">Explore salary data</button>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <div className="flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Senior Software Engineer · London</p><p className="mt-2 text-3xl font-black">£105,000</p></div><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">+8.2% YoY</span></div>
              <div className="mt-8 flex h-44 items-end gap-3">
                {[35, 48, 44, 63, 57, 76, 68, 88, 80, 95].map((h, i) => <div key={i} className="flex-1 rounded-t-xl bg-gradient-to-t from-blue-700 to-cyan-400" style={{ height: `${h}%` }} />)}
              </div>
              <div className="mt-3 flex justify-between text-[10px] font-semibold text-slate-400"><span>2024</span><span>2025</span><span>2026</span></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-9 md:flex-row md:items-center">
            <div><div className="text-xl font-extrabold">optihire<span className="text-cyan-400">.</span></div><p className="mt-2 text-sm text-slate-400">Better matches. Better careers.</p></div>
            <div className="flex flex-wrap gap-5 text-sm font-semibold text-slate-400"><a href="#find-jobs" className="hover:text-white">Jobs</a><a href="#companies" className="hover:text-white">Companies</a><a href="#career-hub" className="hover:text-white">Career Hub</a><a href="#salary-insights" className="hover:text-white">Salary</a><a href="#" className="hover:text-white">Privacy</a></div>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-6 text-xs text-slate-500 sm:flex-row"><p>© 2026 Optihire. All rights reserved.</p><p>Designed for people who want more from work.</p></div>
        </div>
      </footer>
    </div>
  );
}
