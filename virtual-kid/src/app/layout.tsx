import './globals.css'
import Link from 'next/link'
import SiteHeader from './components/SiteHeader';

export const metadata = {
  title: 'Xiaojing Ji — Art & Code',
  description: 'Oil pastel artwork, writing, and projects by Xiaojing.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
       <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 py-12 text-sm text-slate-400">
          © {new Date().getFullYear()} Xiaojing Ji
        </footer>
      </body>
    </html>
  )
}
