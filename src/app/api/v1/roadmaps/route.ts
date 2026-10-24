import { NextRequest, NextResponse } from "next/server";
import { getRoadmapByCareerId, VERIFIED_ROADMAPS } from "@/data/roadmaps";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const careerId = searchParams.get("careerId");

  if (careerId) {
    const roadmap = getRoadmapByCareerId(careerId);
    if (!roadmap) {
      // Fallback to default roadmap
      return NextResponse.json({
        success: true,
        roadmap: VERIFIED_ROADMAPS[0]
      });
    }
    return NextResponse.json({ success: true, roadmap });
  }

  return NextResponse.json({
    success: true,
    total: VERIFIED_ROADMAPS.length,
    roadmaps: VERIFIED_ROADMAPS
  });
}
