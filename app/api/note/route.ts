import { NextRequest, NextResponse } from "next/server";
import { logNight } from "@/lib/tonight";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.noteText || body.noteText.length < 30) {
    return NextResponse.json({ message: "Write at least 2-6 sentences." }, { status: 400 });
  }
  const result = await logNight(body);
  return NextResponse.json(result);
}
