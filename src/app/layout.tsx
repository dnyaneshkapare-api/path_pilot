import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Path Copilot | AI Career Discovery & Learning Platform",
  description: "Learn • Discover • Grow. Evidence-grounded career discovery, RIASEC interest assessments, level-by-level skill roadmaps, and verified 1:1 expert consultations.",
  keywords: ["career guidance", "RIASEC assessment", "education after 10th", "education after 12th", "college career roadmaps", "career mentor"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased`}>
        <AppProvider>
          <Navbar />
          <main className="flex-1 pb-16">{children}</main>
          <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 py-8 text-center text-xs text-slate-500">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p>© 2026 AI Career Discovery & Learning Platform (Path Copilot). Built for transparent, evidence-grounded education guidance.</p>
              <div className="flex items-center gap-4">
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">● India DPDP Act Compliant</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">● Government NCS Citations</span>
              </div>
            </div>
          </footer>
        </AppProvider>
      </body>
    </html>
  );
}
