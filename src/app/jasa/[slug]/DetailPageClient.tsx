'use client';

import { useState } from 'react';
import { Service } from '@/types';
import { formatCurrency } from '@/lib/whatsapp';
import OrderModal from '@/components/OrderModal';
import { ArrowRight, QrCode, ShieldCheck, RefreshCw } from 'lucide-react';

interface DetailPageClientProps {
  service: Service;
}

export default function DetailPageClient({ service }: DetailPageClientProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="card" style={{
      padding: '28px',
      position: 'sticky',
      top: '88px',
    }}>
      {/* Header badge */}
      <span className="tag tag-green" style={{ marginBottom: '12px', display: 'inline-block' }}>
        Harga Transparan
      </span>

      {/* Price */}
      <div style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '0.82rem', color: 'var(--ink-4)', display: 'block', marginBottom: '2px' }}>
          Mulai dari
        </span>
        <span className="price" style={{ fontSize: '2rem', display: 'block' }}>
          {formatCurrency(service.price)}
        </span>
        <span style={{ fontSize: '0.88rem', color: 'var(--ink-3)' }}>{service.priceUnit}</span>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-orange"
        style={{
          width: '100%',
          justifyContent: 'center',
          padding: '14px 20px',
          fontSize: '1rem',
          marginBottom: '16px',
        }}
      >
        Pesan Jasa Ini Sekarang <ArrowRight size={18} />
      </button>

      {/* Guarantees */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        fontSize: '0.83rem',
        color: 'var(--ink-3)',
        borderTop: '1px solid var(--paper-3)',
        paddingTop: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <QrCode size={15} color="var(--green)" />
          <span>Dukungan Bayar QRIS &amp; GoPay Instant</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <RefreshCw size={15} color="var(--blue)" />
          <span>Garansi Revisi Sampai Puas</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={15} color="var(--orange)" />
          <span>Garansi Identitas &amp; File 100% Rahasia</span>
        </div>
      </div>

      {modalOpen && (
        <OrderModal service={service} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
