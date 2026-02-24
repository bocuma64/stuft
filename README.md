# STUFT MVP

STUFT is a nightly ritual app inspired by Ray Bradbury's "read wildly, then connect ideas" practice.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- Local JSON persistence (`data/db.json`) for speed

## Run
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Routes
- `/` Tonight ritual flow
- `/library` Content catalog + filters + add item form
- `/archive` Logged nights + badge strip
- `/archive/[id]` Entry detail with tag-link "graph-ish" view + related nights

## Seed data
- File: `data/seed.ts`
- Includes 20+ items (10 stories, 10 papers/essays across HCI, cog sci, design, learning sciences, software, economics).

## Persistence model
Saved in `data/db.json` with:
- `ContentItem`
- `NightEntry`
- `UserPrefs`
- `TonightState`

Core type definitions: `lib/types.ts`.

## Recommendation logic (deterministic/simple)
Location: `lib/recommend.ts`
1. Pull user interests + serendipity level + time target.
2. Pick one unread-recent story and paper sorted by tag overlap then shorter read time.
3. Pick left-field bonus with no overlapping tags or distant domain (more frequent at medium/high serendipity).
4. Prefer a shorter bonus near target range to reduce friction.
5. Emit explanation string for why the pair was chosen.

Shuffle is limited to 2/night (`lib/tonight.ts`).

## XP / streak / badges
- Streak: consecutive local dates with entry logged.
- XP per log:
  - +10 base
  - +5/tag used (cap 3)
  - +10 if note > 200 chars
- Badges:
  - 3 / 7 / 14 nights
  - 5 notes tagged `analogy`

## Next steps for real integrations
- Crossref / Semantic Scholar / arXiv for papers
- Project Gutenberg + public magazine APIs for stories
- Add auth (NextAuth/Clerk) and per-user db rows
- Move persistence to Prisma + SQLite/Postgres
- Add richer graph visualization and recommendation tuning
