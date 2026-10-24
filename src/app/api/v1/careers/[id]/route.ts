import { NextRequest, NextResponse } from "next/server";
import { getCareerByIdOrSlug } from "@/data/careers";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const career = getCareerByIdOrSlug(id);

  if (!career) {
    return NextResponse.json({ error: "Career record not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    career
  });
}
