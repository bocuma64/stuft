import { ContentItem, DbShape } from "@/lib/types";

export const defaultPrefs = {
  interestTags: ["creativity", "memory"],
  serendipityLevel: "med",
  readingTimeTarget: "10-30",
  onboardingDone: false
} as const;

export const seedItems: ContentItem[] = [
  { id: "s1", type: "story", title: "The Veldt", author: "Ray Bradbury", year: 1950, url: "https://www.raybradbury.com/", tags: ["technology", "family", "ethics"], readingTimeMinutes: 20, blurb: "A smart nursery turns uncanny as children retreat into simulated reality.", source: "Ray Bradbury site (placeholder)" },
  { id: "s2", type: "story", title: "The Yellow Wallpaper", author: "Charlotte Perkins Gilman", year: 1892, url: "https://www.gutenberg.org/ebooks/1952", tags: ["mental-health", "perception", "power"], readingTimeMinutes: 18, blurb: "A diary-style descent into obsession under restrictive care.", source: "Project Gutenberg" },
  { id: "s3", type: "story", title: "The Lottery", author: "Shirley Jackson", year: 1948, url: "https://www.newyorker.com/magazine/1948/06/26/the-lottery", tags: ["ritual", "conformity", "violence"], readingTimeMinutes: 15, blurb: "A small town ritual reveals the cruelty of unquestioned tradition.", source: "The New Yorker" },
  { id: "s4", type: "story", title: "An Occurrence at Owl Creek Bridge", author: "Ambrose Bierce", year: 1890, url: "https://www.gutenberg.org/ebooks/375", tags: ["time", "perception", "war"], readingTimeMinutes: 12, blurb: "A condemned man experiences a reality-bending final moment.", source: "Project Gutenberg" },
  { id: "s5", type: "story", title: "The Machine Stops", author: "E. M. Forster", year: 1909, url: "https://www.gutenberg.org/ebooks/1734", tags: ["technology", "isolation", "systems"], readingTimeMinutes: 35, blurb: "Humanity depends on a total system that eventually fails.", source: "Project Gutenberg" },
  { id: "s6", type: "story", title: "The Ones Who Walk Away from Omelas", author: "Ursula K. Le Guin", year: 1973, url: "https://shsdavisapes.pbworks.com/f/Omelas.pdf", tags: ["ethics", "utopia", "tradeoffs"], readingTimeMinutes: 10, blurb: "A utopia's joy rests on one hidden suffering child.", source: "PDF mirror (placeholder)" },
  { id: "s7", type: "story", title: "A Sound of Thunder", author: "Ray Bradbury", year: 1952, url: "https://www.raybradbury.com/", tags: ["time", "chaos", "consequences"], readingTimeMinutes: 14, blurb: "A butterfly and a safari trigger catastrophic timeline change.", source: "Ray Bradbury site (placeholder)" },
  { id: "s8", type: "story", title: "The Tell-Tale Heart", author: "Edgar Allan Poe", year: 1843, url: "https://www.gutenberg.org/ebooks/2148", tags: ["guilt", "perception", "unreliable-narrator"], readingTimeMinutes: 9, blurb: "A murderer insists on sanity while unraveling in confession.", source: "Project Gutenberg" },
  { id: "s9", type: "story", title: "The Garden of Forking Paths", author: "Jorge Luis Borges", year: 1941, url: "https://archive.org/details/FiccionesJorgeLuisBorges", tags: ["time", "possibility", "narrative"], readingTimeMinutes: 16, blurb: "A spy story folds into an infinite-branching theory of time.", source: "Archive.org" },
  { id: "s10", type: "story", title: "Exhalation", author: "Ted Chiang", year: 2008, url: "https://www.lightspeedmagazine.com/fiction/exhalation/", tags: ["entropy", "mind", "science"], readingTimeMinutes: 28, blurb: "A mechanical civilization studies consciousness and thermodynamic fate.", source: "Lightspeed Magazine" },
  { id: "p1", type: "paper", title: "As We May Think", author: "Vannevar Bush", year: 1945, url: "https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/", tags: ["memory", "knowledge", "interfaces"], readingTimeMinutes: 25, blurb: "Visionary essay proposing associative knowledge systems.", domain: "HCI", source: "The Atlantic" },
  { id: "p2", type: "paper", title: "The Magical Number Seven, Plus or Minus Two", author: "George A. Miller", year: 1956, url: "https://psychclassics.yorku.ca/Miller/", tags: ["memory", "cognition", "limits"], readingTimeMinutes: 20, blurb: "Classic cognitive psychology paper on channel capacity.", domain: "Cog Sci", source: "Psych Classics" },
  { id: "p3", type: "paper", title: "Situated Actions", author: "Lucy Suchman", year: 1987, url: "https://dl.acm.org/doi/book/10.5555/567272", tags: ["context", "interaction", "method"], readingTimeMinutes: 30, blurb: "Plans are less predictive than context-rich action in practice.", domain: "HCI", source: "ACM (placeholder)" },
  { id: "p4", type: "paper", title: "Cognitive Dimensions of Notations", author: "Thomas Green", year: 1989, url: "https://www.cl.cam.ac.uk/~afb21/CognitiveDimensions/CDbibliography.html", tags: ["design", "notation", "usability"], readingTimeMinutes: 18, blurb: "Framework to analyze representation tradeoffs.", domain: "Design", source: "Cambridge" },
  { id: "p5", type: "paper", title: "The Design of Everyday Things (excerpt)", author: "Don Norman", year: 1988, url: "https://jnd.org/the-design-of-everyday-things-revised-and-expanded-edition/", tags: ["design", "affordance", "error"], readingTimeMinutes: 12, blurb: "How affordances and feedback shape human error.", domain: "Design", source: "jnd.org" },
  { id: "p6", type: "paper", title: "Desirable Difficulties in Learning", author: "Robert A. Bjork", year: 1994, url: "https://bjorklab.psych.ucla.edu/research/", tags: ["learning", "memory", "difficulty"], readingTimeMinutes: 14, blurb: "Learning strengthens when retrieval is effortful.", domain: "Learning Sciences", source: "UCLA (placeholder)" },
  { id: "p7", type: "paper", title: "Computing Machinery and Intelligence", author: "Alan Turing", year: 1950, url: "https://www.csee.umbc.edu/courses/471/papers/turing.pdf", tags: ["ai", "language", "philosophy"], readingTimeMinutes: 35, blurb: "Foundational argument for machine intelligence via imitation game.", domain: "ML", source: "PDF mirror" },
  { id: "p8", type: "paper", title: "A Mathematician's Lament", author: "Paul Lockhart", year: 2002, url: "https://www.maa.org/external_archive/devlin/LockhartsLament.pdf", tags: ["education", "creativity", "systems"], readingTimeMinutes: 22, blurb: "Essay critiquing procedural math education.", domain: "Learning Sciences", source: "MAA" },
  { id: "p9", type: "paper", title: "No Silver Bullet", author: "Fred Brooks", year: 1986, url: "https://worrydream.com/refs/Brooks-NoSilverBullet.pdf", tags: ["software", "complexity", "limits"], readingTimeMinutes: 17, blurb: "Why software productivity has no single transformative fix.", domain: "Software", source: "PDF mirror" },
  { id: "p10", type: "paper", title: "The Use of Knowledge in Society", author: "Friedrich Hayek", year: 1945, url: "https://www.econlib.org/library/Essays/hykKnw.html", tags: ["systems", "coordination", "knowledge"], readingTimeMinutes: 24, blurb: "Distributed knowledge demands decentralized decision mechanisms.", domain: "Economics", source: "Econlib" }
];

export const initialDb = (): DbShape => ({
  contentItems: seedItems,
  nightEntries: [],
  userPrefs: { ...defaultPrefs },
  tonight: null
});
