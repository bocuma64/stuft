import TonightClient from "@/components/TonightClient";
import { ensureTonight } from "@/lib/tonight";
import { calcStreak } from "@/lib/recommend";

export default async function HomePage() {
  const db = await ensureTonight();
  const tonight = db.tonight!;
  const byId = (id?: string) => db.contentItems.find((i) => i.id === id);
  const entries = db.nightEntries;
  const streak = calcStreak(entries.map((n) => n.date));
  const xp = entries.reduce((sum, n) => sum + n.xpEarned, 0);
  const dates = Array.from({ length: 7 }).map((_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - idx));
    const iso = d.toISOString().slice(0, 10);
    return { date: iso, done: entries.some((n) => n.date === iso) };
  });

  return (
    <TonightClient
      initial={{
        tonight,
        story: byId(tonight.storyId),
        paper: byId(tonight.paperId),
        bonus: byId(tonight.bonusId),
        streak,
        xp,
        dates,
        prefs: db.userPrefs
      }}
    />
  );
}
