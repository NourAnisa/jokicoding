'use client';

import { ArrowRight, CheckCircle } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Hero({ searchQuery, onSearchChange }: HeroProps) {
  return (
    <section style={{ paddingTop: '72px', paddingBottom: '80px', borderBottom: '1px solid var(--paper-3)' }}>
      <div className="container">

        {/* Overline */}
        <div className="label" style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ display: 'inline-block', width: '24px', height: '1.5px', background: 'var(--orange)', verticalAlign: 'middle' }} />
          Jasa Profesional untuk Mahasiswa & Profesional Indonesia
        </div>

        {/* Main headline — editorial, Instrument Serif */}
        <h1 className="display" style={{ maxWidth: '900px', marginBottom: '32px' }}>
          Tugas Selesai,<br />
          <em>Tepat Waktu.</em>
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'flex-start' }}>
          {/* Left: description + CTAs */}
          <div>
            <p style={{ fontSize: '1.08rem', color: 'var(--ink-2)', lineHeight: 1.75, marginBottom: '28px', maxWidth: '420px' }}>
              Layanan serba ada — <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Edit Video, CV, PPT, Skripsi, Jurnal, Ngoding, dan Hosting</strong>. Dikerjakan ahli berpengalaman, garansi revisi, bayar via QRIS atau GoPay.
            </p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '36px', flexWrap: 'wrap' }}>
              <a href="#katalog" className="btn btn-orange">
                Lihat Semua Layanan <ArrowRight size={15} />
              </a>
              <a href="https://wa.me/6281521907985" target="_blank" rel="noopener noreferrer"
                className="btn btn-outline">
                Tanya Dulu, Gratis
              </a>
            </div>

            {/* Simple trust signals — no icons overload */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'Bebas plagiasi, Turnitin-ready atas permintaan',
                'Identitas Anda dijaga ketat, 100% rahasia',
                'Revisi gratis hingga Anda puas',
              ].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '0.875rem', color: 'var(--ink-3)' }}>
                  <CheckCircle size={14} color="var(--green)" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right: search + quick tags */}
          <div>
            {/* Search box — clean, no heavy shadow */}
            <div style={{ marginBottom: '20px' }}>
              <label className="form-label" htmlFor="hero-search">Cari layanan</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="hero-search"
                  type="text"
                  placeholder="Ketik: ngoding, skripsi, PPT, CV, hosting..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="form-input"
                  style={{ paddingRight: '44px', fontSize: '0.95rem' }}
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    style={{
                      position: 'absolute', right: '12px', top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent', border: 'none',
                      cursor: 'pointer', color: 'var(--ink-4)', fontSize: '1rem',
                    }}
                  >×</button>
                )}
              </div>
            </div>

            {/* Quick search tags */}
            <div style={{ marginBottom: '36px' }}>
              <p className="label" style={{ marginBottom: '10px' }}>Populer:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {['Jasa Ngoding', 'Skripsi', 'Edit Video', 'Desain PPT', 'Jasa Hosting', 'Makalah', 'Tulis Tangan'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => onSearchChange(tag)}
                    style={{
                      padding: '5px 12px', borderRadius: 'var(--radius)',
                      fontSize: '0.8rem', fontWeight: 500,
                      border: `1px solid ${searchQuery === tag ? 'var(--ink)' : 'var(--paper-3)'}`,
                      background: searchQuery === tag ? 'var(--ink)' : 'var(--white)',
                      color: searchQuery === tag ? 'var(--paper)' : 'var(--ink-2)',
                      cursor: 'pointer', transition: 'all 0.15s ease',
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats — 4 minimal numbers */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '1px',
              border: '1px solid var(--paper-3)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              background: 'var(--paper-3)',
            }}>
              {[
                { val: '500+', label: 'Pesanan selesai' },
                { val: '4.9★', label: 'Rating kepuasan' },
                { val: '24 Jam', label: 'Layanan express' },
                { val: '100%', label: 'Garansi revisi' },
              ].map(({ val, label }) => (
                <div key={label} style={{
                  background: 'var(--white)',
                  padding: '18px 20px',
                }}>
                  <div className="stat-val">{val}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
