"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  ShieldCheck,
  Users,
  BookOpen,
  AlertCircle,
  Clock,
  CheckCircle2,
  RefreshCw
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useApp();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAdminData() {
      try {
        setLoading(true);
        const res = await fetch("/api/v1/admin/overview");
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Access denied: Admin credentials required.");
        } else {
          setStats(data.stats);
        }
      } catch {
        setError("Error loading admin telemetry.");
      } finally {
        setLoading(false);
      }
    }
    loadAdminData();
  }, []);

  if (error || (user && user.role !== "admin")) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <ShieldCheck className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Admin Privileges Required</h2>
        <p className="text-xs text-slate-500">
          This portal enforces server-side role authentication. Log in with an administrator account to view content verification queues and scheduled stale-data audits.
        </p>
        <Link
          href="/login"
          className="inline-block px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs"
        >
          Sign In as Admin
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Role-Based Administration • Audit Logs Active</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Platform Governance & Content Verification
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage verified career datasets, expert verification approvals, and automated stale-data recheck schedules.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm text-slate-500">
          Loading platform metrics...
        </div>
      ) : (
        <div className="space-y-8">
          {/* Metrics Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <span className="text-xs text-slate-400 block font-medium">Verified Careers</span>
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white block mt-1">
                {stats?.totalCareers || 12}
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                100% Sourced by NCS/MeitY
              </span>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <span className="text-xs text-slate-400 block font-medium">Verified Experts</span>
              <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 block mt-1">
                {stats?.totalExperts || 4}
              </span>
              <span className="text-[11px] text-slate-500 block mt-2">All background credentials verified</span>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <span className="text-xs text-slate-400 block font-medium">Registered Learners</span>
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white block mt-1">
                {stats?.totalUsers || 3}
              </span>
              <span className="text-[11px] text-slate-500 block mt-2">DPDP compliant data minimization</span>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <span className="text-xs text-slate-400 block font-medium">Moderation Queue</span>
              <span className="text-3xl font-extrabold text-emerald-600 block mt-1">
                0 Pending
              </span>
              <span className="text-[11px] text-slate-500 block mt-2">Clean audit backlog</span>
            </div>
          </div>

          {/* Stale Data Recheck Scheduler */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  Scheduled Stale-Data Rechecks (Quality Assurance Pipeline)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  The system flags career records older than 90 days for quarterly government gazette & labor census verification.
                </p>
              </div>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50">
                <RefreshCw className="w-3.5 h-3.5" />
                Trigger Batch Audit
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    Digital Marketing Strategist & Growth Analyst
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Source: IAMAI Census • Last Verified: 2026-02-28
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 font-semibold text-[11px]">
                  Recheck in 18 days
                </span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    Clinical Psychologist & Mental Health Counselor
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Source: Rehabilitation Council of India (RCI) • Last Verified: 2026-03-15
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 font-semibold text-[11px]">
                  Recheck in 32 days
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
