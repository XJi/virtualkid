import Image from "next/image";
import { Inter } from "next/font/google";
import Typewriter from "../components/Typewriter";

const inter = Inter({ subsets: ["latin"] }); // paragraphs use this

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-xl border border-fuchsia-300/70 bg-fuchsia-400/50 p-4 text-fuchsia-50">
      <div className="flex items-start gap-3">
        <span className="mt-0.5">💡</span>
        <div className={`${inter.className} leading-relaxed`}>{children}</div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-10">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        README
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
        {/* Main column */}
        <div className="order-2 lg:order-1">
          {/* Introduction */}
          <p className={`${inter.className} text-slate-300/90 leading-relaxed tracking-wide`}>
            Hi! I&apos;m Xiaojing — software developer by day, neon city wanderer by night.
            Obsessed with drawing since I was 5, and started poking at programming at 11 — first in PASCAL (yes, ancient fossil energy 🦕) and then C. Guess I&apos;ve always liked building worlds, whether with pixels or pastels 🧪
          </p>

          <h2 className="mt-10 text-2xl font-bold">What I&apos;m into</h2>
          <ul className={`${inter.className} mt-4 text-slate-300/90 leading-relaxed tracking-wide space-y-2`}>
            <li>📍 Exploring city streets like they&apos;re open-world maps </li>
            <li>😋 Trying new food like it&apos;s a research project  </li>
            <li>✨ Watching AI evolve and wondering where this wild timeline takes humanity - it&apos;s a fun era to be alive </li>
            <li>💜 Sketching neon-lit cityscapes like fantasy rendered in 4K  </li>
          </ul>

          <h3 className="mt-10 text-2xl font-bold">About this website</h3>

          <Callout>
            I completed 90%+ of this website with vibe coding :p. Quite a fun experiment in rapid prototyping and iterative design. Also because I suck at frontend development lol. IYKYK 😝
          </Callout>

          <p className="mt-6 text-slate-300/90 leading-relaxed">
            <Typewriter
                text="This site is hosted on AWS Amplify, built on NextJS ...If you are interested in the source code, check out my GitHub repo: https://github.com/XJi/virtualkid/tree/main/virtual-kid"
                speed={77}        // tweak: lower = faster
                startDelay={700}  // wait a beat before typing
                cursor
            />
          </p>
        </div>

        {/* Sidebar: profile / quick facts card */}
        <aside className="order-1 lg:order-2 lg:sticky lg:top-24 h-fit">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-slate-800">
                <Image src="/avatar.jpg" alt="Xiaojing Ji" fill className="object-cover" />
              </div>
              <div>
                <div className="font-semibold text-white">Xiaojing Ji</div>
                <div className="text-xs text-slate-400">📍 Seattle area</div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-5">
              <a
                href="/Xiaojing-Ji-2026-Resume.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-fuchsia-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-600/20 transition hover:bg-fuchsia-500"
              >
                Download Résumé (PDF)
              </a>
              <a
                href="https://www.linkedin.com/in/xiaojingji/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open LinkedIn profile in new tab"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-800/60 px-4 py-2.5 text-sm text-slate-200 transition hover:bg-slate-800"
              >
                <Image
                  src="/LI-In.png"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                Find me on LinkedIn
              </a>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
