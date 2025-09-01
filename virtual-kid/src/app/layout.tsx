import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Xiaojing Ji — Art & Code',
  description: 'Oil pastel artwork, writing, and projects by Xiaojing Ji.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
            <Link href="/" className="text-2xl font-extrabold tracking-tight">
              Xiaojing<span className="text-fuchsia-400">•</span>Ji
            </Link>

            <div className="ml-2 hidden md:flex items-center gap-2 text-sm">
              <Link href="/" className="rounded-xl px-3 py-1.5 bg-slate-800/70">Home</Link>
              <Link href="/gallery" className="rounded-xl px-3 py-1.5 hover:bg-slate-800/60">Gallery</Link>
              <Link href="/writing" className="rounded-xl px-3 py-1.5 hover:bg-slate-800/60">Archive</Link>
              <Link href="/about" className="rounded-xl px-3 py-1.5 hover:bg-slate-800/60">About</Link>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <button aria-label="Toggle theme" className="rounded-xl border border-white/10 bg-slate-800/50 px-2 py-1">
                🌙
              </button>
              <div className="hidden sm:block">
                <input
                  placeholder="Search posts..."
                  className="w-64 rounded-xl border border-white/10 bg-slate-800/70 px-3 py-1.5 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/60"
                />
              </div>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

        <footer className="mx-auto max-w-6xl px-4 py-12 text-sm text-slate-400">
          © {new Date().getFullYear()} Xiaojing Ji
        </footer>
      </body>
    </html>
  )
}
