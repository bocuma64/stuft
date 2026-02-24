import { promises as fs } from "fs";
import path from "path";
import { initialDb } from "@/data/seed";
import { DbShape } from "@/lib/types";

const dbPath = path.join(process.cwd(), "data", "db.json");

export async function loadDb(): Promise<DbShape> {
  try {
    const raw = await fs.readFile(dbPath, "utf8");
    return JSON.parse(raw) as DbShape;
  } catch {
    const seeded = initialDb();
    await saveDb(seeded);
    return seeded;
  }
}

export async function saveDb(data: DbShape): Promise<void> {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf8");
}
