import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("pc_access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Authentication required to view student history" }, { status: 401 });
  }

  const payload = await verifyAccessToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Invalid session token" }, { status: 401 });
  }

  const userId = payload.userId;

  // Retrieve user activity logs
  const activityLogs = db.activityLogs.get(userId) || [];
  const assessments = db.assessments.get(userId) || [];
  const consultations = Array.from(db.consultations.values()).filter(c => c.studentId === userId);
  const savedCareerIds = Array.from(db.savedCareers.get(userId) || []);

  return NextResponse.json({
    success: true,
    history: {
      activityLogs,
      assessments,
      consultations,
      savedCareerIds
    }
  });
}

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get("pc_access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const payload = await verifyAccessToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Invalid session token" }, { status: 401 });
  }

  const userId = payload.userId;

  // Erase history records according to DPDP Act right to be forgotten
  db.activityLogs.set(userId, []);
  db.assessments.set(userId, []);
  db.savedCareers.set(userId, new Set());

  return NextResponse.json({
    success: true,
    message: "Your learning history and assessment attempts have been permanently cleared."
  });
}
