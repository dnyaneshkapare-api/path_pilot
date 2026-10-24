import { NextRequest, NextResponse } from "next/server";
import { VERIFIED_EXPERTS } from "@/data/experts";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const specialization = searchParams.get("specialization");

  let experts = [...VERIFIED_EXPERTS];
  if (specialization && specialization !== "all") {
    experts = experts.filter(e => e.specialization.toLowerCase() === specialization.toLowerCase());
  }

  // Include current available slot counts
  const expertsWithSlots = experts.map(exp => {
    const slots = Array.from(db.slots.values()).filter(s => s.expertId === exp.id && !s.isBooked);
    return {
      ...exp,
      availableSlotsCount: slots.length
    };
  });

  return NextResponse.json({
    success: true,
    total: expertsWithSlots.length,
    experts: expertsWithSlots
  });
}
