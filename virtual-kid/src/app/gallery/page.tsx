'use client';

import Image from "next/image";
import Carousel from '../components/Carousel';
import ZoomInIcon from '../components/icons/ZoomInIcon';
import { useState, useEffect, useRef, type CSSProperties } from 'react';

type CSSVars = CSSProperties & { ['--tile-h']?: string };

type Item = { src: string; title: string; description?: string };

const artStudio: Item = {
  src: "/gallery/tokyo-tower.jpg",
  title: "Studio Desk",
  description: "Tokyo Tower (04/2025) - Where texture, light, and sketch lines come together.",
};

const latestArtwork = {
  src: "/gallery/oil-pastel-11.jpeg",
  title: "Los Angeles Sunset",
  completedAt: "2026-05-10",
  completedAtLabel: "May 10, 2026",
  intro:
    "Los Angeles wears its sunsets like a slow exhale — palm silhouettes drifting against a sky that burns from coral into lavender. This piece chases that golden hush, when the city softens and the light feels close enough to touch.",
  medium: "Oil pastel on paper",
  dimensions: "9 × 12 in",
  inspiration:
    "A late drive down the coast as the sun melted into the Pacific, painting every rooftop and palm in molten gold.",
  howTo: {
    intro:
      "An LA sunset is all about layering warm-on-warm and letting the colors melt into each other. The key is to build the gradient from light to dark, blend generously, then keep the silhouettes for last so they sit crisp on top.",
    tools: [
      "Sennelier oil pastels (soft)",
      "Colorless blender pen",
      "Paper stump & tortillon",
      "Cold-press pastel paper",
      "Kneaded eraser",
    ],
    steps: [
      {
        title: "Block in the horizon",
        body:
          "Lightly pencil the horizon line and palm silhouettes — no details, just shapes. Keep the sun a touch off-center for a more cinematic frame.",
      },
      {
        title: "Lay the warm base",
        body:
          "Pull broad horizontal strokes from the horizon up — pale yellow at the sun, then peach, coral, and a warm lavender as you climb. Don't worry about smoothness yet; coverage first.",
      },
      {
        title: "Blend the sky soft",
        body:
          "Sweep a colorless blender pen along each color band so the edges melt together. Finish with a paper stump in tight circles around the sun's halo for that glowing falloff.",
      },
      {
        title: "Push the hot core",
        body:
          "Layer hotter magenta and burnt orange right at the horizon, then re-blend. The trick is contrast — the brighter that core glows, the more the upper sky reads as twilight.",
      },
      {
        title: "Drop the silhouettes",
        body:
          "Press deep plum or near-black for palm trunks and rooftops last, so they sit cleanly on the gradient. Keep strokes confident — silhouettes don't need texture, just shape.",
      },
      {
        title: "Final highlights",
        body:
          "A whisper of pale yellow back across the sun's center and a tiny rim-light along the palm fronds. Step back, squint, and stop while it still feels like a memory.",
      },
    ],
  },
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
      {onClick && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-3 right-3 grid h-9 w-9 place-items-center text-slate-100 transition duration-300 group-hover:scale-110"
        >
          <ZoomInIcon className="h-5 w-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]" />
        </span>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent px-4 pt-3 pb-1.5 text-slate-100 backdrop-blur-[1px]">
        <p className="text-sm font-semibold leading-tight">{item.title}</p>
        {item.description && <p className="mt-0.5 text-[11px] leading-snug text-slate-300/90 line-clamp-2">{item.description}</p>}
      </div>
    </figure>
  );
}

export default function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [latestPage, setLatestPage] = useState(0);
  const latestTouchStartX = useRef<number | null>(null);

  const onLatestTouchStart = (e: React.TouchEvent) => {
    latestTouchStartX.current = e.touches[0].clientX;
  };
  const onLatestTouchEnd = (e: React.TouchEvent) => {
    if (latestTouchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - latestTouchStartX.current;
    latestTouchStartX.current = null;
    if (dx < -50) setLatestPage(1);
    else if (dx > 50) setLatestPage(0);
  };

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

      <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_24px_80px_-35px_rgba(15,23,42,0.88)]">
        <div
          className="overflow-hidden"
          onTouchStart={onLatestTouchStart}
          onTouchEnd={onLatestTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${latestPage * 100}%)` }}
          >
            <div
              className="w-full shrink-0"
              aria-hidden={latestPage !== 0}
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_1fr] lg:items-center">
                <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[1.5rem] border border-white/10 lg:max-w-none">
                  <Image
                    src={latestArtwork.src}
                    alt={latestArtwork.title}
                    fill
                    priority
                    sizes="(min-width:1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-fuchsia-500/15 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-fuchsia-300 ring-1 ring-fuchsia-400/30">
                        Latest piece
                      </span>
                      <time
                        dateTime={latestArtwork.completedAt}
                        className="text-xs uppercase tracking-[0.2em] text-slate-400"
                      >
                        Completed {latestArtwork.completedAtLabel}
                      </time>
                    </div>
                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                      {latestArtwork.title}
                    </h2>
                    <p className="mt-4 text-slate-300/90 leading-relaxed">{latestArtwork.intro}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLatestPage(1)}
                    className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-4 text-left transition hover:border-fuchsia-300/40 hover:bg-slate-900/80"
                    aria-label="Show how to draw it"
                  >
                    <span className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-fuchsia-200/80">Next</span>
                      <span className="mt-1 text-base font-semibold text-white">How to draw it</span>
                      <span className="text-xs text-slate-400">Swipe or tap to see the process</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-slate-950/60 text-lg text-fuchsia-300 transition group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </button>
                  <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3">
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-fuchsia-200/80">Medium</dt>
                      <dd className="mt-1 text-sm text-slate-200">{latestArtwork.medium}</dd>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3">
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-fuchsia-200/80">Dimensions</dt>
                      <dd className="mt-1 text-sm text-slate-200">{latestArtwork.dimensions}</dd>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 sm:col-span-2">
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-fuchsia-200/80">Inspiration</dt>
                      <dd className="mt-1 text-sm text-slate-200">{latestArtwork.inspiration}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <div
              className="w-full shrink-0"
              aria-hidden={latestPage !== 1}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setLatestPage(0)}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 transition hover:border-fuchsia-300/40 hover:text-white"
                  aria-label="Back to overview"
                >
                  <span className="transition group-hover:-translate-x-0.5">←</span>
                  Back to overview
                </button>
                <span className="text-[10px] uppercase tracking-[0.25em] text-fuchsia-200/80">Process notes</span>
              </div>

              <h3 className="mt-4 text-2xl font-semibold text-white md:text-3xl">How to draw it</h3>
              <p className="mt-3 max-w-3xl text-sm text-slate-300/90 leading-relaxed">{latestArtwork.howTo.intro}</p>

              <div className="mt-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-fuchsia-200/80">Tools</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {latestArtwork.howTo.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-xs text-slate-200"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                {latestArtwork.howTo.steps.map((step, i) => (
                  <li
                    key={step.title}
                    className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
                        Step {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-100">{step.title}</h4>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300/90">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          {[0, 1].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLatestPage(i)}
              aria-label={i === 0 ? 'Show overview' : 'Show how to draw it'}
              className={`h-2 rounded-full transition-all duration-300 ${latestPage === i ? 'w-10 bg-fuchsia-500' : 'w-6 bg-slate-700 hover:bg-slate-600'}`}
            />
          ))}
        </div>
      </section>

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
            <h2 className="text-2xl font-semibold text-white">Color Lab</h2>
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
