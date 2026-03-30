# Virtual Kid — Portfolio & Creative Showcase

A fast, modern portfolio and blog site built with **Next.js 15** featuring artwork and experiments at the intersection of design and code. Deployed as a static export with zero external APIs.

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
src/app/
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
public/
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

## 🧩 Component Guide

### `SiteHeader.tsx`
Navigation bar with:
- Active link detection via `usePathname()`
- Mobile hamburger menu (hidden on desktop)
- Theme toggle placeholder
- Body overflow control for mobile

**Usage**: Auto-imported in layout, no manual setup needed.

### `Carousel.tsx`
Image gallery with:
- Horizontal scrolling with prev/next buttons
- Lightbox modal for full-screen viewing
- Responsive card sizing via ResizeObserver
- Configurable aspect ratio (default: `2 / 3`)

**Props**:
```typescript
type CarouselProps = {
  items: Array<{ src: string; alt?: string; caption?: string }>;
  aspectRatio?: string; // e.g., "2 / 3", "16 / 9"
};
```

### `Typewriter.tsx`
Character-by-character text animation:
- Respects `prefers-reduced-motion` for accessibility
- Configurable speed and punctuation pauses
- Unicode-aware (handles emojis correctly)
- Blinking cursor option

**Props**:
```typescript
type TypewriterProps = {
  text: string;
  speed?: number;        // ms per character (default: 24)
  startDelay?: number;   // ms before typing starts (default: 300)
  cursor?: boolean;      // show blinking cursor (default: true)
  className?: string;
  punctuationPauses?: Record<string, number>; // pause times
};
```

## 🎨 Styling & Theme

### Color Scheme
- **Background**: `slate-950` (dark)
- **Text**: `slate-100` (light gray)
- **Accents**: Fuchsia (`#f0f9ff` to `fuchsia-600`)
- **Success**: Emerald green (callout boxes)

### Responsive Breakpoints
- Mobile-first design
- `md:` for tablets/desktops (768px+)
- `lg:` for larger layouts (1024px+)

### Layout
- Max-width container: `max-w-6xl`
- Consistent padding: `px-4 py-10`
- Tailwind v4 imported via `@import "tailwindcss"` in globals.css

## 🖼️ Adding Content

### Gallery Images
Edit [src/app/gallery/page.tsx](src/app/gallery/page.tsx):
```tsx
const items = [
  { src: '/gallery/image1.jpg', alt: 'Description', caption: 'Title' },
  { src: '/gallery/image2.jpg', alt: 'Description' },
  // ...
];
```

Place images in `/public/gallery/`.

### New Pages
1. Create `src/app/{route}/page.tsx`
2. Export default component
3. Layout auto-applies via `layout.tsx`
4. Update `SiteHeader` links array

### Styling Components
```tsx
<div className="bg-slate-900 text-slate-100 hover:bg-fuchsia-600">
  Content with dark theme & fuchsia hover
</div>
```

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

Personal portfolio project. Use for inspiration, but respect copyright on artwork and code. IT'S All L̶E̶G̶E̶N̶D̶A̶R̶Y̶ ̶V̶I̶R̶T̶U̶A̶L̶K̶I̶D̶ XIAOJING'S ARTWORK!



---

Built with vibe coding energy 🧪✨
