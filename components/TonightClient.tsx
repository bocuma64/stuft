"use client";

import { useState } from "react";

const quickTags = ["theme", "method", "metaphor", "contradiction", "analogy", "application"];
const prompts = [
  "What do they have in common?",
  "Where do they disagree?",
  "What metaphor from the story explains the paper?",
  "What real-world application does the paper suggest for the story's world (or vice versa)?"
];

export default function TonightClient({ initial }: { initial: any }) {
  const [data, setData] = useState(initial);
  const [noteText, setNoteText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [storyRead, setStoryRead] = useState(false);
  const [paperRead, setPaperRead] = useState(false);
  const [msg, setMsg] = useState("");
  const [prefs, setPrefs] = useState({
    interestTags: data.prefs.interestTags.join(", "),
    serendipityLevel: data.prefs.serendipityLevel,
    readingTimeTarget: data.prefs.readingTimeTarget
  });

  const reload = async () => {
    const res = await fetch("/api/tonight");
    setData(await res.json());
  };

  async function savePrefs() {
    await fetch("/api/prefs", { method: "POST", body: JSON.stringify({
      interestTags: prefs.interestTags.split(",").map((t) => t.trim()).filter(Boolean),
      serendipityLevel: prefs.serendipityLevel,
      readingTimeTarget: prefs.readingTimeTarget
    })});
    await reload();
  }

  async function logNight() {
    const res = await fetch("/api/note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noteText, noteTags: selectedTags, storyRead, paperRead })
    });
    const json = await res.json();
    setMsg(res.ok ? `Logged! +${json.entry.xpEarned} XP` : json.message);
    await reload();
  }

  async function shuffle() {
    const res = await fetch("/api/shuffle", { method: "POST" });
    const json = await res.json();
    setMsg(res.ok ? "Shuffled tonight's pair." : json.message);
    await reload();
  }

  const card = (item: any, read: boolean, setRead: (v: boolean) => void) => (
    <div className="card space-y-2">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase text-teal-300">{item.type}</p>
          <h3 className="text-lg font-medium">{item.title}</h3>
          <p className="text-sm text-stone-400">{item.author} · {item.year} · {item.readingTimeMinutes} min</p>
        </div>
        <button className={`rounded px-2 py-1 text-xs ${read ? "bg-green-700" : "bg-stone-700"}`} onClick={() => setRead(!read)}>
          {read ? "Read ✓" : "Mark read"}
        </button>
      </div>
      <p className="text-sm text-stone-300">{item.blurb}</p>
      <div className="flex flex-wrap gap-2">{item.tags.map((t: string) => <span key={t} className="rounded bg-stone-800 px-2 py-1 text-xs">{t}</span>)}</div>
      <a className="inline-block rounded bg-teal-700 px-3 py-1 text-sm" href={item.url} target="_blank">Open link</a>
    </div>
  );

  return (
    <div className="space-y-4">
      {!data.prefs.onboardingDone && (
        <div className="card border-teal-700">
          <h2 className="mb-2 text-lg">Set your ritual preferences</h2>
          <div className="grid gap-2 md:grid-cols-3">
            <input className="rounded bg-stone-800 p-2 text-sm" value={prefs.interestTags} onChange={(e) => setPrefs({ ...prefs, interestTags: e.target.value })} placeholder="interest tags, comma separated" />
            <select className="rounded bg-stone-800 p-2 text-sm" value={prefs.serendipityLevel} onChange={(e) => setPrefs({ ...prefs, serendipityLevel: e.target.value })}>
              <option value="low">Low serendipity</option><option value="med">Medium</option><option value="high">High</option>
            </select>
            <select className="rounded bg-stone-800 p-2 text-sm" value={prefs.readingTimeTarget} onChange={(e) => setPrefs({ ...prefs, readingTimeTarget: e.target.value })}>
              <option value="5-15">5-15m</option><option value="10-30">10-30m</option><option value="20-40">20-40m</option>
            </select>
          </div>
          <button className="mt-2 rounded bg-teal-700 px-3 py-1" onClick={savePrefs}>Start tonight</button>
        </div>
      )}

      <div className="card">
        <h2 className="text-xl font-semibold">Tonight's Pair</h2>
        <p className="text-sm text-stone-400">{data.tonight.explanation}</p>
        <p className="mt-1 text-xs text-stone-500">Shuffles used: {data.tonight.shuffleCount}/2</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {card(data.story, storyRead, setStoryRead)}
        {card(data.paper, paperRead, setPaperRead)}
      </div>
      {data.bonus && <div className="card"><p className="text-xs uppercase text-fuchsia-300">Left-field bonus</p>{card(data.bonus, false, () => undefined)}</div>}

      <div className="card space-y-3">
        <h3 className="text-lg">Connection Note</h3>
        <div className="text-sm text-stone-400">{prompts.map((p) => <p key={p}>• {p}</p>)}</div>
        <textarea className="min-h-32 w-full rounded bg-stone-800 p-3" placeholder="What’s the connection? (2–6 sentences)" value={noteText} onChange={(e) => setNoteText(e.target.value)} />
        <div className="flex flex-wrap gap-2">{quickTags.map((t) => <button key={t} className={`rounded px-2 py-1 text-xs ${selectedTags.includes(t) ? "bg-teal-700" : "bg-stone-700"}`} onClick={() => setSelectedTags((s) => s.includes(t) ? s.filter((x) => x !== t) : [...s, t])}>{t}</button>)}</div>
        <div className="flex gap-2">
          <button className="rounded bg-teal-700 px-3 py-2" onClick={logNight}>Log tonight</button>
          <button className="rounded bg-stone-700 px-3 py-2" onClick={shuffle}>Shuffle</button>
        </div>
        {msg && <p className="text-sm text-teal-300">{msg}</p>}
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="card"><p className="text-sm text-stone-400">Current streak</p><p className="text-2xl">{data.streak} nights</p></div>
        <div className="card"><p className="text-sm text-stone-400">XP</p><p className="text-2xl">{data.xp}</p></div>
        <div className="card"><p className="text-sm text-stone-400">Last 7 nights</p><div className="mt-2 flex gap-1">{data.dates.map((d: any) => <span key={d.date} className={`h-4 w-4 rounded-full ${d.done ? "bg-teal-400" : "bg-stone-700"}`} title={d.date} />)}</div></div>
      </div>
    </div>
  );
}
