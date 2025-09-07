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
        About Me
      </h1>

      {/* Author row */}
      <div className="mt-6 flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-slate-800">
          <Image src="/avatar.jpg" alt="Xiaojing Ji" fill className="object-cover" />
        </div>
        <div className="text-sm">
          <div className="font-semibold">Xiaojing Ji</div>
          <div className="text-slate-400">Updated {new Date().toLocaleDateString()}</div>
        </div>
      </div>

      {/* Introduction */}
      <p className={`${inter.className} mt-8 text-slate-300/90 leading-relaxed tracking-wide`}>
        Hello! I'm Xiaojing, a software developer and artist based in the Seattle Area. Obsseessed to drawing after 5, exposed programming in PASCAL(yeah, it's fossil nowadays lol) and C back when I was 11. 
      </p>

      <h2 className="mt-10 text-2xl font-bold">What I'm into</h2>
      <ul className={`${inter.className} mt-4 text-slate-300/90 leading-relaxed tracking-wide space-y-2`}>
        <li>• Explore new stuff on city walks</li>
        <li>• Try new food and restaurants 😋</li>
        <li>• Curious where the AI evolution will bring humanity to - it's a fun era to be alive</li>
        <li>• When I'm not shipping code, I'm sketching neon cityscapes or planning the next trip</li>
      </ul>

      <h3 className="mt-10 text-2xl font-bold">About this website</h3>

      <Callout>
        Fun Fact: I completed 70%+ of this website with vibe coding :p. Quite a fun experiment in rapid prototyping and iterative design. IYKYK 😉
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
          href="/Xiaojing-Ji-2025.pdf" 
          download 
          className="ml-2 inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 underline transition-colors"
        >
          Download My Full Profile: (PDF)
        </a>
      </p>
    </article>
  );
}
