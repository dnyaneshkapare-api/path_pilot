"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { CareerScoreBreakdown, RIASECScore } from "@/types";
import { DEFAULT_WEIGHTS } from "@/lib/recommendationEngine";
import {
  Compass,
  Sparkles,
  Sliders,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Info
} from "lucide-react";

export default function RecommendationsPage() {
  const { lang, lastAssessmentScores } = useApp();
  const [recommendations, setRecommendations] = useState<CareerScoreBreakdown[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFormulaDrawer, setShowFormulaDrawer] = useState(false);

  // Adjustable Weights
  const [weights, setWeights] = useState({
    I: DEFAULT_WEIGHTS.I,
    A: DEFAULT_WEIGHTS.A,
    G: DEFAULT_WEIGHTS.G,
    P: DEFAULT_WEIGHTS.P,
    F: DEFAULT_WEIGHTS.F,
  });

  const fetchRecommendations = async (customWeights = weights) => {
    try {
      setLoading(true);
      const scores: RIASECScore = lastAssessmentScores || { R: 7, I: 9, A: 6, S: 5, E: 7, C: 6 };
      const res = await fetch("/api/v1/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scores, weights: customWeights })
      });
      const data = await res.json();
      if (data.recommendations) {
        setRecommendations(data.recommendations);
      }
    } catch (err) {
      console.error("Failed to load recommendations", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [lastAssessmentScores]);

  const handleWeightChange = (key: keyof typeof weights, val: number) => {
    const updated = { ...weights, [key]: val };
    setWeights(updated);
    fetchRecommendations(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>S(c) Formula Engine • Algorithmic Alignment</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {lang === "hi" ? "एआई करियर अनुशंसाएं" : lang === "mr" ? "एआय करिअर शिफारसी" : "AI Career Matches & Evidence"}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Shown as "match under the current method", not as a guarantee of success. Every card explains why it fits and highlights uncertainty.
          </p>
        </div>

        {/* Adjustable assumptions control */}
        <button
          onClick={() => setShowFormulaDrawer(!showFormulaDrawer)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold shadow-sm transition-colors"
        >
          <Sliders className="w-4 h-4 text-indigo-600" />
          Adjust Formula Weights ({showFormulaDrawer ? "Hide" : "Customize"})
        </button>
      </div>

      {/* Adjustable Weights Drawer */}
      {showFormulaDrawer && (
        <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 p-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Formula Assumptions: S(c) = w_I * I + w_A * A + w_G * G + w_P * P + w_F * F
            </h3>
            <button
              onClick={() => {
                setWeights(DEFAULT_WEIGHTS);
                fetchRecommendations(DEFAULT_WEIGHTS);
              }}
              className="text-xs text-indigo-600 hover:underline font-semibold"
            >
              Reset to Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                Interest Alignment (I): {weights.I.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.05"
                max="0.60"
                step="0.05"
                value={weights.I}
                onChange={(e) => handleWeightChange("I", parseFloat(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                Activity/Skills (A): {weights.A.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.05"
                max="0.40"
                step="0.05"
                value={weights.A}
                onChange={(e) => handleWeightChange("A", parseFloat(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                Goal Alignment (G): {weights.G.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.05"
                max="0.40"
                step="0.05"
                value={weights.G}
                onChange={(e) => handleWeightChange("G", parseFloat(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                Practical Constraints (P): {weights.P.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.05"
                max="0.40"
                step="0.05"
                value={weights.P}
                onChange={(e) => handleWeightChange("P", parseFloat(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                Future Demand Scope (F): {weights.F.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.05"
                max="0.40"
                step="0.05"
                value={weights.F}
                onChange={(e) => handleWeightChange("F", parseFloat(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* Recommendations Cards List */}
      {loading ? (
        <div className="py-20 text-center text-sm text-slate-500">
          Running scoring pipeline across verified careers...
        </div>
      ) : (
        <div className="space-y-6">
          {recommendations.map((rec, idx) => (
            <div
              key={rec.careerId}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow space-y-6"
            >
              {/* Top Banner with Rank and Score */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-extrabold text-sm flex items-center justify-center">
                    #{idx + 1}
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {rec.careerTitle}
                    </h2>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {rec.formula} • Model: {rec.modelVersion}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Match Score</span>
                    <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                      {rec.totalScore}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Component breakdown bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-[10px] text-slate-400 block">Interest (I)</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{rec.components.I} / 100</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-[10px] text-slate-400 block">Skills/Activities (A)</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{rec.components.A} / 100</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-[10px] text-slate-400 block">Goal Fit (G)</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{rec.components.G} / 100</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-[10px] text-slate-400 block">Practical Constraints (P)</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{rec.components.P} / 100</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-[10px] text-slate-400 block">Future Demand (F)</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{rec.components.F} / 100</span>
                </div>
              </div>

              {/* Eligibility Check Notice */}
              <div className={`p-4 rounded-2xl flex items-start gap-3 text-xs ${
                rec.eligibilityCheck.isQualified
                  ? "bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-300"
                  : "bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-300"
              }`}>
                {rec.eligibilityCheck.isQualified ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <span className="font-bold block">
                    {rec.eligibilityCheck.isQualified ? "Eligible or Progressing Normally" : "Bridge Stages Needed (Career Not Excluded)"}
                  </span>
                  <p>{rec.eligibilityCheck.notice}</p>
                  {rec.eligibilityCheck.missingQualifications.length > 0 && (
                    <ul className="list-disc pl-4 space-y-0.5 pt-1 text-[11px]">
                      {rec.eligibilityCheck.missingQualifications.map((m, idx) => (
                        <li key={idx}>{m}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Grounded AI Explanation & Caveats */}
              <div className="space-y-3 pt-2 text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">
                    Why this career was retrieved:
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {rec.aiExplanation.whyItFits}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-indigo-500" />
                    Uncertainty & Assumptions Notice:
                  </span>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
                    {rec.aiExplanation.caveatsAndUncertainty}
                  </p>
                </div>

                {/* Alternatives */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] font-semibold text-slate-400">Related Alternatives:</span>
                  {rec.aiExplanation.suggestedAlternatives.map((alt, aIdx) => (
                    <span key={aIdx} className="px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-[11px] font-medium">
                      {alt}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={`/explore/${rec.careerId}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
                >
                  Inspect Sourced Outlook
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/roadmaps?careerId=${rec.careerId}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  Start Learning Roadmap
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
