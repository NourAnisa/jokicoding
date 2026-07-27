import { DEFAULT_SITE_CONFIG, INITIAL_SERVICES } from '@/lib/data';

export default function SEOHead() {
  const jsonLdLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: DEFAULT_SITE_CONFIG.brandName,
    description: DEFAULT_SITE_CONFIG.tagline,
    url: 'https://jokicoding.vercel.app',
    telephone: `+${DEFAULT_SITE_CONFIG.adminPhone}`,
    priceRange: 'Rp 3.000 - Rp 350.000',
    areaServed: 'Indonesia',
    makesOffer: INITIAL_SERVICES.map(srv => ({
      '@type': 'Offer',
      name: srv.title,
      description: srv.description,
      price: srv.price,
      priceCurrency: 'IDR',
      url: `https://jokicoding.vercel.app/jasa/${srv.slug}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
    />
  );
}
