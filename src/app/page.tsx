'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import PartnersSection from '@/components/PartnersSection';
import OrderModal from '@/components/OrderModal';
import { Service } from '@/types';
import { getServices } from '@/lib/data';
import { ShieldCheck, QrCode, Clock, Award, HelpCircle, ArrowRight } from 'lucide-react';

const CATEGORIES = ['Semua', 'IT & Web', 'Akademik', 'Desain', 'Multimedia'];

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');
  const [selected, setSelected] = useState<Service | null>(null);

  useEffect(() => { setServices(getServices()); }, []);

  const filtered = services.filter(s => {
    const mc = category === 'Semua' || s.category === category;
    const q = search.toLowerCase();
    const ms = s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.features.some(f => f.toLowerCase().includes(q));
    return mc && ms;
  });

  return (
    <div>
      <Hero searchQuery={search} onSearchChange={setSearch} />
      <PartnersSection />

      {/* ── CATALOG ─────────────────────────────── */}
      <section id="katalog" style={{ padding: '80px 0', borderBottom: '1px solid var(--paper-3)' }}>
        <div className="container">
          {/* Section header — NOT centered, left-aligned, confident */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '40px' }}>
            <div>
              <div className="label" style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ display: 'inline-block', width: '20px', height: '1.5px', background: 'var(--orange)' }} />
                Katalog Layanan
              </div>
              <h2 className="heading-1">Apa yang bisa kami kerjakan<br/>untuk Anda?</h2>
            </div>

            {/* Category filter tabs */}
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', alignSelf: 'flex-end' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`filter-tab ${category === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="catalog-grid">
              {filtered.map(s => (
                <ServiceCard key={s.id} service={s} onOrderClick={setSelected} />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center', padding: '60px 24px',
              border: '1.5px dashed var(--paper-3)',
              borderRadius: 'var(--radius-lg)',
            }}>
              <HelpCircle size={36} color="var(--ink-4)" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Tidak ditemukan</h3>
              <p style={{ color: 'var(--ink-3)', fontSize: '0.9rem', marginBottom: '20px' }}>
                Tidak ada layanan untuk &quot;{search}&quot;
              </p>
              <button onClick={() => { setSearch(''); setCategory('Semua'); }} className="btn btn-outline btn-sm">
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── ADVANTAGES ──────────────────────────── */}
      <section id="keunggulan" style={{ padding: '80px 0', borderBottom: '1px solid var(--paper-3)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'flex-start' }}>
            {/* Left — big statement */}
            <div style={{ position: 'sticky', top: '88px' }}>
              <div className="label" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ display: 'inline-block', width: '20px', height: '1.5px', background: 'var(--orange)' }} />
                Mengapa kami?
              </div>
              <h2 className="heading-1" style={{ marginBottom: '20px' }}>
                Standar profesional,<br/>
                <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>bukan sekadar jasa.</em>
              </h2>
              <p style={{ color: 'var(--ink-3)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                Kami memahami tekanan akademik dan tenggat waktu. Setiap pekerjaan dikerjakan dengan standar yang tidak kami kompromikan.
              </p>
            </div>

            {/* Right — 4 advantage items, stacked vertically */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
              {[
                {
                  icon: ShieldCheck, num: '01',
                  title: 'Garansi Revisi Tanpa Batas',
                  desc: 'Revisi pengerjaan secara bebas sesuai catatan dosen atau instruktur hingga hasilnya dinyatakan memenuhi standar. Kepuasan Anda adalah prioritas.',
                },
                {
                  icon: QrCode, num: '02',
                  title: 'Pembayaran Cepat via QRIS & GoPay',
                  desc: 'Bayar lebih praktis melalui QRIS instant, GoPay, OVO, DANA, atau Transfer Bank. Tanpa biaya tersembunyi, transparan dari awal.',
                },
                {
                  icon: Clock, num: '03',
                  title: 'Pengerjaan Tepat Waktu, Bisa Express',
                  desc: 'Tersedia layanan reguler maupun Express 24 jam untuk deadline mendesak. Kami menghargai waktu Anda.',
                },
                {
                  icon: Award, num: '04',
                  title: 'Original & Bebas Plagiasi',
                  desc: 'Setiap pekerjaan — dari kode, makalah, hingga skripsi — dikerjakan dari nol. Cek Turnitin tersedia atas permintaan.',
                },
              ].map(({ icon: Icon, num, title, desc }, i, arr) => (
                <div key={num} style={{
                  padding: '28px 0',
                  borderBottom: i < arr.length - 1 ? '1px solid var(--paper-3)' : 'none',
                  display: 'flex', gap: '20px', alignItems: 'flex-start',
                }}>
                  <div style={{
                    fontSize: '0.7rem', fontWeight: 700, color: 'var(--ink-4)',
                    letterSpacing: '0.06em', minWidth: '24px', paddingTop: '3px',
                  }}>
                    {num}
                  </div>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    background: 'var(--paper-2)', border: '1px solid var(--paper-3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={17} color="var(--ink-2)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '6px', color: 'var(--ink)' }}>
                      {title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--ink-3)', lineHeight: 1.65 }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO ORDER ────────────────────────── */}
      <section id="cara-order" style={{ padding: '80px 0', background: 'var(--paper-2)' }}>
        <div className="container">
          <div style={{ marginBottom: '52px' }}>
            <div className="label" style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ display: 'inline-block', width: '20px', height: '1.5px', background: 'var(--orange)' }} />
              Alur Pemesanan
            </div>
            <h2 className="heading-1">Selesai dalam 4 langkah.</h2>
          </div>

          {/* Steps as horizontal list with numbers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
            {[
              { n: '1', title: 'Pilih Layanan', desc: 'Cari layanan yang Anda butuhkan dari katalog lengkap kami.' },
              { n: '2', title: 'Isi Detail & Bayar', desc: 'Lengkapi form pesanan, pilih metode pembayaran yang nyaman.' },
              { n: '3', title: 'Chat via WhatsApp', desc: 'Diarahkan otomatis ke WhatsApp admin dengan format detail pesanan.' },
              { n: '4', title: 'Terima Hasil', desc: 'Pekerjaan selesai tepat waktu. Revisi gratis jika diperlukan.' },
            ].map(({ n, title, desc }) => (
              <div key={n}>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '3rem', color: 'var(--paper-3)',
                  lineHeight: 1, marginBottom: '16px',
                  fontWeight: 400,
                }}>
                  {n}
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '8px', color: 'var(--ink)' }}>
                  {title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-3)', lineHeight: 1.6 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '48px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="#katalog" className="btn btn-orange">
              Mulai Pesan Sekarang <ArrowRight size={15} />
            </a>
            <a href="https://wa.me/6281521907985" target="_blank" rel="noopener noreferrer"
              className="btn btn-outline">
              Ada pertanyaan? Chat dulu
            </a>
          </div>
        </div>
      </section>

      <OrderModal service={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
