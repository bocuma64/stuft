import { NextResponse } from "next/server";
import { ensureTonight } from "@/lib/tonight";
import { calcStreak } from "@/lib/recommend";

export async function GET() {
  const db = await ensureTonight();
  const tonight = db.tonight!;
  const find = (id?: string) => db.contentItems.find((i) => i.id === id);
  const entries = db.nightEntries;
  const streak = calcStreak(entries.map((n) => n.date));
  const xp = entries.reduce((sum, n) => sum + n.xpEarned, 0);
  const dates = Array.from({ length: 7 }).map((_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - idx));
    const iso = d.toISOString().slice(0, 10);
    return { date: iso, done: entries.some((n) => n.date === iso) };
  });

  return NextResponse.json({
    tonight,
    story: find(tonight.storyId),
    paper: find(tonight.paperId),
    bonus: find(tonight.bonusId),
    streak,
    xp,
    dates,
    prefs: db.userPrefs
  });
}
