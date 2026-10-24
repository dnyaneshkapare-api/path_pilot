import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, comparePassword, createAccessToken, createRefreshToken, checkRateLimit } from "@/lib/auth";
import { User } from "@/types";

export async function POST(req: NextRequest) {
  // Rate limiting check: Checklist Item 8
  const ip = req.headers.get("x-forwarded-for") || "local-ip";
  const rateLimit = checkRateLimit(`auth-login-${ip}`, 10, 60);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many login attempts. Please wait before retrying." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter || 60) } }
    );
  }

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Invalid email or password format" }, { status: 400 });
    }

    const user = db.getUserByEmail(email.trim());
    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate tokens
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    const accessToken = await createAccessToken(tokenPayload);
    const refreshToken = await createRefreshToken(tokenPayload);

    // Sanitized user profile without password hash
    const { passwordHash: _, ...safeUser } = user;

    const response = NextResponse.json({
      success: true,
      user: safeUser,
      accessToken
    });

    // Set secure HttpOnly cookies: Checklist Item 4
    response.cookies.set("pc_access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60, // 15 mins
      path: "/"
    });

    response.cookies.set("pc_refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/"
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Authentication processing error" }, { status: 500 });
  }
}
