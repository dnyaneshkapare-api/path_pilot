"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { LearningRoadmap } from "@/types";
import {
  BookOpen,
  CheckCircle,
  ExternalLink,
  Layers,
  Sparkles,
  Award,
  Clock,
  Globe
} from "lucide-react";

function RoadmapsContent() {
  const searchParams = useSearchParams();
  const careerId = searchParams.get("careerId") || "car-01";
  const { lang } = useApp();

  const [roadmap, setRoadmap] = useState<LearningRoadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    async function loadRoadmap() {
      try {
        setLoading(true);
        const res = await fetch(`/api/v1/roadmaps?careerId=${careerId}`);
        const data = await res.json();
        if (data.roadmap) {
          setRoadmap(data.roadmap);
        }
      } catch (err) {
        console.error("Error loading roadmap", err);
      } finally {
        setLoading(false);
      }
    }
    loadRoadmap();
  }, [careerId]);

  const toggleStepCompleted = (stepNum: number) => {
    setCompletedSteps(prev =>
      prev.includes(stepNum) ? prev.filter(s => s !== stepNum) : [...prev, stepNum]
    );
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-sm text-slate-500">
        Loading structured roadmap curriculum...
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="py-24 text-center text-sm text-slate-500">
        Roadmap not found for this career.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Curated Learning Curriculum (Level 0 to Level 3)</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Learning Roadmap: {roadmap.careerTitle}
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {roadmap.overview}
        </p>

        {/* Completion tracker */}
        <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <span>Your Progress: {completedSteps.length} of {roadmap.steps.length} Levels Mastered</span>
          <div className="w-36 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${(completedSteps.length / roadmap.steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Levels list */}
      <div className="space-y-6">
        {roadmap.steps.map((step) => {
          const isDone = completedSteps.includes(step.stepNumber);

          return (
            <div
              key={step.stepNumber}
              className={`rounded-3xl border p-6 sm:p-8 transition-all ${
                isDone
                  ? "border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10 shadow-sm"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
              }`}
            >
              {/* Step Title Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-extrabold text-sm flex items-center justify-center">
                    {step.stepNumber}
                  </span>
                  <div>
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                      {step.level}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={() => toggleStepCompleted(step.stepNumber)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    isDone
                      ? "bg-emerald-600 text-white"
                      : "border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  {isDone ? "Mastered" : "Mark as Mastered / Skip"}
                </button>
              </div>

              {/* Description & Prerequisites */}
              <div className="py-4 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <p>{step.description}</p>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                  <span className="font-semibold text-slate-400">Prerequisites:</span>
                  {step.prerequisites.map((req, rIdx) => (
                    <span key={rIdx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Courses List */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Verified Courses & Open Courseware:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {step.courses.map((course) => (
                    <div
                      key={course.id}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2 text-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400">{course.provider}</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            {course.isFree ? "100% Free" : `₹${course.costINR}`}
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white leading-snug">
                          {course.title}
                        </h3>
                      </div>

                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/40 flex items-center justify-between text-[10px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {course.durationWeeks} weeks
                        </span>
                        <a
                          href={course.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-indigo-600 hover:underline font-semibold"
                        >
                          Course Link
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Portfolio Project Milestone */}
              <div className="mt-4 p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 text-xs space-y-1">
                <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  Portfolio Milestone Project ({step.practicalProject.estimatedHours} hrs)
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  {step.practicalProject.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                  Deliverable: {step.practicalProject.deliverable}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function RoadmapsPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-sm text-slate-500">Loading roadmap...</div>}>
      <RoadmapsContent />
    </Suspense>
  );
}
