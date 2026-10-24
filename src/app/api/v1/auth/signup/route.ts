import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, createAccessToken, createRefreshToken, checkRateLimit } from "@/lib/auth";
import { User } from "@/types";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "local-ip";
  const rateLimit = checkRateLimit(`auth-signup-${ip}`, 5, 60);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many registration attempts. Please wait before retrying." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter || 60) } }
    );
  }

  try {
    const body = await req.json();
    const { email, password, name, educationLevel, ageBand, hasParentalConsent } = body;

    // Validate email & password format
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 });
    }

    const existingUser = db.getUserByEmail(email.trim());
    if (existingUser) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    // Minors safety check (under 18 requires parental consent acknowledgment)
    if ((ageBand === "under_14" || ageBand === "14_17") && !hasParentalConsent) {
      return NextResponse.json(
        { error: "Parental consent acknowledgment is required for students under 18 under DPDP guidelines" },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);
    const newUserId = `u-${Date.now()}`;

    const newUser: User = {
      id: newUserId,
      email: email.trim().toLowerCase(),
      name: (name || "Aspiring Learner").slice(0, 50),
      role: "student",
      passwordHash,
      isEmailVerified: true, // Demo environment auto-verifies
      educationLevel: educationLevel || "exploring",
      ageBand: ageBand || "18_24",
      hasParentalConsent: Boolean(hasParentalConsent),
      interests: [],
      activities: [],
      learningStyle: "visual",
      budget: "moderate",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.users.set(newUser.id, newUser);

    // Initial activity log
    db.activityLogs.set(newUser.id, [
      {
        id: `act-${Date.now()}`,
        userId: newUser.id,
        type: "assessment",
        title: "Account Created",
        description: "Welcome to AI Career Discovery & Learning Platform",
        createdAt: new Date().toISOString()
      }
    ]);

    const tokenPayload = {
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role
    };

    const accessToken = await createAccessToken(tokenPayload);
    const refreshToken = await createRefreshToken(tokenPayload);

    const { passwordHash: _, ...safeUser } = newUser;

    const response = NextResponse.json({
      success: true,
      user: safeUser,
      accessToken
    });

    response.cookies.set("pc_access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60,
      path: "/"
    });

    response.cookies.set("pc_refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/"
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }
}
