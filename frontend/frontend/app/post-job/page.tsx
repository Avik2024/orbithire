"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PostJobPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    salary: "",
    description: "",
    requirements: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push("/");
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-950 font-sans antialiased">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5" aria-label="OrbitHire home">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-white shadow-lg shadow-slate-950/10">
              <span className="text-xl font-black tracking-[-0.08em]">O<span className="text-cyan-400">.</span></span>
            </span>
            <span className="text-xl font-extrabold tracking-tight">orbithire</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold text-slate-600 hover:text-slate-950 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="mx-auto max-w-3xl px-5 py-12 lg:px-8 lg:py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 sm:p-10">
          {submitted ? (
            <div className="py-16 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="mt-6 text-2xl font-black tracking-tight text-slate-950">Job Published Successfully!</h1>
              <p className="mt-2 text-sm text-slate-500">
                Your role is now active on OrbitHire. Redirecting you to the home page...
              </p>
            </div>
          ) : (
            <>
              <div className="border-b border-slate-100 pb-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-800">
                  Employers & Hiring Teams
                </span>
                <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Post a new position</h1>
                <p className="mt-2 text-sm text-slate-500">
                  Reach top engineering, design, and product talent worldwide.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Job Title <span className="text-cyan-600">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Senior Backend Engineer"
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm font-medium outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Company Name <span className="text-cyan-600">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Vertex Labs"
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm font-medium outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Location <span className="text-cyan-600">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Remote / London, UK"
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-sm font-medium outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Employment Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-sm font-medium outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Salary Range <span className="text-cyan-600">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="e.g. £95k–£125k or €80k–€100k"
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm font-medium outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Job Description <span className="text-cyan-600">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Overview of the position and core responsibilities..."
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm font-medium outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Key Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="List key requirements (one per line)..."
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm font-medium outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6">
                  <Link
                    href="/"
                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="rounded-xl bg-slate-950 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition hover:bg-blue-600"
                  >
                    Publish Listing
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}