'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';

type Item = { src: string; alt?: string; caption?: string };

type Props = {
  items: Item[];
  title?: string;
  className?: string;
  /** width / height ratio string, e.g. "2 / 3" for tall cards (H:W = 3:2). */
  aspect?: string;
};

export default function Carousel({
  items,
  title = 'Image carousel',
  className = '',
  aspect = '2 / 3', // default tall cards (H:W = 3:2) ≈ your 6:4 request
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || el.children.length === 0) return;
    const first = el.children[0] as HTMLElement;
    const update = () => setCardWidth(first.getBoundingClientRect().width + 16);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el); ro.observe(first);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setAtStart(scrollLeft <= 2);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 2);
    };
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = cardWidth > 0 ? cardWidth : Math.max(1, Math.floor(el.clientWidth / 4));
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') scrollBy(1);
    if (e.key === 'ArrowLeft') scrollBy(-1);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    if (selectedItem) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  const data = useMemo(() => items ?? [], [items]);

  const figStyle = { aspectRatio: aspect } as CSSProperties;

  return (
    <section role="region" aria-label={title} tabIndex={0} onKeyDown={onKeyDown} className={`relative ${className}`}>
      <div ref={trackRef} className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1 py-1">
        {data.map((it, i) => (
          <figure
            key={it.src + i}
            onClick={() => setSelectedItem(it)}
            className="
              group flex-none snap-start flex flex-col cursor-pointer
              rounded-2xl border border-white/10 bg-slate-900/40 overflow-hidden
              w-[85%] sm:w-[60%] md:w-[40%] lg:w-[calc(25%-4px)]   /* 4-up at lg */
              transition-transform duration-300 hover:scale-[1.02]
            "
          >
            <div className="relative overflow-hidden" style={figStyle}>
              <Image
                src={it.src}
                alt={it.alt ?? 'Carousel image'}
                fill
                sizes="(min-width:1024px) 25vw, (min-width:768px) 40vw, 60vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                priority={i < 2}
              />
            </div>
            {it.caption && (
              <figcaption className="p-4 bg-slate-900/60">
                <span className="text-sm leading-relaxed text-slate-200 whitespace-pre-line block">{it.caption}</span>
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      <button
        aria-label="Scroll left"
        onClick={() => scrollBy(-1)}
        disabled={atStart}
        className="absolute left-0 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-slate-800/70 border border-white/10 text-white shadow-lg hover:bg-slate-800/90 disabled:opacity-40"
      >‹</button>
      <button
        aria-label="Scroll right"
        onClick={() => scrollBy(1)}
        disabled={atEnd}
        className="absolute right-0 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-slate-800/70 border border-white/10 text-white shadow-lg hover:bg-slate-800/90 disabled:opacity-40"
      >›</button>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-slate-800/80 text-white text-xl hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            ×
          </button>
          <div
            className="relative max-w-6xl w-full flex flex-col bg-slate-900/95 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[60vh] md:h-[70vh]">
              <Image
                src={selectedItem.src}
                alt={selectedItem.alt ?? 'Magnified image'}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            {selectedItem.caption && (
              <div className="bg-slate-900/95 backdrop-blur-sm p-6">
                <p className="text-base leading-relaxed text-slate-200 whitespace-pre-line">
                  {selectedItem.caption}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
