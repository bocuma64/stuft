import Link from "next/link";
import { loadDb } from "@/lib/db";
import { inferRelatedNights } from "@/lib/recommend";

export default async function ArchiveDetail({ params }: { params: { id: string } }) {
  const db = await loadDb();
  const entry = db.nightEntries.find((n) => n.id === params.id);
  if (!entry) return <div className="card">Entry not found.</div>;
  const find = (id: string) => db.contentItems.find((i) => i.id === id);
  const related = inferRelatedNights(db, entry.id);

  return (
    <div className="space-y-4">
      <Link href="/archive" className="text-sm text-teal-300">← Back to archive</Link>
      <div className="card">
        <p className="text-sm text-stone-400">{entry.date}</p>
        <h2 className="text-xl">{find(entry.storyId)?.title} + {find(entry.paperId)?.title}</h2>
        <p className="mt-3 whitespace-pre-wrap">{entry.noteText}</p>
      </div>
      <div className="card">
        <h3 className="mb-2">Connection graph-ish</h3>
        <div className="mb-3 flex flex-wrap gap-2">{entry.noteTags.map((tag) => <span key={tag} className="rounded-full bg-teal-800 px-3 py-1 text-xs">{tag}</span>)}</div>
        <h4 className="text-sm text-stone-400">Related nights</h4>
        <div className="mt-2 space-y-2">
          {related.map((r) => <Link className="block rounded bg-stone-800 p-2 text-sm" key={r.entry.id} href={`/archive/${r.entry.id}`}>{r.entry.date} · shared tags: {r.overlap}</Link>)}
          {related.length === 0 && <p className="text-sm text-stone-500">No related nights yet.</p>}
        </div>
      </div>
    </div>
  );
}
