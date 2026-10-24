import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/auth";
import { VERIFIED_CAREERS } from "@/data/careers";

export async function POST(req: NextRequest) {
  // Strict Rate Limiting for AI/LLM endpoints: Checklist Item 8
  const ip = req.headers.get("x-forwarded-for") || "local-ip";
  const rateLimit = checkRateLimit(`mentor-chat-${ip}`, 15, 60);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "AI Mentor is currently processing high volume. Please wait before asking another question." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter || 60) } }
    );
  }

  try {
    const body = await req.json();
    const { message, contextCareerId } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message content is required" }, { status: 400 });
    }

    const cleanInput = message.trim().slice(0, 1000);
    const lower = cleanInput.toLowerCase();

    // Check if query is about education/career guidance
    // The prompt requires: "limited to education and career guidance, grounded in approved records, never pushes paid courses"
    const allowedTopics = ["career", "study", "job", "salary", "course", "college", "future", "degree", "stream", "science", "commerce", "arts", "engineering", "medical", "design", "law", "skill", "exam", "ai", "roadmap"];
    const isRelevant = allowedTopics.some(t => lower.includes(t)) || lower.length < 40;

    if (!isRelevant) {
      return NextResponse.json({
        success: true,
        reply: "As the AI Career Mentor, I specialize exclusively in education guidance, skill roadmaps, and career planning grounded in verified government data. How can I help you explore your studies or target careers today?",
        groundedCareers: []
      });
    }

    // Match grounded career from our verified dataset
    let matchedCareer = VERIFIED_CAREERS[0];
    if (contextCareerId) {
      const found = VERIFIED_CAREERS.find(c => c.id === contextCareerId);
      if (found) matchedCareer = found;
    } else {
      const match = VERIFIED_CAREERS.find(c =>
        lower.includes(c.title.toLowerCase()) ||
        c.keySkills.some(k => lower.includes(k.toLowerCase())) ||
        c.sectors.some(s => lower.includes(s.toLowerCase()))
      );
      if (match) matchedCareer = match;
    }

    // Grounded response synthesis
    let responseText = "";
    if (lower.includes("salary") || lower.includes("earn") || lower.includes("pay") || lower.includes("package")) {
      responseText = `Based on verified official data from **${matchedCareer.salaryRangeINR.source}** (Verified: ${matchedCareer.salaryRangeINR.verifiedDate}) for ${matchedCareer.title}:\n\n` +
        `• **Starting Range**: ₹${(matchedCareer.salaryRangeINR.startingPerAnnum / 100000).toFixed(1)} Lakhs / year\n` +
        `• **Mid-Career Range**: ₹${(matchedCareer.salaryRangeINR.midCareerPerAnnum / 100000).toFixed(1)} Lakhs / year\n` +
        `• **Senior Specialists**: ₹${(matchedCareer.salaryRangeINR.seniorPerAnnum / 100000).toFixed(1)} Lakhs / year\n\n` +
        `*Note: Exact compensation depends on verified portfolio work, company scale, and location. Our platform never invents figures.*`;
    } else if (lower.includes("eligib") || lower.includes("10th") || lower.includes("12th") || lower.includes("exam")) {
      responseText = `For entering **${matchedCareer.title}**:\n\n` +
        `• **Minimum Formal Milestone**: ${matchedCareer.eligibility.minEducation.toUpperCase()}\n` +
        `• **Common Pathways**: ${matchedCareer.entryRoutes.join(" OR ")}\n` +
        `• **Recommended Entrance/Exams**: ${matchedCareer.eligibility.entranceExams ? matchedCareer.eligibility.entranceExams.join(", ") : "Direct merit or accredited aptitude evaluation"}\n\n` +
        `You can start building foundational projects regardless of your stream!`;
    } else if (lower.includes("course") || lower.includes("learn") || lower.includes("free")) {
      responseText = `To build competence in **${matchedCareer.title}**, we recommend starting with reputable free public courseware such as:\n\n` +
        `1. **NPTEL / Swayam** (IITs & IISc certified high-quality academic tracks)\n` +
        `2. **freeCodeCamp & Open Courseware** for hands-on portfolio milestones\n\n` +
        `*Important: Path Copilot never advertises or pushes expensive commercial coaching.* Check out the structured Level 0 to Level 3 roadmap in our Roadmap tab!`;
    } else {
      responseText = `Regarding **${matchedCareer.title}**:\n\n` +
        `• **Sector Focus**: ${matchedCareer.sectors.slice(0, 3).join(", ")}\n` +
        `• **Demand Trajectory**: ${matchedCareer.demandLevel} (Evidence level: ${matchedCareer.evidenceLevel.toUpperCase()})\n` +
        `• **Core Competencies**: ${matchedCareer.keySkills.slice(0, 4).join(", ")}\n\n` +
        `Would you like to review the step-by-step Level 0-3 roadmap or explore related career alternatives?`;
    }

    return NextResponse.json({
      success: true,
      reply: responseText,
      groundedCareers: [matchedCareer.title]
    });
  } catch {
    return NextResponse.json({ error: "Failed to generate mentor guidance" }, { status: 500 });
  }
}
