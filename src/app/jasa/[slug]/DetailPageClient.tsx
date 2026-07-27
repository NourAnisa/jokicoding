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
    <div className="glass-panel" style={{
      padding: '30px',
      position: 'sticky',
      top: '100px',
      border: '1px solid var(--border-glow)'
    }}>
      <span className="badge badge-emerald" style={{ marginBottom: '10px' }}>Harga Transparan</span>
      <div style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>Mulai dari</span>
        <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--price-color)' }}>
          {formatCurrency(service.price)}
        </span>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}> {service.priceUnit}</span>
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="btn-whatsapp"
        style={{
          width: '100%',
          justifyContent: 'center',
          padding: '16px',
          fontSize: '1.05rem',
          marginBottom: '16px'
        }}
      >
        Pesan Jasa Ini Sekarang <ArrowRight size={20} />
      </button>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        fontSize: '0.82rem',
        color: 'var(--text-muted)',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <QrCode size={16} color="var(--accent-emerald)" />
          <span>Dukungan Bayar QRIS & GoPay Instant</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <RefreshCw size={16} color="var(--accent-indigo)" />
          <span>Garansi Revisi Sampai Puas</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={16} color="var(--accent-amber)" />
          <span>Garansi Identitas & File 100% Rahasia</span>
        </div>
      </div>

      {modalOpen && (
        <OrderModal service={service} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
