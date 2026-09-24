"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Connect to Laravel Sanctum authentication backend
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-white">
      <div className="grid min-h-screen lg:grid-cols-12">
        
        {/* Left Branding & Highlights Panel */}
        <section className="relative hidden overflow-hidden bg-slate-950 lg:col-span-7 lg:flex lg:flex-col lg:justify-between p-12 xl:p-16 border-r border-slate-800/60">
          {/* Ambient Lighting FX */}
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-indigo-600/15 blur-[140px] pointer-events-none" />

          {/* Top Logo Header */}
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

          {/* Core Content */}
          <div className="relative z-10 my-auto max-w-xl py-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              AI-Powered Career Intelligence
            </div>

            <h1 className="text-5xl font-extrabold leading-[1.08] tracking-tight text-white xl:text-6xl">
              Orbit around your <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">next big move.</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              Sign in to manage active applications, track target positions, save high-match opportunities, and unlock tailored AI recommendations.
            </p>

            {/* Metrics Showcase */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
                <p className="text-3xl font-black text-white">18k+</p>
                <p className="mt-1 text-xs font-medium text-slate-400">Active Roles</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
                <p className="text-3xl font-black text-cyan-400">98%</p>
                <p className="mt-1 text-xs font-medium text-slate-400">Match Accuracy</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
                <p className="text-3xl font-black text-white">50+</p>
                <p className="mt-1 text-xs font-medium text-slate-400">Global Hubs</p>
              </div>
            </div>
          </div>

          {/* Footer Copyright */}
          <div className="relative z-10 text-xs text-slate-500">
            © 2026 Orbithire Inc. All rights reserved.
          </div>
        </section>

        {/* Right Authentication Form Panel */}
        <section className="flex flex-col justify-between bg-[#0b0f19] px-6 py-10 lg:col-span-5 sm:px-12 xl:px-16">
          
          {/* Mobile Branding Header */}
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

          {/* Main Card Container */}
          <div className="my-auto mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
              
              <header>
                <span className="text-xs font-extrabold tracking-widest text-cyan-400 uppercase">
                  Welcome Back
                </span>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-white">
                  Sign in to Orbithire
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Enter your credentials to access your dashboard.
                </p>
              </header>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300"
                  >
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

                {/* Password Input */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-xs font-bold uppercase tracking-wider text-slate-300"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs font-semibold text-cyan-400 transition hover:text-cyan-300 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••••••"
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

                {/* Remember Me Toggle */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-400 select-none">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-cyan-500/20 focus:ring-offset-0"
                    />
                    Remember login
                  </label>
                </div>

                {/* Submit Action */}
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
                      Authenticating...
                    </span>
                  ) : (
                    "Sign in to account"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-800" />
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                  OR
                </span>
                <div className="h-px flex-1 bg-slate-800" />
              </div>

              {/* Google OAuth Provider Button */}
              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 text-sm font-semibold text-slate-200 transition duration-200 hover:border-slate-700 hover:bg-slate-900"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Continue with Google
              </button>

              <p className="mt-8 text-center text-sm text-slate-400">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-cyan-400 transition hover:text-cyan-300 hover:underline"
                >
                  Create an account
                </Link>
              </p>

            </div>
          </div>

          {/* Footer Navigation */}
          <footer className="mt-8 flex justify-center gap-6 text-xs font-semibold text-slate-500">
            <Link href="/" className="transition hover:text-slate-300">
              Home
            </Link>
            <span>•</span>
            <a href="#" className="transition hover:text-slate-300">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="transition hover:text-slate-300">
              Terms of Service
            </a>
          </footer>

        </section>
      </div>
    </main>
  );
}