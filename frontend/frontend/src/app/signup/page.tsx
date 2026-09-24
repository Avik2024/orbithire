"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Role = "candidate" | "employer";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<Role>("candidate");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const passwordConfirmation = form.get("password_confirmation") as string;

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const firstError =
          data.errors && Object.values(data.errors)[0]
            ? (Object.values(data.errors)[0] as string[])[0]
            : data.message || "Something went wrong. Please try again.";
        setError(firstError);
        setLoading(false);
        return;
      }

      localStorage.setItem("orbithire_token", data.token);
      localStorage.setItem("orbithire_user", JSON.stringify(data.user));

      router.push(data.user.role === "employer" ? "/employer/dashboard" : "/jobs");
    } catch {
      setError("Could not connect to the server. Is the backend running?");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-white">
      <div className="grid min-h-screen lg:grid-cols-12">

        {/* Left Branding & Highlights Panel */}
        <section className="relative hidden overflow-hidden bg-slate-950 lg:col-span-7 lg:flex lg:flex-col lg:justify-between p-12 xl:p-16 border-r border-slate-800/60">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-indigo-600/15 blur-[140px] pointer-events-none" />

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 transition-transform duration-300 group-hover:scale-105">
                <span className="text-2xl font-black tracking-tighter">
                  O<span className="text-cyan-200">.</span>
                </span>
              </span>
              <span className="text-2xl font-black tracking-tight text-white">
                orbithire
              </span>
            </Link>
          </div>

          <div className="relative z-10 my-auto max-w-xl py-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              Join 18,000+ professionals already onboard
            </div>

            <h1 className="text-5xl font-extrabold leading-[1.08] tracking-tight text-white xl:text-6xl">
              Your career, <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">on your terms.</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              Create your free account to save roles, track applications, build your profile, and get matched with opportunities that actually fit.
            </p>

            <div className="mt-10 space-y-4">
              {[
                ["Build once, apply everywhere", "One profile powers every application."],
                ["Track every application", "Know exactly where you stand, always."],
                ["Get matched, not lost", "Signal-driven roles, not endless scrolling."],
              ].map(([title, desc]) => (
                <div key={title} className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cyan-500/15 text-cyan-300">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">{title}</p>
                    <p className="text-xs text-slate-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 text-xs text-slate-500">
            © 2026 Orbithire Inc. All rights reserved.
          </div>
        </section>

        {/* Right Sign Up Form Panel */}
        <section className="flex flex-col justify-between bg-[#0b0f19] px-6 py-10 lg:col-span-5 sm:px-12 xl:px-16">

          <div className="mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white">
                <span className="text-xl font-black tracking-tighter">
                  O<span className="text-cyan-200">.</span>
                </span>
              </span>
              <span className="text-xl font-black text-white">
                orbithire
              </span>
            </Link>
          </div>

          <div className="my-auto mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-xl sm:p-10">

              <header>
                <span className="text-xs font-extrabold tracking-widest text-cyan-400 uppercase">
                  Get Started
                </span>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-white">
                  Create your account
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  It takes less than a minute to get started.
                </p>
              </header>

              {/* Role Selector */}
              <div className="mt-7 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("candidate")}
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    role === "candidate"
                      ? "border-cyan-500 bg-cyan-500/10"
                      : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                  }`}
                >
                  <p className={`text-sm font-bold ${role === "candidate" ? "text-cyan-300" : "text-slate-200"}`}>
                    I&apos;m a candidate
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">Looking for work</p>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("employer")}
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    role === "employer"
                      ? "border-cyan-500 bg-cyan-500/10"
                      : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                  }`}
                >
                  <p className={`text-sm font-bold ${role === "employer" ? "text-cyan-300" : "text-slate-200"}`}>
                    I&apos;m hiring
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">Posting jobs</p>
                </button>
              </div>

              {error && (
                <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">

                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Avik Mukherjee"
                    className="h-12 w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 text-sm text-slate-100 placeholder-slate-500 outline-none transition duration-200 focus:border-cyan-500 focus:bg-slate-950 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="h-12 w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 text-sm text-slate-100 placeholder-slate-500 outline-none transition duration-200 focus:border-cyan-500 focus:bg-slate-950 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      placeholder="At least 8 characters"
                      className="h-12 w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 pr-20 text-sm text-slate-100 placeholder-slate-500 outline-none transition duration-200 focus:border-cyan-500 focus:bg-slate-950 focus:ring-2 focus:ring-cyan-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="password_confirmation" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Confirm password
                  </label>
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    placeholder="Re-enter your password"
                    className="h-12 w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 text-sm text-slate-100 placeholder-slate-500 outline-none transition duration-200 focus:border-cyan-500 focus:bg-slate-950 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="relative flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:opacity-95 hover:shadow-cyan-500/40 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    `Create ${role === "employer" ? "employer" : "candidate"} account`
                  )}
                </button>
              </form>

              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-800" />
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">OR</span>
                <div className="h-px flex-1 bg-slate-800" />
              </div>

              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 text-sm font-semibold text-slate-200 transition duration-200 hover:border-slate-700 hover:bg-slate-900"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Continue with Google
              </button>

              <p className="mt-8 text-center text-sm text-slate-400">
                Already have an account?{" "}
                <Link href="/signin" className="font-bold text-cyan-400 transition hover:text-cyan-300 hover:underline">
                  Sign in
                </Link>
              </p>

            </div>
          </div>

          <footer className="mt-8 flex justify-center gap-6 text-xs font-semibold text-slate-500">
            <Link href="/" className="transition hover:text-slate-300">Home</Link>
            <span>•</span>
            <a href="#" className="transition hover:text-slate-300">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="transition hover:text-slate-300">Terms of Service</a>
          </footer>

        </section>
      </div>
    </main>
  );
}
