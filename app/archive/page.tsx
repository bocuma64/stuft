import Link from "next/link";
import { loadDb } from "@/lib/db";

const badgeMilestones = [3, 7, 14];

export default async function ArchivePage() {
  const db = await loadDb();
  const byId = (id: string) => db.contentItems.find((item) => item.id === id);
  const analogyCount = db.nightEntries.filter((e) => e.noteTags.includes("analogy")).length;

  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="text-lg">Badges</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {badgeMilestones.map((m) => <span key={m} className={`rounded px-2 py-1 text-xs ${db.nightEntries.length >= m ? "bg-teal-700" : "bg-stone-700"}`}>{m} nights</span>)}
          <span className={`rounded px-2 py-1 text-xs ${analogyCount >= 5 ? "bg-fuchsia-700" : "bg-stone-700"}`}>5 analogy connections</span>
        </div>
      </div>
      {db.nightEntries.map((entry) => (
        <Link href={`/archive/${entry.id}`} key={entry.id} className="block card">
          <p className="text-sm text-stone-400">{entry.date}</p>
          <h3 className="font-medium">{byId(entry.storyId)?.title} + {byId(entry.paperId)?.title}</h3>
          <p className="text-sm line-clamp-2">{entry.noteText}</p>
          <div className="mt-2 flex gap-2">{entry.noteTags.map((tag) => <span key={tag} className="rounded bg-stone-800 px-2 py-1 text-xs">{tag}</span>)}</div>
        </Link>
      ))}
      {db.nightEntries.length === 0 && <div className="card text-stone-400">No nights logged yet.</div>}
    </div>
  );
}
