"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Career } from "@/types";
import {
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  Building2,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Scale
} from "lucide-react";

export default function ExploreCareersPage() {
  const { lang, savedCareerIds, toggleSaveCareer } = useApp();
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedCluster, setSelectedCluster] = useState("all");
  const [selectedDemand, setSelectedDemand] = useState("all");

  // Comparison selection (up to 2 careers)
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  useEffect(() => {
    async function fetchCareers() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (query) params.append("q", query);
        if (selectedCluster !== "all") params.append("cluster", selectedCluster);
        if (selectedDemand !== "all") params.append("demand", selectedDemand);

        const res = await fetch(`/api/v1/careers?${params.toString()}`);
        const data = await res.json();
        if (data.careers) {
          setCareers(data.careers);
        }
      } catch (err) {
        console.error("Error fetching careers", err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(fetchCareers, 250);
    return () => clearTimeout(timer);
  }, [query, selectedCluster, selectedDemand]);

  const toggleCompare = (id: string) => {
    setCompareIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(c => c !== id);
      }
      if (prev.length >= 2) {
        return [prev[1], id];
      }
      return [...prev, id];
    });
  };

  const comparedCareers = careers.filter(c => compareIds.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {lang === "hi" ? "सत्यापित करियर लाइब्रेरी" : lang === "mr" ? "प्रमाणित करिअर लायब्ररी" : "Verified Career Library"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse verified career pathways with official government salary sources and transparent eligibility criteria.
          </p>
        </div>

        {compareIds.length > 0 && (
          <button
            onClick={() => setShowCompareModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-all"
          >
            <Scale className="w-4 h-4" />
            Compare {compareIds.length} Careers Side-by-Side
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by role, skills (e.g. Python, Design), or industry sectors..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedCluster}
              onChange={(e) => setSelectedCluster(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs focus:outline-none"
            >
              <option value="all">All Sectors</option>
              <option value="Information Technology & Software">IT & Software</option>
              <option value="Data Analytics & Artificial Intelligence">Data & AI</option>
              <option value="Design, Media & Creative Arts">Design & Media</option>
              <option value="Healthcare & Life Sciences">Healthcare</option>
              <option value="Finance, Banking & Accounting">Finance & Accounting</option>
              <option value="Engineering & Green Technology">Green Technology</option>
              <option value="Law, Governance & Public Policy">Law & Governance</option>
            </select>

            <select
              value={selectedDemand}
              onChange={(e) => setSelectedDemand(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs focus:outline-none"
            >
              <option value="all">All Demands</option>
              <option value="Very High">Very High Demand</option>
              <option value="High">High Demand</option>
              <option value="Growing">Growing Trajectory</option>
            </select>
          </div>
        </div>
      </div>

      {/* Careers Grid */}
      {loading ? (
        <div className="py-20 text-center text-sm text-slate-500">
          Loading verified career records...
        </div>
      ) : careers.length === 0 ? (
        <div className="py-20 text-center text-sm text-slate-500">
          No careers match your search filters. Try broadening your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map((career) => {
            const isSaved = savedCareerIds.includes(career.id);
            const isCompared = compareIds.includes(career.id);

            return (
              <div
                key={career.id}
                className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-all relative group"
              >
                {/* Header info */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                    {career.cluster}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleCompare(career.id)}
                      className={`text-[10px] font-semibold px-2 py-1 rounded border transition-colors ${
                        isCompared
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                      title="Compare side-by-side"
                    >
                      Compare
                    </button>
                    <button
                      onClick={() => toggleSaveCareer(career.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                      title={isSaved ? "Saved in history" : "Save career"}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <Bookmark className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-snug">
                  {lang === "hi" && career.titleHi ? career.titleHi : lang === "mr" && career.titleMr ? career.titleMr : career.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {career.overview}
                </p>

                {/* Key Metrics */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Eligibility</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {career.eligibility.minEducation.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Typical Duration</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {career.durationYears}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Starting Salary</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      ₹{(career.salaryRangeINR.startingPerAnnum / 100000).toFixed(1)}L / yr
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Market Demand</span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {career.demandLevel}
                    </span>
                  </div>
                </div>

                {/* Verified Source Tag */}
                <div className="mt-4 flex items-center justify-between text-[10px] text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Verified: {career.lastVerifiedDate}</span>
                  </div>
                  <span className="font-mono text-slate-500 font-semibold">{career.riasecCode}</span>
                </div>

                {/* Action Link */}
                <div className="mt-4 pt-2">
                  <Link
                    href={`/explore/${career.slug}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/40 text-slate-800 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400 text-xs font-bold transition-colors"
                  >
                    View Future Scope & Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Comparison Modal */}
      {showCompareModal && comparedCareers.length >= 2 && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-indigo-600" />
                Side-by-Side Career Comparison
              </h2>
              <button
                onClick={() => setShowCompareModal(false)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 divide-x divide-slate-200 dark:divide-slate-800">
              {comparedCareers.map((c) => (
                <div key={c.id} className="space-y-4 px-3">
                  <h3 className="font-bold text-base text-indigo-600 dark:text-indigo-400">{c.title}</h3>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-slate-400 block">Eligibility</span>
                      <p>{c.eligibility.minEducation.toUpperCase()} • {c.eligibility.isEligibleDefaultMessage}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-400 block">Duration & Cost</span>
                      <p>{c.durationYears} • ₹{(c.estimatedCostRange.minINR / 1000).toFixed(0)}k - ₹{(c.estimatedCostRange.maxINR / 100000).toFixed(1)} Lakhs</p>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-400 block">Salary Trajectory</span>
                      <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        ₹{(c.salaryRangeINR.startingPerAnnum / 100000).toFixed(1)}L → ₹{(c.salaryRangeINR.seniorPerAnnum / 100000).toFixed(1)}L per annum
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-400 block">Key Skills</span>
                      <p>{c.keySkills.join(", ")}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-400 block">Flexibility & Demand</span>
                      <p>{c.flexibility} Flexibility • {c.demandLevel} Demand</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
