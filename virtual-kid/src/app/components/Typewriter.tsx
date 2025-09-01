'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  text: string;
  speed?: number;       // ms per character
  startDelay?: number;  // ms before typing begins
  cursor?: boolean;
  className?: string;
  punctuationPauses?: Partial<Record<string, number>>; // e.g., { ',':120, '.':220 }
};

export default function Typewriter({
  text,
  speed = 24,
  startDelay = 300,
  cursor = true,
  className = '',
  punctuationPauses = { ',': 120, '.': 220, '!': 220, '?': 220, '—': 160 }
}: Props) {
  // Split into Unicode code points so emoji etc. don’t get split in half.
  const glyphs = useMemo(() => Array.from(text), [text]);

  const [index, setIndex] = useState(0); // number of glyphs currently shown
  const [done, setDone] = useState(false);
  const tRef = useRef<number | null>(null);

  // Start (or restart) the animation when `text` changes.
  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setIndex(glyphs.length);
      setDone(true);
      return;
    }

    // Reset state cleanly
    setIndex(0);
    setDone(false);

    // Kick off after startDelay by typing the first glyph
    tRef.current = window.setTimeout(() => {
      setIndex(1);
    }, Math.max(0, startDelay));

    return () => {
      if (tRef.current) window.clearTimeout(tRef.current);
    };
  }, [text, glyphs.length, startDelay]);

  // Schedule the next character (no setInterval => no race in StrictMode)
  useEffect(() => {
    if (index === 0 || index >= glyphs.length) {
      if (index >= glyphs.length) setDone(true);
      return;
    }

    const prevGlyph = glyphs[index - 1];
    const extraPause = punctuationPauses[prevGlyph] ?? 0;

    tRef.current = window.setTimeout(() => {
      setIndex(i => Math.min(i + 1, glyphs.length));
    }, Math.max(8, speed) + extraPause);

    return () => {
      if (tRef.current) window.clearTimeout(tRef.current);
    };
  }, [index, glyphs, speed, punctuationPauses]);

  return (
    <span className={className}>
      {/* Accessibility: full sentence for screen readers */}
      <span className="sr-only">{text}</span>

      {/* Visual typing */}
      <span aria-hidden="true">
        {glyphs.slice(0, index).join('')}
        {cursor && !done && <span className="ml-0.5 caret">|</span>}
      </span>

      <style jsx>{`
        .caret { animation: caret-blink 1s steps(1, end) infinite; }
        @keyframes caret-blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
      `}</style>
    </span>
  );
}
