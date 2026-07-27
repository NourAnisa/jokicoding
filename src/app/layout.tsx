import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWA from '@/components/FloatingWA';
import SEOHead from '@/components/SEOHead';
import { DEFAULT_SITE_CONFIG } from '@/lib/data';

export const metadata: Metadata = {
  title: {
    default: 'JokiCoding — Jasa Ngoding, Skripsi, PPT, CV, Edit Video & Hosting',
    template: '%s | JokiCoding',
  },
  description: 'Jasa ngoding terpercaya, pengerjaan skripsi, publikasi jurnal, makalah, desain PPT, CV ATS, edit video, hosting & tulis tangan. Cepat, garansi revisi, bayar via QRIS/GoPay.',
  keywords: [
    'jasa ngoding', 'jasa skripsi', 'jasa hosting', 'jasa pengetikan',
    'jasa tulis tangan', 'jasa edit video', 'jasa desain ppt',
    'jasa cv ats', 'publikasi jurnal sinta', 'jasa makalah', 'jasa artikel ilmiah',
    'jokicoding', 'jasa coding murah', 'jasa skripsi terpercaya',
  ],
  authors: [{ name: DEFAULT_SITE_CONFIG.brandName }],
  metadataBase: new URL('https://jokicoding.web.id'),
  alternates: {
    canonical: 'https://jokicoding.web.id',
  },
  openGraph: {
    title: 'JokiCoding — Solusi Tugas & Jasa Ngoding Terpercaya',
    description: 'Jasa ngoding, skripsi, desain, edit video & hosting. Dikerjakan ahli berpengalaman. Garansi revisi & bayar via QRIS/GoPay.',
    url: 'https://jokicoding.web.id',
    siteName: DEFAULT_SITE_CONFIG.brandName,
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JokiCoding — Jasa Ngoding, Skripsi & Desain Terpercaya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JokiCoding — Jasa Ngoding, Skripsi & Desain Terpercaya',
    description: 'Jasa ngoding, skripsi, desain, edit video & hosting. Garansi revisi, bayar QRIS/GoPay.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'google1bfaed16ab67c926',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" data-theme="light" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <SEOHead />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWA />
      </body>
    </html>
  );
}
