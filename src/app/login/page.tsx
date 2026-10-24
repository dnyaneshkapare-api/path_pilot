"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { LogIn, Compass, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { refreshUser } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        await refreshUser();
        router.push("/explore");
      }
    } catch {
      setError("Network or server error during sign-in.");
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (role: "student" | "admin" | "expert") => {
    if (role === "student") {
      setEmail("student@pathcopilot.org");
      setPassword("PathCopilot@2026");
    } else if (role === "expert") {
      setEmail("expert@pathcopilot.org");
      setPassword("PathCopilot@2026");
    } else {
      setEmail("admin@pathcopilot.org");
      setPassword("PathCopilot@2026");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-500/20">
          <Compass className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Sign In to Path Copilot
        </h1>
        <p className="text-xs text-slate-500">
          Save your RIASEC evaluations, roadmaps, and consultation notes.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* 1-Click Demo Profiles */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 block text-center">
            One-Click Demo Credentials:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleFillDemo("student")}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300 text-center"
            >
              Demo Student
            </button>
            <button
              onClick={() => handleFillDemo("expert")}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300 text-center"
            >
              Demo Expert
            </button>
            <button
              onClick={() => handleFillDemo("admin")}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300 text-center"
            >
              Demo Admin
            </button>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-indigo-600 hover:underline font-bold">
          Create an account
        </Link>
      </div>
    </div>
  );
}
