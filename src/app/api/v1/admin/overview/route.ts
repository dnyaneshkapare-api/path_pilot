import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";
import { db } from "@/lib/db";
import { VERIFIED_CAREERS } from "@/data/careers";
import { VERIFIED_EXPERTS } from "@/data/experts";

export async function GET(req: NextRequest) {
  // Enforce server-side Admin role check: Checklist Item 3
  const token = req.cookies.get("pc_access_token")?.value ||
                req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Admin authentication required" }, { status: 401 });
  }

  const payload = await verifyAccessToken(token);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: Administrative privileges required" }, { status: 403 });
  }

  return NextResponse.json({
    success: true,
    stats: {
      totalUsers: db.users.size,
      totalCareers: VERIFIED_CAREERS.length,
      totalExperts: VERIFIED_EXPERTS.length,
      pendingVerificationsCount: 0,
      staleDataChecksDue: [
        { careerId: "car-07", title: "Digital Marketing Strategist", daysUntilRecheck: 18 },
        { careerId: "car-08", title: "Clinical Psychologist", daysUntilRecheck: 24 }
      ]
    },
    users: Array.from(db.users.values()).map(u => {
      const { passwordHash: _, ...safe } = u;
      return safe;
    }),
    recentActivityCount: Array.from(db.activityLogs.values()).reduce((acc, list) => acc + list.length, 0)
  });
}
