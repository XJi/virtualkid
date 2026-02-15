import Image from "next/image";
import { Inter } from "next/font/google";
import Typewriter from "../components/Typewriter";

const inter = Inter({ subsets: ["latin"] }); // paragraphs use this

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-xl border border-emerald-400/20 bg-emerald-700/30 p-4 text-emerald-100">
      <div className="flex items-start gap-3">
        <span className="mt-0.5">💡</span>
        <div className={`${inter.className} leading-relaxed`}>{children}</div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        README
      </h1>

      {/* Author row */}
      <div className="mt-6 flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-slate-800">
          <Image src="/avatar.jpg" alt="Xiaojing Ji" fill className="object-cover" />
        </div>
        <div className="text-sm">
          <div className="font-semibold">Xiaojing Ji</div>
        </div>
      </div>

      {/* Introduction */}
      <p className={`${inter.className} mt-8 text-slate-300/90 leading-relaxed tracking-wide`}>
      Hi! I&apos;m Xiaojing — software developer by day, neon city wanderer by night, based in the Seattle area.
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
        I completed 70%+ of this website with vibe coding :p. Quite a fun experiment in rapid prototyping and iterative design. Also because I suck at frontend development lol. IYKYK 😝
      </Callout>

      <p className="mt-6 text-slate-300/90 leading-relaxed">
        <Typewriter
            text="This site is hosted on AWS Amplify, built on NextJS ...If you are interested in the source code, check out my GitHub repo: https://github.com/XJi/virtualkid/tree/main/virtual-kid"
            speed={77}        // tweak: lower = faster
            startDelay={700}  // wait a beat before typing
            cursor
        />
      </p>

      <p className={`${inter.className} mt-8 text-slate-300/90 leading-relaxed tracking-wide`}>
        👉🏻  
        <a 
          href="/Xiaojing-Ji-2025-Resume.pdf" 
          download 
          className="ml-2 inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 underline transition-colors"
        >
          Download My Full Profile: (PDF)
        </a>
      </p>
      <p className={`${inter.className} mt-3 text-slate-300/90 leading-relaxed tracking-wide`}>
        <a
          href="https://www.linkedin.com/in/xiaojingji/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open LinkedIn profile in new tab"
          className="inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white"
        >
          <Image
            src="/LI-In.png"
            alt="LinkedIn"
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />
          Find me on LinkedIn
        </a>
      </p>
    </article>
  );
}
