import { NextResponse } from "next/server";
import { shuffleTonight } from "@/lib/tonight";

export async function POST() {
  const result = await shuffleTonight();
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
