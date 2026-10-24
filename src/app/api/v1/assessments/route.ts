import { NextRequest, NextResponse } from "next/server";
import { RIASEC_ASSESSMENT_QUESTIONS, ASSESSMENT_VERSION } from "@/data/assessmentQuestions";
import { verifyAccessToken } from "@/lib/auth";
import { db } from "@/lib/db";
import { RIASECScore } from "@/types";

export async function GET() {
  return NextResponse.json({
    version: ASSESSMENT_VERSION,
    totalQuestions: RIASEC_ASSESSMENT_QUESTIONS.length,
    questions: RIASEC_ASSESSMENT_QUESTIONS
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { answers } = body; // map of questionId -> number (1-5)

    if (!answers || typeof answers !== "object") {
      return NextResponse.json({ error: "Answers payload is required" }, { status: 400 });
    }

    // Tally RIASEC scores
    const scores: RIASECScore = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    const counts = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

    for (const q of RIASEC_ASSESSMENT_QUESTIONS) {
      const val = Number(answers[q.id]) || 3; // neutral default if skipped
      scores[q.dimension] += val;
      counts[q.dimension] += 1;
    }

    // Normalize each dimension to a 0-10 scale
    for (const key of Object.keys(scores) as (keyof RIASECScore)[]) {
      const maxPossible = counts[key] * 5;
      scores[key] = Math.round((scores[key] / maxPossible) * 10);
    }

    // Calculate Primary RIASEC Code (top 3 highest dimensions)
    const sorted = (Object.keys(scores) as (keyof RIASECScore)[]).sort((a, b) => scores[b] - scores[a]);
    const primaryCode = `${sorted[0]}${sorted[1]}${sorted[2]}`;

    // Associate with user if logged in
    const token = req.cookies.get("pc_access_token")?.value;
    let userId = "guest-session";
    if (token) {
      const payload = await verifyAccessToken(token);
      if (payload) {
        userId = payload.userId;
        const assessmentRecord = {
          id: `asmt-${Date.now()}`,
          userId,
          version: ASSESSMENT_VERSION,
          scores,
          primaryCode,
          answers,
          completedAt: new Date().toISOString()
        };

        const existing = db.assessments.get(userId) || [];
        existing.unshift(assessmentRecord);
        db.assessments.set(userId, existing);

        // Append to activity log
        const logs = db.activityLogs.get(userId) || [];
        logs.unshift({
          id: `act-${Date.now()}`,
          userId,
          type: "assessment",
          title: "Completed RIASEC Assessment",
          description: `Assessed primary code ${primaryCode} under version ${ASSESSMENT_VERSION}`,
          refId: assessmentRecord.id,
          createdAt: new Date().toISOString()
        });
        db.activityLogs.set(userId, logs);
      }
    }

    return NextResponse.json({
      success: true,
      version: ASSESSMENT_VERSION,
      scores,
      primaryCode,
      saved: userId !== "guest-session"
    });
  } catch {
    return NextResponse.json({ error: "Failed to evaluate assessment" }, { status: 500 });
  }
}
