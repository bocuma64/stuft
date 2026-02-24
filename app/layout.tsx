import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "STUFT",
  description: "Nightly reading + connection ritual"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <main className="mx-auto max-w-5xl px-4 py-6">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-wide">STUFT</h1>
              <p className="text-sm text-stone-400">Story + paper + connection note, nightly.</p>
            </div>
            <nav className="flex gap-4 text-sm">
              <Link href="/" className="hover:text-teal-300">Tonight</Link>
              <Link href="/library" className="hover:text-teal-300">Library</Link>
              <Link href="/archive" className="hover:text-teal-300">Archive</Link>
            </nav>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
