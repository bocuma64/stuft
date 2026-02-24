import { NextRequest, NextResponse } from "next/server";
import { loadDb, saveDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const db = await loadDb();
  db.userPrefs = { ...db.userPrefs, ...body, onboardingDone: true };
  db.tonight = null;
  await saveDb(db);
  return NextResponse.json({ ok: true });
}
