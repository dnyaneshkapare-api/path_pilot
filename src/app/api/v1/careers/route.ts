import { NextRequest, NextResponse } from "next/server";
import { VERIFIED_CAREERS } from "@/data/careers";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cluster = searchParams.get("cluster");
  const demand = searchParams.get("demand");
  const query = searchParams.get("q")?.toLowerCase();

  let filtered = [...VERIFIED_CAREERS];

  if (cluster && cluster !== "all") {
    filtered = filtered.filter(c => c.cluster.toLowerCase() === cluster.toLowerCase());
  }

  if (demand && demand !== "all") {
    filtered = filtered.filter(c => c.demandLevel.toLowerCase() === demand.toLowerCase());
  }

  if (query) {
    filtered = filtered.filter(c =>
      c.title.toLowerCase().includes(query) ||
      c.overview.toLowerCase().includes(query) ||
      c.keySkills.some(k => k.toLowerCase().includes(query)) ||
      c.sectors.some(s => s.toLowerCase().includes(query))
    );
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    careers: filtered
  });
}
