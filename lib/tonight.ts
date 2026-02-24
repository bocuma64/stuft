import { loadDb, saveDb } from "@/lib/db";
import { buildTonight, calcStreak } from "@/lib/recommend";
import { NightEntry } from "@/lib/types";

const today = () => new Date().toISOString().slice(0, 10);

export async function ensureTonight() {
  const db = await loadDb();
  if (!db.tonight || db.tonight.date !== today()) {
    const picked = buildTonight(db);
    db.tonight = {
      date: today(),
      storyId: picked.story.id,
      paperId: picked.paper.id,
      bonusId: picked.bonus?.id,
      explanation: picked.explanation,
      shuffleCount: 0
    };
    await saveDb(db);
  }
  return db;
}

export async function logNight(payload: { noteText: string; noteTags: string[]; storyRead: boolean; paperRead: boolean }) {
  const db = await ensureTonight();
  const tonight = db.tonight!;
  const xpBase = 10 + Math.min(payload.noteTags.length, 3) * 5 + (payload.noteText.length > 200 ? 10 : 0);

  const entry: NightEntry = {
    id: crypto.randomUUID(),
    date: today(),
    storyId: tonight.storyId,
    paperId: tonight.paperId,
    bonusId: tonight.bonusId,
    storyRead: payload.storyRead,
    paperRead: payload.paperRead,
    noteText: payload.noteText,
    noteTags: payload.noteTags,
    xpEarned: xpBase
  };
  db.nightEntries = [entry, ...db.nightEntries.filter((n) => n.date !== today())];
  await saveDb(db);

  const streak = calcStreak(db.nightEntries.map((n) => n.date));
  const xp = db.nightEntries.reduce((sum, n) => sum + n.xpEarned, 0);
  return { entry, streak, xp };
}

export async function shuffleTonight() {
  const db = await ensureTonight();
  if (!db.tonight) return { ok: false, message: "No tonight state" };
  if (db.tonight.shuffleCount >= 2) return { ok: false, message: "Shuffle limit reached for tonight" };

  const picked = buildTonight(db);
  db.tonight = {
    date: today(),
    storyId: picked.story.id,
    paperId: picked.paper.id,
    bonusId: picked.bonus?.id,
    explanation: picked.explanation,
    shuffleCount: db.tonight.shuffleCount + 1
  };
  await saveDb(db);
  return { ok: true };
}
