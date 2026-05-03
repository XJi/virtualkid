'use client';

import Image from "next/image";
import Carousel from '../components/Carousel';
import { useState, useEffect, type CSSProperties } from 'react';

type CSSVars = CSSProperties & { ['--tile-h']?: string };

type Item = { src: string; title: string; description?: string };

const artStudio: Item = {
  src: "/gallery/tokyo-tower.jpg",
  title: "Studio Desk",
  description: "A quiet corner of the studio where texture, light, and the first sketch lines come together.",
};

const artworkThumbs: Item[] = [
  { src: "/gallery/oil-pastel-1.jpeg", title: "Sunset Bay", description: "The gorgeous sunset of Puget Sound, capturing the serene beauty of the Pacific Northwest." },
  { src: "/gallery/oil-pastel-2.jpeg", title: "Neon Overlook", description: "Seattle glows at the edge of day, where sunset melts into the sea and the skyline shimmers like embers." },
  { src: "/gallery/oil-pastel-3.jpg", title: "Golden Sunset", description: "Rolling hills meet sky in a warm Los Angeles evening, with light softening every edge." },
  { src: "/gallery/oil-pastel-4.jpg", title: "Steptoe Butte", description: "A wide Pacific Northwest horizon, where dusk paints the wheat fields and mountains in pastel hues." },
];

const tileHeight = '640px';
const mosaicStyle: CSSVars = { ['--tile-h']: tileHeight };

function Card({
  item,
  className = "",
  priority = false,
  onClick,
}: {
  item: Item;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
}) {
  return (
    <figure
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 shadow-xl shadow-black/20 ${onClick ? 'cursor-pointer hover:-translate-y-1 transition-transform duration-300' : ''} ${className}`}
    >
      <Image
        src={item.src}
        alt={item.title}
        fill
        priority={priority}
        sizes="(min-width:1024px) 40vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/70 to-transparent px-4 py-3 text-slate-100 backdrop-blur-[2px]">
        <p className="text-sm font-semibold">{item.title}</p>
        {item.description && <p className="mt-1 text-xs leading-5 text-slate-300/90 line-clamp-2">{item.description}</p>}
      </div>
    </figure>
  );
}

export default function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

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

  const carouselItems = [
    { src: '/gallery/watercolor-1.jpeg', caption: 'Whispers Over The Bay\nSan Francisco is a feeling, a moment between sips of coffee, between light and mist.' },
    { src: '/gallery/oil-pastel-5.jpg', caption: 'Rosey Skyline\nDawn melts into morning through a veil of quiet color, where the horizon glows from within.' },
    { src: '/gallery/oil-pastel-6.jpeg', caption: 'City Between Clouds\nA skyline softened by lavender mist, where the city becomes a waking dream.' },
    { src: '/gallery/oil-pastel-7.jpg', caption: 'Pastel Twilight\nSouth Lake Union in a still moment before the rain, where geometry and atmosphere meet.' },
    { src: '/gallery/oil-pastel-8.jpeg', caption: 'The Misty Empire State\nManhattan paused in fog, a quiet breath above the park and beyond the city lights.' },
    { src: '/gallery/oil-pastel-9.jpeg', caption: 'Cherry Blossom Rail\nSpring rails and soft petals frame a fleeting train of light.' },
    { src: '/gallery/oil-pastel-10.jpg', caption: 'Spring Pond\nA calm water study layered in gentle pastels and reflective stillness.' },
  ];

  return (
    <div id="top" className="space-y-10">
      <header className="space-y-6">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_24px_80px_-35px_rgba(15,23,42,0.88)]">
          <div className="grid gap-6 lg:grid-cols-[2.4fr_1fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-300/80">The sketchbook</p>
              <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-white">Wonders & Wanders</h1>
              <p className="mt-4 max-w-3xl text-slate-300/90 leading-relaxed text-base md:text-lg">
                Mostly oil pastels and watercolors ✨ Each piece is a snapshot of moment from somewhere I wandered — hover, tap, scroll, and let your eyes wander too.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/_virtual.kid_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open @_virtual.kid_ on Instagram"
                className="group flex w-full items-center gap-3 rounded-[1.75rem] border border-white/10 bg-slate-900/70 py-2 pl-2 pr-4 text-sm text-slate-100 shadow-sm shadow-black/20 transition hover:border-white/20 hover:bg-slate-900/90"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 transition group-hover:ring-white/20">
                  <Image
                    src="/Instagram_Glyph_Gradient.png"
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px] object-contain"
                  />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-medium text-slate-100">@_virtual.kid_</span>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Follow on Instagram</span>
                </span>
              </a>
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 px-6 py-4 text-sm text-slate-300 shadow-xl shadow-black/30">
                <p className="text-fuchsia-200 uppercase tracking-[0.2em] text-[0.65rem]">What&apos;s in here</p>
                <ul className="mt-2 space-y-1.5 [&_li]:leading-relaxed">
                  <li>• A mosaic of artworks since 2020 🎨</li>
                  <li>• A reel of landscape views 🌆</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </header>

      <section className="grid gap-3 lg:grid-cols-11" style={mosaicStyle}>
        <div className="lg:col-span-5">
          <div className="h-[420px] md:h-[520px] lg:h-[var(--tile-h)]">
            <Card item={artStudio} priority className="h-full w-full" onClick={() => setSelectedItem(artStudio)} />
          </div>
        </div>

        <div className="lg:col-span-6 grid h-[420px] md:h-[520px] lg:h-[var(--tile-h)] grid-cols-2 grid-rows-2 gap-3">
          {artworkThumbs.map((it) => (
            <Card key={it.src} item={it} className="h-full w-full" onClick={() => setSelectedItem(it)} />
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_20px_70px_-25px_rgba(15,23,42,0.85)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Dispatches from the Color Lab</h2>
            <p className="mt-2 max-w-2xl text-slate-400">A wandering reel of cityscapes, neon horizons, and color-soaked skylines 💜</p>
          </div>
        </div>
        <div className="mt-6">
          <Carousel items={carouselItems} aspect="4 / 5" />
        </div>
      </section>

      <a
        href="#top"
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-30 grid h-12 w-12 place-items-center rounded-full bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/30 transition hover:bg-fuchsia-500"
      >
        ↑
      </a>

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
                alt={selectedItem.title}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="bg-slate-900/95 backdrop-blur-sm p-6">
              <p className="text-lg font-semibold text-slate-200">
                {selectedItem.title}
              </p>
              {selectedItem.description && (
                <p className="mt-2 text-sm text-slate-400">
                  {selectedItem.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
