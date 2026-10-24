import { NextRequest, NextResponse } from "next/server";
import { generateCareerRecommendations, DEFAULT_WEIGHTS } from "@/lib/recommendationEngine";
import { verifyAccessToken } from "@/lib/auth";
import { db } from "@/lib/db";
import { RIASECScore, User } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { scores, weights } = body;

    const riasecScores: RIASECScore = scores || { R: 6, I: 8, A: 6, S: 5, E: 7, C: 6 };

    // Identify user profile if logged in
    const token = req.cookies.get("pc_access_token")?.value;
    let userProfile: Partial<User> = { educationLevel: "12th", budget: "moderate" };

    if (token) {
      const payload = await verifyAccessToken(token);
      if (payload) {
        const found = db.users.get(payload.userId);
        if (found) {
          userProfile = found;
        }
      }
    }

    const recommendations = generateCareerRecommendations(userProfile, riasecScores, weights || DEFAULT_WEIGHTS);

    return NextResponse.json({
      success: true,
      totalRanked: recommendations.length,
      recommendations
    });
  } catch {
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 });
  }
}
