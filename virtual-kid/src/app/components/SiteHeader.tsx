'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/writing', label: 'Archive' },
  { href: '/about', label: 'About' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // close menu on route change & lock body scroll when open
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', open);
    return () => document.body.classList.remove('overflow-hidden');
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          Xiaojing<span className="text-fuchsia-400">•</span>Ji
        </Link>

        {/* Desktop nav */}
        <div className="ml-2 hidden md:flex items-center gap-2 text-sm">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-xl px-3 py-1.5 hover:bg-slate-800/60 ${
                pathname === l.href ? 'bg-slate-800/70' : ''
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button aria-label="Toggle theme" className="hidden sm:inline rounded-xl border border-white/10 bg-slate-800/50 px-2 py-1">
            🌙
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden rounded-xl border border-white/10 bg-slate-800/60 p-2"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(v => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden" id="mobile-menu">
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setOpen(false)} />
          <div className="fixed inset-x-0 top-12 z-50 mx-2 rounded-2xl border border-white/10 bg-slate-900 p-3">
            <div className="grid">
              {links.map(l => (
                <Link key={l.href} href={l.href} className="rounded-xl px-3 py-3 text-base hover:bg-slate-800/70">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
