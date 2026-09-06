"use client";

import { useState } from "react";
import Link from "next/link";

const steps = ["Basics", "Experience", "Skills", "Preferences"];

const skillOptions = [
  "Go", "React", "TypeScript", "Python", "PostgreSQL", "Kubernetes",
  "Next.js", "GraphQL", "TailwindCSS", "AWS", "Docker", "Redis"
];

function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const paths: Record<string, React.ReactNode> = {
    arrow: <><path d="M5 12h14" {...common} /><path d="m13 6 6 6-6 6" {...common} /></>,
    back: <><path d="M19 12H5" {...common} /><path d="m12 19-7-7 7-7" {...common} /></>,
    check: <path d="m5 12 4 4L19 6" {...common} />,
    spark: <><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" {...common} /></>,
  };
  if (!paths[name]) return null;
  return <svg viewBox="0 0 24 24" aria-hidden className={className}>{paths[name]}</svg>;
}

export default function BuildProfilePage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    location: "",
    yearsExperience: "",
    currentCompany: "",
    summary: "",
    skills: [] as string[],
    seniority: "",
    remotePreference: "",
    salaryExpectation: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const isLastStep = stepIndex === steps.length - 1;

  const canProceed = (): boolean => {
    if (stepIndex === 0) return Boolean(formData.fullName.trim() && formData.title.trim());
    if (stepIndex === 1) return Boolean(formData.yearsExperience.trim());
    if (stepIndex === 2) return Boolean(formData.skills.length > 0);
    if (stepIndex === 3) return Boolean(formData.seniority && formData.remotePreference);
    return true;
  };

  const handleNext = () => {
    if (isLastStep) {
      setIsComplete(true);
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
        <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/20">
                O
              </span>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Orbit<span className="text-cyan-600">Hire</span>
              </span>
            </Link>
          </div>
        </header>

        <main className="mx-auto my-auto flex w-full max-w-xl flex-col items-center justify-center px-6 py-12 text-center">
          <div className="grid h-20 w-20 place-items-center rounded-3xl bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50 shadow-inner">
            <Icon name="check" className="h-10 w-10" />
          </div>
          <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Profile Created Successfully!
          </h1>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-md">
            We&apos;re currently parsing your preferences and matching <span className="font-semibold text-slate-900">{formData.fullName || "your account"}</span> against high-impact engineering roles.
          </p>

          <div className="mt-8 w-full rounded-2xl border border-slate-200/80 bg-white p-6 text-left shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 flex items-center gap-1.5">
                <Icon name="spark" className="h-4 w-4" /> Profile Summary
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
                Active & Matching
              </span>
            </div>

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between py-1">
                <dt className="text-slate-500 font-medium">Full Name</dt>
                <dd className="font-semibold text-slate-900">{formData.fullName || "—"}</dd>
              </div>
              <div className="flex justify-between py-1 border-t border-slate-100">
                <dt className="text-slate-500 font-medium">Target Role</dt>
                <dd className="font-semibold text-slate-900">{formData.title || "—"}</dd>
              </div>
              <div className="flex justify-between py-1 border-t border-slate-100">
                <dt className="text-slate-500 font-medium">Experience Level</dt>
                <dd className="font-semibold text-slate-900">{formData.yearsExperience ? `${formData.yearsExperience} Years` : "—"}</dd>
              </div>
              <div className="flex justify-between py-1 border-t border-slate-100">
                <dt className="text-slate-500 font-medium">Seniority & Work Type</dt>
                <dd className="font-semibold text-slate-900">{formData.seniority} • {formData.remotePreference}</dd>
              </div>
            </dl>

            {formData.skills.length > 0 && (
              <div className="mt-5 pt-4 border-t border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Selected Technical Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {formData.skills.map((skill) => (
                    <span key={skill} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-cyan-600/20 transition hover:bg-cyan-500 active:scale-95"
          >
            Explore Matched Positions <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      {/* HEADER */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/20">
              O
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Orbit<span className="text-cyan-600">Hire</span>
            </span>
          </Link>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 border border-slate-200">
            Step {stepIndex + 1} of {steps.length}
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl px-6 py-10 sm:py-14 my-auto">
        {/* PROGRESS STEPPER */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            {steps.map((label, i) => (
              <div key={label} className="flex flex-col items-center flex-1">
                <span className={`text-xs font-bold transition-colors ${i <= stepIndex ? "text-cyan-600" : "text-slate-400"}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            {steps.map((label, i) => (
              <div key={label} className="flex-1">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i <= stepIndex ? "bg-cyan-600" : "bg-slate-200"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CARD CONTAINER */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50">
          <div className="p-6 sm:p-10">
            <div className="mb-6 flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-cyan-600">
              <Icon name="spark" className="h-4 w-4" /> Candidate Profile Setup
            </div>

            {/* STEP 1: Basics */}
            {stepIndex === 0 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Basic Information</h2>
                  <p className="text-xs text-slate-500 mt-1">Let us know who you are and what role you specialize in.</p>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Full Name *</label>
                    <input
                      value={formData.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Target Job Title *</label>
                    <input
                      value={formData.title}
                      onChange={(e) => updateField("title", e.target.value)}
                      type="text"
                      placeholder="e.g. Senior Full Stack Engineer"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Current Location</label>
                    <input
                      value={formData.location}
                      onChange={(e) => updateField("location", e.target.value)}
                      type="text"
                      placeholder="e.g. San Francisco, CA or Remote"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Experience */}
            {stepIndex === 1 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Work Experience</h2>
                  <p className="text-xs text-slate-500 mt-1">Provide context on your engineering background.</p>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Years of Experience *</label>
                    <input
                      value={formData.yearsExperience}
                      onChange={(e) => updateField("yearsExperience", e.target.value)}
                      type="number"
                      min="0"
                      placeholder="e.g. 5"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Current or Most Recent Company</label>
                    <input
                      value={formData.currentCompany}
                      onChange={(e) => updateField("currentCompany", e.target.value)}
                      type="text"
                      placeholder="e.g. Stripe, Acme Corp, Freelance"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Professional Summary</label>
                    <textarea
                      value={formData.summary}
                      onChange={(e) => updateField("summary", e.target.value)}
                      rows={3}
                      placeholder="Briefly describe your expertise, primary architecture achievements, or project scope..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Skills */}
            {stepIndex === 2 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Technical Skills</h2>
                  <p className="text-xs text-slate-500 mt-1">Select key technologies you work with daily.</p>
                </div>

                <div className="pt-2">
                  <div className="flex flex-wrap gap-2.5">
                    {skillOptions.map((skill) => {
                      const isSelected = formData.skills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                            isSelected
                              ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20 ring-2 ring-cyan-600/20"
                              : "border border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                          }`}
                        >
                          {isSelected && <Icon name="check" className="h-3.5 w-3.5" />}
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                  {formData.skills.length === 0 && (
                    <p className="mt-3 text-xs font-semibold text-amber-600">Please select at least 1 skill to proceed.</p>
                  )}
                </div>
              </div>
            )}

            {/* STEP 4: Preferences */}
            {stepIndex === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Career Preferences</h2>
                  <p className="text-xs text-slate-500 mt-1">Specify your job criteria for matching.</p>
                </div>

                <div className="space-y-5 pt-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Target Seniority Level *</label>
                    <div className="flex flex-wrap gap-2">
                      {["Junior", "Mid-level", "Senior", "Staff+"].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => updateField("seniority", level)}
                          className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                            formData.seniority === level
                              ? "bg-slate-900 text-white shadow-sm"
                              : "border border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Remote Preference *</label>
                    <div className="flex flex-wrap gap-2">
                      {["Remote only", "Hybrid", "On-site", "Flexible"].map((pref) => (
                        <button
                          key={pref}
                          type="button"
                          onClick={() => updateField("remotePreference", pref)}
                          className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                            formData.remotePreference === pref
                              ? "bg-slate-900 text-white shadow-sm"
                              : "border border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {pref}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Target Annual Salary (Optional)</label>
                    <input
                      value={formData.salaryExpectation}
                      onChange={(e) => updateField("salaryExpectation", e.target.value)}
                      type="text"
                      placeholder="e.g. $120,000 - $150,000"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FORM NAVIGATION */}
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-6 py-5 sm:px-8">
            <button
              type="button"
              onClick={handleBack}
              disabled={Boolean(stepIndex === 0)}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-white disabled:invisible"
            >
              <Icon name="back" className="h-4 w-4" /> Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={Boolean(!canProceed())}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-cyan-600/20 transition hover:bg-cyan-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-cyan-600"
            >
              {isLastStep ? "Finish Setup" : "Continue"} <Icon name="arrow" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}