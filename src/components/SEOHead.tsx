import { DEFAULT_SITE_CONFIG, INITIAL_SERVICES } from '@/lib/data';

export default function SEOHead() {
  const baseUrl = 'https://jokicoding.vercel.app';

  // 1. LocalBusiness & Organization Schema
  const jsonLdLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: DEFAULT_SITE_CONFIG.brandName,
    alternateName: ['JokiCoding', 'Jasa Ngoding & Skripsi Indonesia'],
    description: DEFAULT_SITE_CONFIG.tagline,
    url: baseUrl,
    logo: `${baseUrl}/og-image.png`,
    image: `${baseUrl}/og-image.png`,
    telephone: `+${DEFAULT_SITE_CONFIG.adminPhone}`,
    priceRange: 'Rp 400 - Rp 350.000',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ID',
      addressRegion: 'Indonesia',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    makesOffer: INITIAL_SERVICES.map(srv => ({
      '@type': 'Offer',
      name: srv.title,
      description: srv.description,
      price: srv.price,
      priceCurrency: 'IDR',
      url: `${baseUrl}/jasa/${srv.slug}`,
    })),
  };

  // 2. WebSite Schema
  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'JokiCoding',
    url: baseUrl,
    inLanguage: 'id-ID',
    publisher: {
      '@type': 'Organization',
      name: DEFAULT_SITE_CONFIG.brandName,
      url: baseUrl,
    },
  };

  // 3. FAQPage Schema for Google Rich Search Snippets
  const jsonLdFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Apakah ada garansi revisi untuk pengerjaan tugas & skripsi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ya, 100% Bebas Garansi Revisi! Setiap pengerjaan kodingan, skripsi, makalah, maupun desain bebas revisi sesuai catatan dosen atau instruktur hingga hasilnya pas.',
        },
      },
      {
        '@type': 'Question',
        name: 'Berapa biaya cetak / print dokumen per lembar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tarif cetak print dokumen: Hitam Putih (BW) Rp 400 per lembar, dan Cetak Warna Rp 600 per lembar menggunakan kertas HVS berkualitas.',
        },
      },
      {
        '@type': 'Question',
        name: 'Berapa lama estimasi pengerjaan jasa ngoding & skripsi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tersedia layanan Express 24 Jam untuk deadline mendesak, serta layanan reguler 1-3 hari kerja tergantung tingkat kerumitan tugas.',
        },
      },
      {
        '@type': 'Question',
        name: 'Bagaimana metode pembayaran yang tersedia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pembayaran sangat praktis melalui QRIS Instant, GoPay, OVO, DANA, Transfer Bank (BCA/Mandiri/BRI), atau opsi Bayar Nanti saat tugas selesai.',
        },
      },
      {
        '@type': 'Question',
        name: 'Apakah privasi dan identitas pemesan dijamin aman?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '100% Kerahasiaan Terjamin! Identitas pemesan, file tugas, dan source code tidak akan dipublikasikan atau dibagikan ke pihak mana pun.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />
    </>
  );
}
