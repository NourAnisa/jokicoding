import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { INITIAL_SERVICES } from '@/lib/data';
import { formatCurrency } from '@/lib/whatsapp';
import DetailPageClient from './DetailPageClient';
import SPSSTable from './SPSSTable';
import { ChevronRight, ShieldCheck, Star, Clock, CheckCircle2, ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INITIAL_SERVICES.map((srv) => ({
    slug: srv.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = INITIAL_SERVICES.find((s) => s.slug === resolvedParams.slug);
  if (!service) return { title: 'Jasa Tidak Ditemukan' };

  return {
    title: `${service.title} - Murah, Cepat & Bergaransi`,
    description: `${service.description} Dikerjakan oleh ahli berpengalaman, garansi revisi, & bayar praktis via QRIS/GoPay.`,
    keywords: [service.title, service.category, 'jasa tugas', 'jasa ngoding', 'jasa skripsi', 'jasa desain'],
    openGraph: {
      title: `${service.title} | JokiCoding`,
      description: service.description,
      url: `https://jokicoding.web.id/jasa/${service.slug}`,
      type: 'article',
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const service = INITIAL_SERVICES.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const jsonLdService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.fullDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'JokiCoding',
      telephone: '+6281521907985',
    },
    offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: service.rating,
      reviewCount: service.reviewCount,
    },
  };

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '80px', background: 'var(--paper)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />

      <div className="container">
        {/* Breadcrumb */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.82rem',
          color: 'var(--ink-4)',
          marginBottom: '20px',
          flexWrap: 'wrap',
        }}>
          <Link href="/" style={{ color: 'var(--ink-3)' }}>Beranda</Link>
          <ChevronRight size={13} color="var(--ink-4)" />
          <Link href="/#katalog" style={{ color: 'var(--ink-3)' }}>Katalog Jasa</Link>
          <ChevronRight size={13} color="var(--ink-4)" />
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{service.title}</span>
        </div>

        {/* Back Link */}
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--ink-3)',
          fontSize: '0.85rem',
          fontWeight: 500,
          marginBottom: '28px',
          transition: 'color 0.15s ease',
        }}>
          <ArrowLeft size={15} /> Kembali ke Katalog Jasa
        </Link>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'start',
        }}>
          {/* Main Info */}
          <div>
            {/* Category + Rating */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <span className="tag tag-blue">{service.category}</span>
              <span className="tag tag-orange" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Star size={11} fill="var(--orange)" color="var(--orange)" />
                Rating {service.rating} ({service.reviewCount} pesanan)
              </span>
              {service.popular && (
                <span className="tag tag-green">🔥 Populer</span>
              )}
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: 'var(--ink)',
              marginBottom: '16px',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
            }}>
              {service.title}
            </h1>

            {/* Estimasi */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--green-light)',
              border: '1px solid #bbf7d0',
              padding: '6px 14px',
              borderRadius: 'var(--radius)',
              color: 'var(--green)',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '28px',
            }}>
              <Clock size={15} /> Estimasi Pengerjaan: {service.estimatedTime}
            </div>

            {/* Deskripsi */}
            <div style={{
              borderLeft: '3px solid var(--orange)',
              paddingLeft: '16px',
              marginBottom: '28px',
            }}>
              <h3 style={{ color: 'var(--ink)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>
                Deskripsi Layanan
              </h3>
              <p style={{ color: 'var(--ink-2)', fontSize: '0.96rem', lineHeight: '1.75' }}>
                {service.fullDescription}
              </p>
            </div>

            {/* Features */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                color: 'var(--ink)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}>
                Keunggulan &amp; Cakupan Layanan
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '10px',
              }}>
                {service.features.map((feat, idx) => (
                  <div key={idx} className="card" style={{
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}>
                    <CheckCircle2 size={16} color="var(--green)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.87rem', color: 'var(--ink-2)', fontWeight: 500 }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantees */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}>
              {[
                'Dukungan Bayar QRIS & GoPay Instant',
                'Garansi Revisi Sampai Puas',
                'Garansi Identitas & File 100% Rahasia',
              ].map((g) => (
                <div key={g} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  fontSize: '0.82rem', color: 'var(--ink-3)',
                  background: 'var(--paper-2)',
                  border: '1px solid var(--paper-3)',
                  borderRadius: 'var(--radius)',
                  padding: '5px 10px',
                }}>
                  <ShieldCheck size={13} color="var(--green)" />
                  {g}
                </div>
              ))}
            </div>

            {(service.slug === 'olah-data-spss' || service.slug === 'jasa-skripsi') && (
              <div style={{ marginTop: '32px' }}>
                <SPSSTable />
              </div>
            )}
          </div>

          {/* Right: Pricing Card & Order */}
          <DetailPageClient service={service} />
        </div>
      </div>
    </div>
  );
}
