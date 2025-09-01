import Image from 'next/image'

export default function Home() {
  return (
    <div className="rounded-3xl bg-slate-900/30 p-4 md:p-6 border border-white/5">
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12  items-stretch">
        {/* Left: big photo */}
        <div className="lg:col-span-5  h-full flex flex-col">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 h-full">
            <Image
              src="/hero-studio.jpg"          // <-- put a large 1600x1200-ish image in /public with this name
              alt="Studio workspace"
              width={1600}
              height={1200}
              priority
              className="h-full w-full object-cover"
            />
          </div>
      </div>

      {/* Right: profile card */}
      <aside className="lg:col-span-7 h-full flex flex-col">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 md:p-10  h-full flex flex-col">
          {/* Avatar */}
          <div className="mb-6">
            <Image
              src="/avatar.jpg"             // <-- add a 240x240 avatar to /public/avatar.jpg
              alt="Xiaojing Ji"
              width={88}
              height={88}
              className="rounded-full ring-4 ring-slate-800"
            />
          </div>

          {/* Heading */}
          <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-4xl">
            Hi there! You found me <span className="inline-block">✨</span>
          </h1>
          <p className="mb-6 text-lg font-medium text-slate-300">
            Engineer, Artist, and Explorer of new adeventure.
          </p>

          {/* Intro paragraphs */}
          <div className="space-y-4 text-slate-300/90">
            <p>
              I’m a software developer with a drop of artist spirit. This site is my home base for artwork and experiments at the intersection of creativity and code.
            </p>
            <p>
              Here, I share my creativity at the edge of design × engineering.
              Dive in, get inspired, and feel free to say hi! 
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <a
              href="mailto:hello@jixiaojing.com"
              className="inline-flex items-center justify-center rounded-xl bg-fuchsia-600 px-5 py-3 font-semibold text-white shadow-lg shadow-fuchsia-600/20 transition hover:bg-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/60"
            >
              Let’s Explore!
            </a>
          </div>
        </div>
      </aside>
    </section>
  </div>
  )
}
