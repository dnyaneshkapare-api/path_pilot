"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { UserPlus, Compass, AlertCircle, ShieldCheck } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { refreshUser } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [educationLevel, setEducationLevel] = useState<"10th" | "12th" | "college" | "working" | "exploring">("12th");
  const [ageBand, setAgeBand] = useState<"under_14" | "14_17" | "18_24" | "25_plus">("18_24");
  const [hasParentalConsent, setHasParentalConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isMinor = ageBand === "under_14" || ageBand === "14_17";

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isMinor && !hasParentalConsent) {
      setError("Parental consent acknowledgment is required for students under 18 under DPDP rules.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          educationLevel,
          ageBand,
          hasParentalConsent
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Signup failed");
      } else {
        await refreshUser();
        router.push("/explore");
      }
    } catch {
      setError("Network or server error during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-500/20">
          <UserPlus className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Create Student Account
        </h1>
        <p className="text-xs text-slate-500">
          Minimal data collection. No exact birth date or family financial disclosure required.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Full Name or Preferred Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aarav Sharma"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Password (min 8 characters)
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Current Stage
              </label>
              <select
                value={educationLevel}
                onChange={(e: any) => setEducationLevel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none"
              >
                <option value="10th">After 10th</option>
                <option value="12th">After 12th</option>
                <option value="college">In College</option>
                <option value="working">Early Career</option>
                <option value="exploring">Exploring Paths</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Age Band
              </label>
              <select
                value={ageBand}
                onChange={(e: any) => setAgeBand(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none"
              >
                <option value="under_14">Under 14</option>
                <option value="14_17">14 - 17 Years</option>
                <option value="18_24">18 - 24 Years</option>
                <option value="25_plus">25+ Years</option>
              </select>
            </div>
          </div>

          {/* Parental consent flow for minors under DPDP rules */}
          {isMinor && (
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 space-y-2">
              <span className="font-bold block flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                Parental Consent Requirement (Under 18)
              </span>
              <label className="flex items-start gap-2 cursor-pointer text-[11px]">
                <input
                  type="checkbox"
                  checked={hasParentalConsent}
                  onChange={(e) => setHasParentalConsent(e.target.checked)}
                  className="mt-0.5 rounded text-indigo-600"
                />
                <span>
                  I confirm that my parent or legal guardian has reviewed and consented to my use of Path Copilot for career discovery.
                </span>
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account & Start Discovery"}
          </button>
        </form>
      </div>

      <div className="text-center text-xs text-slate-500">
        Already registered?{" "}
        <Link href="/login" className="text-indigo-600 hover:underline font-bold">
          Sign In
        </Link>
      </div>
    </div>
  );
}
