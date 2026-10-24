"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { ActivityLogItem, InterestAssessmentRecord, Consultation } from "@/types";
import {
  History,
  Trash2,
  Download,
  Calendar,
  Sparkles,
  Bookmark,
  Users,
  AlertTriangle,
  FileText
} from "lucide-react";
import jsPDF from "jspdf";

export default function HistoryPage() {
  const { user } = useApp();
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>([]);
  const [assessments, setAssessments] = useState<InterestAssessmentRecord[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    async function loadHistory() {
      try {
        setLoading(true);
        const res = await fetch("/api/v1/history");
        const data = await res.json();
        if (data.history) {
          setActivityLogs(data.history.activityLogs || []);
          setAssessments(data.history.assessments || []);
          setConsultations(data.history.consultations || []);
        }
      } catch (err) {
        console.error("Error loading history", err);
      } finally {
        setLoading(false);
      }
    }
    if (user) {
      loadHistory();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleDeleteHistory = async () => {
    try {
      const res = await fetch("/api/v1/history", { method: "DELETE" });
      if (res.ok) {
        setActivityLogs([]);
        setAssessments([]);
        setShowDeleteConfirm(false);
      }
    } catch (err) {
      console.error("Error deleting history", err);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Path Copilot - Student Discovery & Learning History", 14, 20);

    doc.setFontSize(10);
    doc.text(`Student: ${user?.name || "Student"} (${user?.email})`, 14, 28);
    doc.text(`Export Date: ${new Date().toLocaleDateString()}`, 14, 34);

    doc.setFontSize(12);
    doc.text("Activity Timeline Records:", 14, 46);

    let y = 54;
    activityLogs.forEach((act, idx) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(9);
      doc.text(`${idx + 1}. [${act.createdAt.slice(0, 10)}] ${act.title}: ${act.description}`, 14, y);
      y += 8;
    });

    doc.save(`PathCopilot_History_${user?.name?.replace(/\s+/g, "_") || "student"}.pdf`);
  };

  const filteredLogs = activityLogs.filter(item => {
    if (filterType === "all") return true;
    return item.type === filterType;
  });

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <History className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Sign In to View Your History</h2>
        <p className="text-xs text-slate-500">
          Your learning timeline, assessment attempts, saved pathways, and consultation notes are encrypted and accessible only when logged in.
        </p>
        <Link
          href="/login"
          className="inline-block px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs"
        >
          Sign In Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 mb-2">
            <History className="w-3.5 h-3.5" />
            <span>Private Student Timeline • DPDP Compliant</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            My Discovery & Learning History
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review past assessments, career explorations, mentor dialogues, and expert consultation notes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPDF}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" />
            Export as PDF
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold text-rose-600 dark:text-rose-400 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete My History
          </button>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-base">Permanently Delete History?</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Under India DPDP Act Right to Erasure, all your activity logs, past assessment attempts, and saved recommendations will be permanently wiped.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteHistory}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
              >
                Yes, Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-slate-400 mr-1">Filter by type:</span>
        {["all", "assessment", "career_save", "roadmap_start", "consultation"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 rounded-xl font-semibold capitalize transition-colors ${
              filterType === type
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
            }`}
          >
            {type.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Activity Timeline List */}
      {loading ? (
        <div className="py-20 text-center text-sm text-slate-500">
          Loading learning history records...
        </div>
      ) : filteredLogs.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center space-y-2">
          <FileText className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300">No activity logged yet</h3>
          <p className="text-xs text-slate-500">Take an assessment or save careers to start building your timeline.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm flex items-start gap-4 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 font-bold">
                {log.type === "assessment" ? (
                  <Sparkles className="w-5 h-5" />
                ) : log.type === "career_save" ? (
                  <Bookmark className="w-5 h-5" />
                ) : log.type === "consultation" ? (
                  <Users className="w-5 h-5" />
                ) : (
                  <Calendar className="w-5 h-5" />
                )}
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {log.title}
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    {new Date(log.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {log.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
