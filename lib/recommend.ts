import { ContentItem, DbShape, SerendipityLevel } from "@/lib/types";

const pickFirst = (items: ContentItem[]) => items[0];

const intersects = (a: string[], b: string[]) => a.some((tag) => b.includes(tag));

function tagScore(item: ContentItem, tags: string[]) {
  return item.tags.filter((t) => tags.includes(t)).length;
}

function recentIds(db: DbShape, days = 5) {
  const recent = db.nightEntries.slice(-days);
  return new Set(recent.flatMap((n) => [n.storyId, n.paperId, n.bonusId].filter(Boolean) as string[]));
}

export function buildTonight(db: DbShape) {
  const { interestTags, serendipityLevel, readingTimeTarget } = db.userPrefs;
  const [minT, maxT] = readingTimeTarget.split("-").map(Number);
  const recent = recentIds(db);

  const baseStoryPool = db.contentItems
    .filter((item) => item.type === "story" && !recent.has(item.id))
    .sort((a, b) => tagScore(b, interestTags) - tagScore(a, interestTags) || a.readingTimeMinutes - b.readingTimeMinutes);
  const basePaperPool = db.contentItems
    .filter((item) => item.type === "paper" && !recent.has(item.id))
    .sort((a, b) => tagScore(b, interestTags) - tagScore(a, interestTags) || a.readingTimeMinutes - b.readingTimeMinutes);

  const story = pickFirst(baseStoryPool) ?? db.contentItems.find((i) => i.type === "story")!;
  const paper = pickFirst(basePaperPool) ?? db.contentItems.find((i) => i.type === "paper")!;

  const leftFieldChance: Record<SerendipityLevel, number> = { low: 0.35, med: 0.65, high: 1 };
  const shouldUseDistant = leftFieldChance[serendipityLevel] >= 0.65 || db.nightEntries.length % 2 === 0;

  const usedTags = [...story.tags, ...paper.tags];
  const bonusPool = db.contentItems
    .filter((item) => item.id !== story.id && item.id !== paper.id && !recent.has(item.id))
    .filter((item) => {
      const noOverlap = !intersects(item.tags, usedTags);
      const distantDomain = item.domain && paper.domain && item.domain !== paper.domain;
      return shouldUseDistant ? noOverlap || Boolean(distantDomain) : true;
    })
    .sort((a, b) => {
      const shortBiasA = a.readingTimeMinutes >= minT && a.readingTimeMinutes <= maxT ? -1 : 0;
      const shortBiasB = b.readingTimeMinutes >= minT && b.readingTimeMinutes <= maxT ? -1 : 0;
      return shortBiasA - shortBiasB || a.readingTimeMinutes - b.readingTimeMinutes;
    });

  const bonus = pickFirst(bonusPool);
  const liked = [story, paper]
    .flatMap((item) => item.tags)
    .filter((tag, idx, arr) => interestTags.includes(tag) && arr.indexOf(tag) === idx)
    .slice(0, 2);

  const explanation = `Picked because you like: ${liked.join(", ") || interestTags.slice(0, 2).join(", ")}. Left-field pick: ${bonus?.title ?? "none"} (${bonus?.domain ?? "different lens"}) to spark new connections.`;

  return { story, paper, bonus, explanation };
}

export function calcStreak(dates: string[]) {
  const set = new Set(dates);
  let streak = 0;
  const cursor = new Date();
  while (true) {
    const iso = cursor.toISOString().slice(0, 10);
    if (set.has(iso)) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export function inferRelatedNights(db: DbShape, entryId: string) {
  const entry = db.nightEntries.find((n) => n.id === entryId);
  if (!entry) return [];
  return db.nightEntries
    .filter((n) => n.id !== entry.id)
    .map((n) => ({
      entry: n,
      overlap: n.noteTags.filter((tag) => entry.noteTags.includes(tag)).length
    }))
    .filter((item) => item.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 4);
}
