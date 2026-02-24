"use client";

import { useMemo, useState } from "react";

export default function LibraryClient({ items }: { items: any[] }) {
  const [type, setType] = useState("all");
  const [tag, setTag] = useState("");
  const [source, setSource] = useState("");
  const [maxMin, setMaxMin] = useState(45);
  const [form, setForm] = useState({ type: "story", title: "", author: "", year: 2020, url: "", tags: "", readingTimeMinutes: 10, blurb: "", difficulty: "", domain: "", source: "" });
  const [msg, setMsg] = useState("");

  const filtered = useMemo(() => items.filter((item) => (type === "all" || item.type === type) && (!tag || item.tags.includes(tag)) && (!source || (item.source || "").toLowerCase().includes(source.toLowerCase())) && item.readingTimeMinutes <= maxMin), [items, type, tag, source, maxMin]);

  async function addItem() {
    const payload = { ...form, year: Number(form.year), readingTimeMinutes: Number(form.readingTimeMinutes), difficulty: form.difficulty ? Number(form.difficulty) : undefined, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) };
    const res = await fetch("/api/library", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setMsg(res.ok ? "Added. Refresh to see it in list." : "Failed to add item");
  }

  return (
    <div className="space-y-4">
      <div className="card grid gap-2 md:grid-cols-4">
        <select className="rounded bg-stone-800 p-2" value={type} onChange={(e) => setType(e.target.value)}><option value="all">All</option><option value="story">Stories</option><option value="paper">Papers</option></select>
        <input className="rounded bg-stone-800 p-2" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="filter tag" />
        <input className="rounded bg-stone-800 p-2" value={source} onChange={(e) => setSource(e.target.value)} placeholder="filter source" />
        <input className="w-full" type="range" min={5} max={45} value={maxMin} onChange={(e) => setMaxMin(Number(e.target.value))} />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((item) => <div key={item.id} className="card"><p className="text-xs uppercase text-teal-300">{item.type}</p><h3>{item.title}</h3><p className="text-sm text-stone-400">{item.author} · {item.year} · {item.readingTimeMinutes}m</p><p className="text-sm">{item.blurb}</p><p className="mt-2 text-xs text-stone-400">{item.tags.join(", ")} {item.domain ? `· ${item.domain}` : ""}</p></div>)}
      </div>

      <div className="card space-y-2">
        <h2 className="text-lg">Add item</h2>
        <div className="grid gap-2 md:grid-cols-2">
          {Object.keys(form).map((k) => (
            k === "type" ? (
              <select key={k} className="rounded bg-stone-800 p-2" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option value="story">story</option><option value="paper">paper</option></select>
            ) : (
              <input key={k} className="rounded bg-stone-800 p-2" placeholder={k} value={(form as any)[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
            )
          ))}
        </div>
        <button className="rounded bg-teal-700 px-3 py-2" onClick={addItem}>Add item</button>
        {msg && <p className="text-sm text-teal-300">{msg}</p>}
      </div>
    </div>
  );
}
