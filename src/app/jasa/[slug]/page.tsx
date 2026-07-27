import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { INITIAL_SERVICES } from '@/lib/data';
import { formatCurrency } from '@/lib/whatsapp';
import DetailPageClient from './DetailPageClient';
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
      url: `https://jokicoding.vercel.app/jasa/${service.slug}`,
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

  // JSON-LD Schema.org for individual Service
  const jsonLdService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.fullDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'JokiCoding',
      telephone: '+6281234567890',
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
    <div style={{ paddingTop: '30px', paddingBottom: '80px' }}>
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
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          marginBottom: '24px'
        }}>
          <Link href="/" style={{ color: 'var(--text-muted)' }}>Beranda</Link>
          <ChevronRight size={14} />
          <Link href="/#katalog" style={{ color: 'var(--text-muted)' }}>Katalog Jasa</Link>
          <ChevronRight size={14} />
          <span style={{ color: '#fff', fontWeight: 600 }}>{service.title}</span>
        </div>

        {/* Back Link */}
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: '#a5b4fc',
          fontSize: '0.88rem',
          fontWeight: 600,
          marginBottom: '20px'
        }}>
          <ArrowLeft size={16} /> Kembali ke Katalog Jasa
        </Link>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* Main Info */}
          <div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
              <span className="badge badge-indigo">{service.category}</span>
              <span className="badge badge-amber" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={12} fill="#fcd34d" color="#fcd34d" /> Rating {service.rating} ({service.reviewCount} pesanan)
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#fff', marginBottom: '16px', lineHeight: '1.2' }}>
              {service.title}
            </h1>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              color: '#6ee7b7',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '24px'
            }}>
              <Clock size={16} /> Estimasi Pengerjaan: {service.estimatedTime}
            </div>

            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '10px' }}>Deskripsi Layanan</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '28px', whiteSpace: 'pre-line' }}>
              {service.fullDescription}
            </p>

            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '14px' }}>Keunggulan & Cakupan Layanan</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '32px' }}>
              {service.features.map((feat, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span style={{ fontSize: '0.88rem', color: '#f3f4f6', fontWeight: 500 }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Pricing Card & Order Client Trigger */}
          <DetailPageClient service={service} />
        </div>
      </div>
    </div>
  );
}
