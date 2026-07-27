'use client';

import { useEffect, useState } from 'react';
import { Partner } from '@/types';
import { getPartners } from '@/lib/data';
import { Building2 } from 'lucide-react';

export default function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => { setPartners(getPartners()); }, []);

  if (!partners || partners.length === 0) return null;

  return (
    <div style={{
      padding: '24px 0',
      borderBottom: '1px solid var(--paper-3)',
      background: 'var(--paper-2)',
    }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <span className="label" style={{ flexShrink: 0, color: 'var(--ink-4)' }}>
            Mitra kami
          </span>
          <div style={{ width: '1px', height: '20px', background: 'var(--paper-3)', flexShrink: 0 }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            {partners.map((p) => (
              <div key={p.id} style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '6px 14px',
                background: 'var(--white)',
                border: '1px solid var(--paper-3)',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-xs)',
              }}>
                {p.logoUrl ? (
                  <img src={p.logoUrl} alt={p.name} style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    objectFit: 'cover', background: '#fff',
                  }} />
                ) : (
                  <Building2 size={14} color="var(--ink-3)" />
                )}
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink-2)' }}>
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
