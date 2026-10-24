"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  Sparkles,
  Compass,
  BookOpen,
  Users,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  GraduationCap
} from "lucide-react";

export default function HomePage() {
  const { lang, user } = useApp();

  const headings = {
    en: {
      tag: "Verified • Evidence-Grounded • Student First",
      heroTitle: "Discover Careers That Match Your True Potential",
      heroDesc: "Navigate life after 10th, 12th, or college with transparent RIASEC psychometrics, verified salary statistics, free curated learning roadmaps, and verified 1:1 counselors.",
      ctaPrimary: "Take RIASEC Assessment",
      ctaSecondary: "Explore 12+ Verified Careers",
      flowTitle: "How Path Copilot Guides You Step-by-Step",
      step1Title: "1. Assess Interests",
      step1Desc: "Mobile-friendly RIASEC test mapping Realistic, Investigative, Artistic, Social, Enterprising & Conventional inclinations.",
      step2Title: "2. Explore Careers",
      step2Desc: "Transparent formula S(c) = 0.35I + 0.20A + 0.15G + 0.15P + 0.15F. Never hallucinates job statistics.",
      step3Title: "3. Future Scope & Data",
      step3Desc: "Every salary number carries an official government source (NCS/MeitY), publish date, and verification seal.",
      step4Title: "4. Level-by-Level Roadmaps",
      step4Desc: "Progress from Level 0 Explore to Level 3 Specialize with free NPTEL/Swayam courses and practical portfolio projects."
    },
    hi: {
      tag: "सत्यापित • प्रामाणिक • छात्र-केंद्रित",
      heroTitle: "अपनी वास्तविक क्षमताओं के अनुरूप करियर खोजें",
      heroDesc: "10वीं, 12वीं या कॉलेज के बाद पारदर्शी आरआईएसीईसी मूल्यांकन, वास्तविक वेतन आंकड़ों और निःशुल्क शिक्षण रोडमैप के साथ करियर दिशा पाएं।",
      ctaPrimary: "रुचि मूल्यांकन शुरू करें",
      ctaSecondary: "करियर लाइब्रेरी देखें",
      flowTitle: "पथ कोपायलट आपके मार्गदर्शन का क्रम",
      step1Title: "१. रुचि मूल्यांकन",
      step1Desc: "मोबाइल-अनुकूल आरआईएसीईसी परीक्षण जो आपकी सोच और पसंद को मापता है।",
      step2Title: "२. करियर अन्वेषण",
      step2Desc: "पारदर्शी सूत्र S(c) पर आधारित मैच, जो किसी भी आंकड़े को मनगढ़ंत नहीं बनाता।",
      step3Title: "३. भविष्य और आंकड़े",
      step3Desc: "सरकारी स्रोतों (NCS/MeitY) और सत्यापन तिथियों के साथ प्रामाणिक वेतन सीमाएं।",
      step4Title: "४. चरणबद्ध रोडमैप",
      step4Desc: "लेवल 0 से 3 तक निःशुल्क NPTEL और स्वयम पाठ्यक्रमों के साथ कौशल विकास।"
    },
    mr: {
      tag: "प्रमाणित • पारदर्शक • विद्यार्थी-प्रथम",
      heroTitle: "तुमच्या सुप्त क्षमतांनुसार योग्य करिअर निवडा",
      heroDesc: "१०वी, १२वी किंवा पदवीनंतर पारदर्शक RIASEC चाचणी, सरकारी पगाराची आकडेवारी आणि मोफत लर्निंग रोडमॅप्सच्या मदतीने दिशा मिळवा.",
      ctaPrimary: "रुची चाचणी सुरू करा",
      ctaSecondary: "करिअर लायब्ररी पहा",
      flowTitle: "पथ कोपायलटचे ४ सोपे टप्पे",
      step1Title: "१. रुचीचे मूल्यांकन",
      step1Desc: "तुमच्या आवडीनिवडी, कला आणि विचारसरणी समजून घेणारी शास्त्रीय चाचणी.",
      step2Title: "२. करिअर अन्वेषण",
      step2Desc: "पारदर्शक S(c) फॉर्म्युल्यावर आधारित अचूक शिफारसी.",
      step3Title: "३. भविष्य आणि व्याप्ती",
      step3Desc: "सरकारी अहवाल आणि अधिकृत स्त्रोतांवर आधारित प्रमाणित पगार आणि संधी.",
      step4Title: "४. टप्प्याटप्प्याने रोडमॅप",
      step4Desc: "लेव्हल ० ते ३ पर्यंत विनामूल्य अभ्यासक्रम आणि प्रत्यक्ष प्रकल्प कौशल्ये."
    }
  };

  const t = headings[lang];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.tag}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {t.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.heroDesc}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/assessment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-purple-500 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4" />
                {t.ctaPrimary}
              </Link>
              <Link
                href="/explore"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Compass className="w-4 h-4 text-indigo-500" />
                {t.ctaSecondary}
              </Link>
            </div>

            {/* Quick Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>100% Free Core Roadmaps</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero AI Hallucinations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Guest Mode Allowed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.flowTitle}
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            The AI guides and equips you with structured data; it never dictates your life choices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">{t.step1Title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{t.step1Desc}</p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">{t.step2Title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{t.step2Desc}</p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">{t.step3Title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{t.step3Desc}</p>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">{t.step4Title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{t.step4Desc}</p>
          </div>
        </div>
      </section>

      {/* Target Audiences: 10th, 12th, College, Career Explorers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white p-8 sm:p-12 shadow-xl">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-white/10 text-indigo-200">
              <GraduationCap className="w-4 h-4" />
              Tailored for Every Educational Stage
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Whether you are deciding after 10th standard or pivoting in mid-career
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We check prerequisites and eligibility transparently without locking doors. Missing a diploma or science stream? Our system maps the bridge pathways rather than disqualifying you.
            </p>
            <div className="pt-2">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-lg bg-white text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Browse Career Library
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
