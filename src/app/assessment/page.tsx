"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { RIASEC_ASSESSMENT_QUESTIONS, ASSESSMENT_VERSION } from "@/data/assessmentQuestions";
import { RIASECScore } from "@/types";
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

export default function AssessmentPage() {
  const router = useRouter();
  const { lang, setLastAssessmentScores } = useApp();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    scores: RIASECScore;
    primaryCode: string;
    saved: boolean;
  } | null>(null);

  const currentQ = RIASEC_ASSESSMENT_QUESTIONS[currentStep];

  const handleSelectOption = (rating: number) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: rating }));
    if (currentStep < RIASEC_ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const res = await fetch("/api/v1/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers })
      });
      const data = await res.json();
      if (data.success) {
        setResult(data);
        setLastAssessmentScores(data.scores);
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    } catch (err) {
      console.error("Failed to submit assessment", err);
    } finally {
      setSubmitting(false);
    }
  };

  const getQuestionText = () => {
    if (lang === "hi") return currentQ.textHi;
    if (lang === "mr") return currentQ.textMr;
    return currentQ.textEn;
  };

  const scaleLabels = [
    { value: 1, label: lang === "hi" ? "बिल्कुल असहमत" : lang === "mr" ? "मुळीच मान्य नाही" : "Strongly Dislike / Disagree" },
    { value: 2, label: lang === "hi" ? "असहमत" : lang === "mr" ? "मान्य नाही" : "Disagree" },
    { value: 3, label: lang === "hi" ? "तटस्थ" : lang === "mr" ? "तटस्थ" : "Neutral / Undecided" },
    { value: 4, label: lang === "hi" ? "सहमत" : lang === "mr" ? "मान्य आहे" : "Agree" },
    { value: 5, label: lang === "hi" ? "पूरी तरह सहमत" : lang === "mr" ? "पूर्णपणे सहमत" : "Strongly Enjoy / Agree" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>RIASEC Psychometric Engine • Version {ASSESSMENT_VERSION}</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {lang === "hi" ? "रुचि और करियर मूल्यांकन" : lang === "mr" ? "रुची व कल चाचणी" : "RIASEC Career Interest Assessment"}
        </h1>
        <p className="text-xs text-slate-500 max-w-lg mx-auto">
          Short, mobile-friendly test with skippable questions. There are no right or wrong answers; choose what naturally energizes you.
        </p>
      </div>

      {!result ? (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-sm space-y-6">
          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Question {currentStep + 1} of {RIASEC_ASSESSMENT_QUESTIONS.length}</span>
              <span>{Math.round(((currentStep + 1) / RIASEC_ASSESSMENT_QUESTIONS.length) * 100)}% Complete</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / RIASEC_ASSESSMENT_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question card */}
          <div className="py-4 space-y-3">
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              {currentQ.category} • Dimension: {currentQ.dimension}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
              {getQuestionText()}
            </h2>
          </div>

          {/* 5-point Likert Scale Options */}
          <div className="space-y-2.5">
            {scaleLabels.map((opt) => {
              const isSelected = answers[currentQ.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelectOption(opt.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 shadow-sm"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <span>{opt.label}</span>
                  <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">
                    {opt.value}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Nav Controls */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-30"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Previous
            </button>

            {currentStep < RIASEC_ASSESSMENT_QUESTIONS.length - 1 ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Skip / Next
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
              >
                {submitting ? "Analyzing Assessment..." : "Calculate RIASEC Profile"}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results Section */
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-lg space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Your RIASEC Interest Profile Code: <span className="text-indigo-600 dark:text-indigo-400">{result.primaryCode}</span>
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {result.saved
                ? "Your results have been securely linked to your learning account timeline."
                : "Guest mode: You can take the test freely. Sign up or log in if you'd like to save it to your permanent history."}
            </p>
          </div>

          {/* Dimension Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(result.scores).map(([dim, val]) => (
              <div key={dim} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-center space-y-1">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block">{dim}</span>
                <span className="text-xl font-extrabold text-slate-900 dark:text-white">{val} / 10</span>
                <span className="text-[10px] text-slate-400 block">
                  {dim === "R" ? "Realistic" : dim === "I" ? "Investigative" : dim === "A" ? "Artistic" : dim === "S" ? "Social" : dim === "E" ? "Enterprising" : "Conventional"}
                </span>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => router.push("/recommendations")}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              See Ranked AI Career Matches →
            </button>
            <button
              onClick={() => {
                setResult(null);
                setAnswers({});
                setCurrentStep(0);
              }}
              className="w-full sm:w-auto px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
