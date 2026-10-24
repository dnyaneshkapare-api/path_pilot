"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  Compass,
  BookOpen,
  Users,
  MessageSquareQuote,
  History,
  ShieldCheck,
  UserCheck,
  LogOut,
  LogIn,
  Sparkles
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, lang, setLang, logout } = useApp();

  const navLinks = [
    { href: "/explore", label: lang === "hi" ? "करियर लाइब्रेरी" : lang === "mr" ? "करिअर लायब्ररी" : "Explore Careers", icon: Compass },
    { href: "/assessment", label: lang === "hi" ? "रुचि मूल्यांकन" : lang === "mr" ? "रुची चाचणी" : "Assessment", icon: Sparkles },
    { href: "/recommendations", label: lang === "hi" ? "एआई अनुशंसाएं" : lang === "mr" ? "एआय शिफारसी" : "AI Matches", icon: Compass },
    { href: "/roadmaps", label: lang === "hi" ? "लर्निंग रोडमैप" : lang === "mr" ? "रोडमॅप्स" : "Roadmaps", icon: BookOpen },
    { href: "/experts", label: lang === "hi" ? "विशेषज्ञ परामर्श" : lang === "mr" ? "तज्ज्ञ सल्ला" : "1:1 Experts", icon: Users },
    { href: "/mentor", label: lang === "hi" ? "एआई मेंटर" : lang === "mr" ? "एआय मार्गदर्शक" : "AI Mentor", icon: MessageSquareQuote },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-indigo-700 dark:from-white dark:to-indigo-300 bg-clip-text text-transparent">
                Path Copilot
              </span>
              <span className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Learn • Discover • Grow
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400"
                      : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Language Selector & Auth CTAs */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 text-xs font-medium border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-1 rounded-md transition-colors ${lang === "en" ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-300 font-bold" : "text-slate-600 dark:text-slate-400"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("hi")}
                className={`px-2 py-1 rounded-md transition-colors ${lang === "hi" ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-300 font-bold" : "text-slate-600 dark:text-slate-400"}`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setLang("mr")}
                className={`px-2 py-1 rounded-md transition-colors ${lang === "mr" ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-300 font-bold" : "text-slate-600 dark:text-slate-400"}`}
              >
                मराठी
              </button>
            </div>

            {/* User Session status */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/history"
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="My History & Saved Pathways"
                >
                  <History className="w-4 h-4 text-indigo-500" />
                </Link>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1 text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 px-2 py-1 rounded-md font-semibold"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Admin
                  </Link>
                )}
                <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-200">
                  <UserCheck className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold">{user.name.split(" ")[0]}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-500" />
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
