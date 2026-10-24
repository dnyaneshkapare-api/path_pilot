import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("pc_access_token")?.value ||
                req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ authenticated: false, user: null });
  }

  const payload = await verifyAccessToken(token);
  if (!payload) {
    return NextResponse.json({ authenticated: false, user: null });
  }

  const user = db.users.get(payload.userId);
  if (!user) {
    return NextResponse.json({ authenticated: false, user: null });
  }

  const { passwordHash: _, ...safeUser } = user;
  return NextResponse.json({ authenticated: true, user: safeUser });
}
