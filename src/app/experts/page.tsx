"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Expert, ExpertAvailabilitySlot } from "@/types";
import {
  Users,
  ShieldCheck,
  Calendar,
  Clock,
  Video,
  MessageSquare,
  Star,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function ExpertsDirectoryPage() {
  const { lang, user } = useApp();
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);

  // Booking Modal State
  const [availableSlots, setAvailableSlots] = useState<ExpertAvailabilitySlot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [mode, setMode] = useState<"video" | "audio" | "chat">("video");
  const [studentNotes, setStudentNotes] = useState("");
  const [shareAssessmentConsent, setShareAssessmentConsent] = useState(true);
  const [parentalConsentAcknowledged, setParentalConsentAcknowledged] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadExperts() {
      try {
        setLoading(true);
        const res = await fetch("/api/v1/experts");
        const data = await res.json();
        if (data.experts) {
          setExperts(data.experts);
        }
      } catch (err) {
        console.error("Error loading experts", err);
      } finally {
        setLoading(false);
      }
    }
    loadExperts();
  }, []);

  const openBookingModal = (expert: Expert) => {
    setSelectedExpert(expert);
    setBookingSuccess(null);
    setBookingError(null);
    setSelectedSlotId("");

    // Mock slots for the expert
    const mockSlots: ExpertAvailabilitySlot[] = [
      { id: "slot-01", expertId: expert.id, date: "2026-10-26", startTime: "16:00", endTime: "16:45", isBooked: false },
      { id: "slot-02", expertId: expert.id, date: "2026-10-27", startTime: "11:00", endTime: "11:45", isBooked: false },
      { id: "slot-03", expertId: expert.id, date: "2026-10-28", startTime: "18:00", endTime: "18:45", isBooked: false },
    ];
    setAvailableSlots(mockSlots);
  };

  const handleConfirmBooking = async () => {
    if (!user) {
      setBookingError("Please sign in or create an account to schedule a 1:1 expert session.");
      return;
    }

    if (!selectedSlotId) {
      setBookingError("Please select an available time slot.");
      return;
    }

    // Minor consent check
    if ((user.ageBand === "under_14" || user.ageBand === "14_17") && !parentalConsentAcknowledged) {
      setBookingError("Parental consent acknowledgment is required for students under 18 under child data safety rules.");
      return;
    }

    try {
      setIsSubmitting(true);
      setBookingError(null);

      const res = await fetch("/api/v1/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotId: selectedSlotId,
          mode,
          studentNotes,
          shareAssessmentConsent,
          parentalConsentAcknowledged
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setBookingError(data.error || "Failed to confirm consultation slot.");
      } else {
        setBookingSuccess(`Session confirmed with ${selectedExpert?.name}! Room link: ${data.consultation.sessionRoomUrl}`);
      }
    } catch {
      setBookingError("Network error while reserving slot. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin-Verified Counselors • Pro-Bono Public Welfare</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {lang === "hi" ? "विशेषज्ञ परामर्श केंद्र" : lang === "mr" ? "तज्ज्ञ करिअर सल्लागार" : "1:1 Expert Career Consultations"}
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl">
          Book dedicated 45-minute video or chat guidance sessions with verified industry experts and educators. Protected against double-booking with transactional slot locking.
        </p>
      </div>

      {/* Experts List */}
      {loading ? (
        <div className="py-20 text-center text-sm text-slate-500">
          Loading verified counselor directory...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <img
                    src={expert.avatarUrl}
                    alt={expert.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/20 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                        {expert.name}
                      </h3>
                      {expert.isVerifiedByAdmin && (
                        <span className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" title="Admin Verified">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                      {expert.headline}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="flex items-center text-amber-500 font-semibold gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {expert.rating}
                      </span>
                      <span>({expert.reviewsCount} reviews)</span>
                      <span>•</span>
                      <span>{expert.experienceYears} Years Exp</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {expert.bio}
                </p>

                <div className="space-y-1 text-xs">
                  <span className="text-[10px] font-semibold text-slate-400 block">Credentials:</span>
                  <div className="flex flex-wrap gap-1">
                    {expert.qualifications.map((q, qIdx) => (
                      <span key={qIdx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-700 dark:text-slate-300">
                        {q}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                  <span>Languages: <span className="font-semibold text-slate-700 dark:text-slate-300">{expert.languages.join(", ")}</span></span>
                  <span>Fee: <span className="font-bold text-emerald-600 dark:text-emerald-400">Free Pro-Bono</span></span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Live Slots Available
                </span>
                <button
                  onClick={() => openBookingModal(expert)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Schedule Consultation
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {selectedExpert && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Schedule Session with {selectedExpert.name}
                </h3>
                <p className="text-xs text-slate-500">45-minute confidential academic advisory</p>
              </div>
              <button
                onClick={() => setSelectedExpert(null)}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700"
              >
                Close
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-200 space-y-3">
                <p className="font-bold">{bookingSuccess}</p>
                <p>An email calendar invite and secure encrypted Jitsi room link have been generated.</p>
                <button
                  onClick={() => setSelectedExpert(null)}
                  className="w-full py-2 rounded-xl bg-emerald-600 text-white font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                {bookingError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{bookingError}</span>
                  </div>
                )}

                {/* Slot Picker */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Select Available Slot (IST Timezone):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedSlotId(slot.id)}
                        className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                          selectedSlotId === slot.id
                            ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300"
                            : "border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <span className="block text-[10px] text-slate-400">{slot.date}</span>
                        <span className="text-xs">{slot.startTime}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mode */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Preferred Consultation Mode:
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setMode("video")}
                      className={`flex-1 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 ${
                        mode === "video"
                          ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300"
                          : "border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      Encrypted Video
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("chat")}
                      className={`flex-1 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 ${
                        mode === "chat"
                          ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300"
                          : "border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Live Chat
                    </button>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    What would you like to discuss? (Optional):
                  </label>
                  <textarea
                    rows={3}
                    value={studentNotes}
                    onChange={(e) => setStudentNotes(e.target.value)}
                    placeholder="e.g. Confused between computer science vs electronics after 12th; seeking advice on entrance exams."
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Consents */}
                <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shareAssessmentConsent}
                      onChange={(e) => setShareAssessmentConsent(e.target.checked)}
                      className="mt-0.5 rounded text-indigo-600"
                    />
                    <span className="text-[11px] text-slate-600 dark:text-slate-400">
                      Share my recent RIASEC assessment score report with the expert before the call.
                    </span>
                  </label>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={parentalConsentAcknowledged}
                      onChange={(e) => setParentalConsentAcknowledged(e.target.checked)}
                      className="mt-0.5 rounded text-indigo-600"
                    />
                    <span className="text-[11px] text-slate-600 dark:text-slate-400">
                      Parental/Guardian consent acknowledgment (Mandatory for students under 18 under DPDP child safety guidelines).
                    </span>
                  </label>
                </div>

                <button
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Locking Slot..." : "Confirm Free Booking"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
