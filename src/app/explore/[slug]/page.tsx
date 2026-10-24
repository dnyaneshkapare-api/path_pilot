import { notFound } from "next/navigation";
import Link from "next/link";
import { getCareerByIdOrSlug, VERIFIED_CAREERS } from "@/data/careers";
import {
  ShieldCheck,
  Building2,
  Calendar,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  ArrowLeft,
  Briefcase,
  AlertCircle
} from "lucide-react";

export async function generateStaticParams() {
  return VERIFIED_CAREERS.map((career) => ({
    slug: career.slug,
  }));
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const career = getCareerByIdOrSlug(slug);

  if (!career) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Career Library
        </Link>
      </div>

      {/* Hero Header */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
            {career.cluster}
          </span>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Evidence Level: {career.evidenceLevel.toUpperCase()}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
              RIASEC: {career.riasecCode}
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {career.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {career.overview}
        </p>

        {/* Action CTAs */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Link
            href={`/roadmaps?careerId=${career.id}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            View Level 0-3 Learning Roadmap
          </Link>
          <Link
            href={`/mentor?career=${career.id}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
          >
            Ask AI Mentor About This Career
          </Link>
        </div>
      </div>

      {/* Future Scope & Salary Statistics (Verified & Non-hallucinated) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 block font-medium">Starting Salary (0-2 Yrs)</span>
          <span className="text-2xl font-bold text-slate-900 dark:text-white block">
            ₹{(career.salaryRangeINR.startingPerAnnum / 100000).toFixed(1)} Lakhs
          </span>
          <span className="text-[11px] text-slate-500 block">Pan-India Verified Entry Range</span>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 block font-medium">Mid-Career Salary (3-6 Yrs)</span>
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 block">
            ₹{(career.salaryRangeINR.midCareerPerAnnum / 100000).toFixed(1)} Lakhs
          </span>
          <span className="text-[11px] text-slate-500 block">Based on proven competence & scale</span>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 block font-medium">Senior Specialists (7+ Yrs)</span>
          <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 block">
            ₹{(career.salaryRangeINR.seniorPerAnnum / 100000).toFixed(1)} Lakhs
          </span>
          <span className="text-[11px] text-slate-500 block">Architecture & executive leadership</span>
        </div>
      </div>

      {/* Official Government Citation & Verification Seal */}
      <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 p-5 flex items-start gap-4">
        <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <h4 className="font-bold text-emerald-900 dark:text-emerald-200">
            Official Source Verification & Non-Hallucination Guarantee
          </h4>
          <p className="text-emerald-800 dark:text-emerald-300">
            Source: <span className="font-semibold">{career.salaryRangeINR.source}</span> • Published Date: {career.sourceCitation.publishedDate} • Region: {career.salaryRangeINR.region} • Last Audit Date: {career.lastVerifiedDate}.
          </p>
        </div>
      </div>

      {/* Detailed Overview: Eligibility, Routes, Typical Week, Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Entry Routes & Eligibility */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-500" />
            Eligibility & Common Entry Routes
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {career.eligibility.isEligibleDefaultMessage}
          </p>
          <ul className="space-y-2 text-xs">
            {career.entryRoutes.map((route, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span>{route}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Typical Work Week */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-500" />
            Typical Real-World Responsibilities
          </h3>
          <ul className="space-y-2 text-xs">
            {career.typicalWorkWeek.map((work, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <span className="text-indigo-500 font-bold">•</span>
                <span>{work}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Key Skills & Industry Sectors */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          Core Competencies & Employing Sectors
        </h3>
        <div className="space-y-3">
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-2">High-Impact Skills:</span>
            <div className="flex flex-wrap gap-2">
              {career.keySkills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-2">Primary Industry Sectors:</span>
            <div className="flex flex-wrap gap-2">
              {career.sectors.map((sec, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-medium">
                  {sec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
