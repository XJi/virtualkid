import Image from "next/image";
import Carousel from '../components/Carousel';
import type { CSSProperties } from 'react';

type CSSVars = CSSProperties & { ['--tile-h']?: string };

/** Simple image item type */
type Item = { src: string; title: string };

const featured: Item = {
  src: "/gallery/tokyo-tower.jpg",
  title: "Studio Desk",
};

const thumbs: Item[] = [
  { src: "/gallery/oil-pastel-1.jpeg", title: "Sunset Bey" },
  { src: "/gallery/oil-pastel-2.jpeg", title: "Neon Overlook" },
  { src: "/gallery/oil-pastel-3.jpg", title: "Golden Ridge" },
  { src: "/gallery/oil-pastel-4.jpg", title: "Fields of Color" },
];

const tileHeight = '640px'; // <- adjust to taste (e.g., "560px", "720px")
const mosaicStyle: CSSVars = { ['--tile-h']: tileHeight };

/** Generic card with hover and proper object-fit */
function Card({
  item,
  className = "",
  priority = false,
}: {
  item: Item;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 ${className}`}
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
  /**
   * Use a single height variable so LEFT and RIGHT match perfectly.
   * Tweak the px value once and both columns stay in sync.
   */
  const tileHeight = "640px"; // <- adjust to taste (e.g., "560px", "720px")
  const carouselItems = [
    { src: '/gallery/watercolor-1.jpeg', caption: 'Golden Gate - San Fransisco' },
    { src: '/gallery/oil-pastel-5.jpg', caption: 'Rainy Skyline' },
    { src: '/gallery/oil-pastel-6.jpeg', caption: 'Retro Console' },
    { src: '/gallery/oil-pastel-7.jpg', caption: 'Harbor Lights' },
    { src: '/gallery/oil-pastel-8.jpeg', caption: 'Night Market' },
    { src: '/gallery/oil-pastel-9.jpeg', caption: 'City Rail' },
    { src: '/gallery/oil-pastel-10.jpg', caption: 'Spring Pond' },
  ];

  return (
    <div id="top" className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Art Gallery
        </h1>
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
            <Card item={featured} priority className="h-full w-full" />
          </div>
        </div>

        {/* RIGHT: 2×2 grid (takes ~55%), SAME HEIGHT as left */}
       <div className="lg:col-span-6">
         <div className="grid h-[420px] md:h-[520px] lg:h-[var(--tile-h)] grid-cols-2 grid-rows-2 gap-3">
            {thumbs.map((it) => (
              <Card key={it.src} item={it} className="h-full w-full" />
            ))}
          </div>
        </div>
      </section>

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
    </div>
  );
}
