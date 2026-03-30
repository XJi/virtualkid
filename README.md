# My Portfolio & Creative Showcase

A fast, modern portfolio and blog site built with **Next.js 15** featuring artwork and experiments at the intersection of design and code. Deployed as a static export with zero external APIs.

🌐 Check out https://www.jixiaojing.com/ to visit my site! 
🚀 The site is hosted and deployed on AWS Amplify.
🤖 Code package under /virtual-kid has REDME.md with more project and structure specifics.
 

## 🎨 Features

- **Static Site Export**: Built as pure HTML/CSS/JS with no server runtime (perfect for fast hosting)
- **Responsive Design**: Mobile-first approach with Tailwind v4 styling
- **Interactive Components**:
  - Typewriter effect for animated text with emoji support
  - Image carousel gallery with lightbox modal
  - Smooth navigation with active link highlighting
- **Fast Build Times**: Powered by Turbopack for rapid iteration
- **Dark Theme**: Modern slate-based color scheme with fuchsia accents
- **Full TypeScript**: Strict type checking for code safety
- **Accessibility**: Respects `prefers-reduced-motion` and includes semantic HTML

## 🗂️ Project Structure

```
virtual-kid/src/app/
├── page.tsx                    # Home page (hero section)
├── layout.tsx                  # Root layout wrapper
├── globals.css                 # Tailwind & global styles
├── about/page.tsx              # About page
├── gallery/page.tsx            # Image gallery showcase
├── writing/page.tsx            # Blog/writing archive
└── components/
    ├── SiteHeader.tsx          # Navigation (with mobile menu)
    ├── Carousel.tsx            # Image gallery carousel
    └── Typewriter.tsx          # Text animation component
virtual-kid/public/
├── gallery/                    # Gallery images
├── hero-studio.jpg             # Hero section image
├── avatar.jpg                  # Profile avatar
└── LI-In.png                   # LinkedIn icon
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/XJi/virtualkid.git
cd virtual-kid

# Install dependencies
npm install
```

### Development

```bash
# Start dev server with hot reload (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Changes auto-reload as you edit files.

### Build & Deploy

```bash
# Create static export build
npm run build

# Test the production build locally
npm start
```

The `build` command generates static files in the `.next/out` directory ready for deployment.

### Linting

```bash
npm run lint
```

## 🎯 Key Technologies

| Tech | Version | Purpose |
|------|---------|---------|
| **Next.js** | 15.5.2 | React framework with App Router |
| **React** | 19.1.0 | UI library |
| **Tailwind CSS** | 4.1.12 | Utility-first styling |
| **TypeScript** | 5 | Type safety |
| **Turbopack** | Built-in | Fast bundler |

## 🔧 Configuration

### Next.js Config
[next.config.ts](next.config.ts):
- `output: "export"` — static HTML/CSS/JS only
- `images.unoptimized: true` — no image optimization (static export requirement)
- Path alias: `@/*` maps to `src/*`

### TypeScript
[tsconfig.json](tsconfig.json):
- Strict mode enabled (`"strict": true`)
- Target: ES2020
- Module: ESNext

## 📱 Deployment

Recommended for **AWS Amplify** (zero-config static hosting):

```bash
npm run build
# Deploy the `.next/out` directory
```

Also works on:
- Vercel (automatic)
- GitHub Pages
- Netlify
- Any static file host

## 🎯 Development Workflow

1. **Edit files** → Changes auto-reload via Turbopack
2. **Test responsive** → DevTools device emulation
3. **Lint code** → `npm run lint`
4. **Build** → `npm run build`
5. **Preview** → `npm start`
6. **Deploy** → Push `.next/out` to hosting

## 🤔 Accessibility

- ✅ Semantic HTML (`<nav>`, `<main>`, `<article>`, etc.)
- ✅ ARIA labels on interactive elements
- ✅ Focus rings via Tailwind (`focus:ring-*`)
- ✅ Respects `prefers-reduced-motion` for animations
- ✅ Image alt text required

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [React 19 Release Notes](https://react.dev)
- [Turbopack](https://turbo.build/pack)

## 📄 License

Personal portfolio project. Use for inspiration, but respect copyright on artwork and code.

---

Built with vibe coding energy 🧪✨
