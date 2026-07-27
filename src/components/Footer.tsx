'use client';

import Link from 'next/link';
import { Heart, ShieldCheck } from 'lucide-react';
import { DEFAULT_SITE_CONFIG } from '@/lib/data';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--ink)',
      color: 'var(--paper)',
      paddingTop: '64px',
      paddingBottom: '32px',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr',
          gap: '56px',
          paddingBottom: '52px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '28px',
        }}>
          {/* Brand column */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem', letterSpacing: '-0.02em',
                color: 'var(--paper)', fontWeight: 400,
              }}>
                JokiCoding
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: '280px', marginBottom: '24px' }}>
              Platform terpercaya pengerjaan tugas ngoding, karya tulis akademik, desain grafis, dan media — dengan jaminan privasi & garansi revisi.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.8rem', color: '#86efac', fontWeight: 600 }}>
              <ShieldCheck size={14} />
              100% Kerahasiaan & Tepat Waktu
            </div>
          </div>

          {/* Layanan */}
          <div>
            <h4 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>
              Layanan
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                ['/jasa/jasa-ngoding', 'Jasa Ngoding'],
                ['/jasa/jasa-skripsi', 'Jasa Skripsi'],
                ['/jasa/publikasi-jurnal', 'Publikasi Jurnal'],
                ['/jasa/desain-ppt', 'Desain PPT'],
                ['/jasa/edit-video', 'Edit Video'],
                ['/jasa/tulis-tangan', 'Tulis Tangan'],
                ['/jasa/jasa-hosting', 'Jasa Hosting'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.6)',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pembayaran */}
          <div>
            <h4 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>
              Pembayaran
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              {['QRIS Instant', 'GoPay', 'OVO / DANA', 'Transfer BCA', 'Transfer BRI', 'Transfer Mandiri'].map(m => (
                <div key={m} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
                  {m}
                </div>
              ))}
            </div>
            <Link href="/admin/dashboard" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '0.8rem', fontWeight: 600,
              color: 'rgba(255,255,255,0.5)',
              padding: '7px 14px',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 'var(--radius)',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = '#fff';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)';
            }}>
              🔒 Portal Admin
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'space-between', gap: '12px',
          fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)',
        }}>
          <div>© {new Date().getFullYear()} {DEFAULT_SITE_CONFIG.brandName}. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Dibuat dengan <Heart size={12} color="#f43f5e" fill="#f43f5e" /> untuk Mahasiswa Indonesia
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .container > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
