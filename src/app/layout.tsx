import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Analytics } from '@/components/Analytics';

export const metadata: Metadata = {
  title: 'Fluência Autodidata | Vivi Morais',
  description: 'Descubra como destravar sua fala em inglês por conta própria, usando imersão diária e shadowing, sem depender de professores caros.',
  keywords: ['Fluência Autodidata', 'Vivi Morais', 'The Brasilian Dream', 'Aprender Inglês', 'Inglês Sozinho', 'Shadowing', 'Falar Inglês'],
  authors: [{ name: 'Vivi Morais' }],
  metadataBase: new URL('https://thebrasiliandream.vercel.app'),
  openGraph: {
    title: 'Fluência Autodidata | Vivi Morais',
    description: 'Destrave sua comunicação em inglês sem depender de cursinhos ou professores particulares.',
    url: 'https://thebrasiliandream.vercel.app/',
    siteName: 'The Brasilian Dream',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Capa do ebook Fluência Autodidata por Vivi Morais.',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fluência Autodidata | Vivi Morais',
    description: 'Destrave sua fala em inglês no seu próprio ritmo.',
    images: ['/opengraph-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon-57x57.png', sizes: '57x57' },
      { url: '/apple-touch-icon-60x60.png', sizes: '60x60' },
      { url: '/apple-touch-icon-72x72.png', sizes: '72x72' },
      { url: '/apple-touch-icon-76x76.png', sizes: '76x76' },
    ],
    other: [
      { rel: 'msapplication-TileImage', url: '/ms-icon-70x70.png' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="bg-[#0B1220] font-sans text-slate-200 selection:bg-[#FFB800]/30 selection:text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
