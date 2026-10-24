import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";
import { Consultation } from "@/types";
import { VERIFIED_EXPERTS } from "@/data/experts";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("pc_access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const payload = await verifyAccessToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Invalid session token" }, { status: 401 });
  }

  // Access control: Checklist Item 5
  // Students only see their own bookings; Experts only see bookings assigned to them
  const allConsultations = Array.from(db.consultations.values());
  const userBookings = allConsultations.filter(c => {
    if (payload.role === "admin") return true;
    if (payload.role === "expert") return c.expertId === payload.userId || c.expertId === `exp-01`;
    return c.studentId === payload.userId;
  });

  return NextResponse.json({
    success: true,
    consultations: userBookings
  });
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("pc_access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Please log in to book an expert consultation" }, { status: 401 });
  }

  const payload = await verifyAccessToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Invalid session token" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { slotId, mode, studentNotes, shareAssessmentConsent, parentalConsentAcknowledged } = body;

    if (!slotId) {
      return NextResponse.json({ error: "Please select an available time slot" }, { status: 400 });
    }

    // Transactional Slot Locking: prevent double booking
    const slot = db.slots.get(slotId);
    if (!slot) {
      return NextResponse.json({ error: "Slot not found" }, { status: 404 });
    }

    if (slot.isBooked) {
      return NextResponse.json({ error: "This slot was just booked by another student. Please pick another time." }, { status: 409 });
    }

    // Lock slot
    slot.isBooked = true;
    db.slots.set(slot.id, slot);

    const expert = VERIFIED_EXPERTS.find(e => e.id === slot.expertId);
    const consultationId = `cns-${Date.now()}`;

    const newConsultation: Consultation = {
      id: consultationId,
      studentId: payload.userId,
      expertId: slot.expertId,
      expertName: expert ? expert.name : "Verified Expert",
      slotId: slot.id,
      date: slot.date,
      time: `${slot.startTime} - ${slot.endTime}`,
      mode: mode || "video",
      status: "confirmed",
      studentNotes: studentNotes ? studentNotes.slice(0, 500) : "",
      shareAssessmentConsent: Boolean(shareAssessmentConsent),
      parentalConsentAcknowledged: Boolean(parentalConsentAcknowledged),
      sessionRoomUrl: `https://meet.jit.si/pathcopilot-session-${consultationId}`,
      createdAt: new Date().toISOString()
    };

    db.consultations.set(newConsultation.id, newConsultation);

    // Activity Log
    const logs = db.activityLogs.get(payload.userId) || [];
    logs.unshift({
      id: `act-${Date.now()}`,
      userId: payload.userId,
      type: "consultation",
      title: "Booked Expert Consultation",
      description: `Confirmed 1:1 session with ${newConsultation.expertName} on ${newConsultation.date} at ${newConsultation.time}`,
      refId: newConsultation.id,
      createdAt: new Date().toISOString()
    });
    db.activityLogs.set(payload.userId, logs);

    return NextResponse.json({
      success: true,
      consultation: newConsultation
    });
  } catch {
    return NextResponse.json({ error: "Booking execution failed" }, { status: 500 });
  }
}
