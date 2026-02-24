import { loadDb } from "@/lib/db";
import LibraryClient from "@/components/LibraryClient";

export default async function LibraryPage() {
  const db = await loadDb();
  return <LibraryClient items={db.contentItems} />;
}
