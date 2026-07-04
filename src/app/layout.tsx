import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Analytics } from '@/components/Analytics';

export const metadata: Metadata = {
  title: 'Guia: Trabalhe na Gringa | Victoria Morais',
  description: 'Descubra como Victoria Morais conseguiu um emprego internacional morando no Brasil e receba em dólar trabalhando de casa.',
  keywords: ['Trabalhe na Gringa', 'Victoria Morais', 'Vagas Internacionais', 'Home Office', 'Inglês', 'Emprego Internacional'],
  authors: [{ name: 'Victoria Morais' }],
  metadataBase: new URL('https://trabalhe-na-gringa.vercel.app'),
  openGraph: {
    title: 'Guia Trabalhe na Gringa | Receba em dólar morando no Brasil',
    description: 'Aprenda o passo a passo validado para conseguir uma vaga remota internacional e ganhar em moeda forte sem sair de casa.',
    url: 'https://trabalhe-na-gringa.vercel.app/',
    siteName: 'Guia Trabalhe na Gringa',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Capa do Guia Trabalhe na Gringa com stacks de Dólares e Reais.',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Receba em dólar morando no Brasil | Guia Completo',
    description: 'O passo a passo para acessar vagas remotas internacionais sem precisar emigrar.',
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
      <body className="bg-[#0B1220] font-sans text-slate-200 selection:bg-[#00C853]/30 selection:text-white overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
