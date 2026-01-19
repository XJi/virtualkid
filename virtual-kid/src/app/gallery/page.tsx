'use client';

import Image from "next/image";
import Carousel from '../components/Carousel';
import { useState, useEffect, type CSSProperties } from 'react';

type CSSVars = CSSProperties & { ['--tile-h']?: string };

/** Simple image item type */
type Item = { src: string; title: string; description?: string };

const artStudio: Item = {
  src: "/gallery/tokyo-tower.jpg",
  title: "Studio Desk",
  description: "One of my latest drawing. This is where I usually draw at home",
};

const artworkThumbs: Item[] = [
  { src: "/gallery/oil-pastel-1.jpeg", title: "Sunset Bay",description: "The gorgeous sunset of Pudget Sound, capturing the serene beauty of Pacific Northwest." },
  { src: "/gallery/oil-pastel-2.jpeg", title: "Neon Overlook", description: "Seattle glows at the edge of day, where sunset melts into the sea and the skyline shimmers like embers. The world feels suspended — warm, electric, and infinite beneath a sky of fire and rose." },
  { src: "/gallery/oil-pastel-3.jpg", title: "Golden Sunset from Los Angeles", description: "Bathed in the warm glow of a setting sun, where rolling hills meet sky, the city of Los Angeles blends into the horizon" },
  { src: "/gallery/oil-pastel-4.jpg", title: "Fields of Color" },
];

const tileHeight = '640px'; // Adjust this value to change the height of the mosaic tiles
const mosaicStyle: CSSVars = { ['--tile-h']: tileHeight };

/** Generic card with hover and proper object-fit */
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
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 ${onClick ? 'cursor-pointer hover:scale-[1.02] transition-transform duration-300' : ''} ${className}`}
    >
      <Image
        src={item.src}
        alt={item.title}
        fill
        priority={priority}
        sizes="(min-width:1024px) 40vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <figcaption className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-slate-900/40 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="rounded-md bg-slate-900/60 px-2 py-1 text-xs font-medium text-slate-200">
          {item.title}
        </span>
      </figcaption>
    </figure>
  );
}

export default function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

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
  /**
   * Use a single height variable so LEFT and RIGHT match perfectly.
   * Tweak the px value once and both columns stay in sync.
   */
  const tileHeight = "640px"; // <- adjust to taste (e.g., "560px", "720px")
  const carouselItems = [
    { src: '/gallery/watercolor-1.jpeg', caption: 'Wiisphers Over The Bay\nSan Francisco is a feeling, a moment between sips of coffee, between light and mist, to the scent of roasted coffee beans curling through the morning fog ' },
    { src: '/gallery/oil-pastel-5.jpg', caption: 'Rosey Skyline\n The boundary between dawn and morning through the veil of a dream, where light replaces detail, and the city becomes a whisper of color in the sky.' },
    { src: '/gallery/oil-pastel-6.jpeg', caption: 'City Between Clouds\nWhen the city has drifted into a dream, where its skyline dissolves into a haze of rose-gold and lavender mist.' },
    { src: '/gallery/oil-pastel-7.jpg', caption: 'Pastel Twilight\n The landscape of South Lake Union in Seattle. Before the traffic, before the rain, to remember the sheer beauty of the geographic location that anchors the city.' },
    { src: '/gallery/oil-pastel-8.jpeg', caption: 'The Misty Empire State\n A rare moment where Manhattan seems to pause — softened by morning fog, grounded by the expansive calm of Central Park. A place where the city and nature meet in a hush of turquoise.' },
    { src: '/gallery/oil-pastel-9.jpeg', caption: 'City rail of the cherry blossom season.' },
    { src: '/gallery/oil-pastel-10.jpg', caption: 'Spring Pond' },
  ];

  return (
    <div id="top" className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
          Art Gallery
        </h1>
        <p className="text-slate-300/90 leading-relaxed">
          In my spare time, I love to experiment with color combinations and dynamics using oil pastels and watercolor.
        </p>
        <div className="mt-3">
          <a
            href="https://www.instagram.com/_virtual.kid_/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Instagram profile in new tab"
            className="inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white"
          >
            <Image
              src="/Instagram_Glyph_Gradient.png"
              alt="Instagram"
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
            />
            <span className="font-medium">@_virtual.kid_</span>
          </a>
        </div>
      </header>
      <hr className="border-white/10" />

      {/* Two-column mosaic:
          - 12-grid; left 5/12 (~41.7%), right 7/12 (~58.3%)
          - items-stretch so children fill equal height */}
      <section
        className="grid gap-3 items-stretch lg:grid-cols-11"
        style={mosaicStyle}   // <-- no any, lint is happy
      >
        {/* LEFT: feature (takes ~40%) */}
        <div className="lg:col-span-5">
          <div className="h-[420px] md:h-[520px] lg:h-[var(--tile-h)]">
            <Card item={artStudio} priority className="h-full w-full" onClick={() => setSelectedItem(artStudio)} />
          </div>
        </div>

        {/* RIGHT: 2×2 grid (takes ~55%), SAME HEIGHT as left */}
       <div className="lg:col-span-6">
         <div className="grid h-[420px] md:h-[520px] lg:h-[var(--tile-h)] grid-cols-2 grid-rows-2 gap-3">
            {artworkThumbs.map((it) => (
              <Card key={it.src} item={it} className="h-full w-full" onClick={() => setSelectedItem(it)} />
            ))}
          </div>
        </div>
      </section>
      <hr className="border-white/10" />

      {/* Carousel BELOW */}
      <div className="mt-4">
        <h2 className="mb-3 text-xl font-semibold tracking-tight">More Works</h2>
        <Carousel 
          items={carouselItems}
          aspect="4 / 5"
        />
      </div>

      {/* Back to top FAB */}
      <a
        href="#top"
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-30 grid h-12 w-12 place-items-center rounded-full bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/30 transition hover:bg-fuchsia-500"
      >
        ↑
      </a>

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
