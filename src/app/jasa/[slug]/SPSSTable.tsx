'use client';

import { useState } from 'react';
import { SPSS_TEST_LIST } from '@/lib/spssData';
import { formatCurrency } from '@/lib/whatsapp';
import { Search } from 'lucide-react';

export default function SPSSTable() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Uji Dasar & Asumsi', 'Korelasi & Bivariat', 'Regresi & Instrumen', 'Paket & Multivariat Kompleks'];

  const filtered = SPSS_TEST_LIST.filter(item => {
    const matchesCat = activeCategory === 'Semua' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(query.toLowerCase()) ||
                          item.scope.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{
      marginTop: '40px',
      padding: '28px',
      background: 'var(--paper-2)',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--paper-3)',
    }}>
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>
          📊 Daftar Lengkap Uji & Paket Olah Data SPSS (98 Jenis Uji)
        </h3>
        <p style={{ fontSize: '0.865rem', color: 'var(--ink-3)' }}>
          Cari jenis uji statistik yang Anda butuhkan di bawah ini. Tarif transparan, rapi, dan termasuk penjelasan output.
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} color="var(--ink-3)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Cari uji SPSS... (contoh: Normalitas, Regresi, ANOVA, Chi-Square, Cronbach)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '36px', background: 'var(--white)' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 600,
                border: activeCategory === cat ? '1px solid var(--ink)' : '1px solid var(--paper-3)',
                background: activeCategory === cat ? 'var(--ink)' : 'var(--white)',
                color: activeCategory === cat ? 'var(--paper)' : 'var(--ink-2)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', borderRadius: 'var(--radius)', border: '1px solid var(--paper-3)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.865rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--paper-3)', color: 'var(--ink)' }}>
              <th style={{ padding: '10px 14px', fontWeight: 600 }}>Jenis Uji / Paket Analisis (SPSS)</th>
              <th style={{ padding: '10px 14px', fontWeight: 600 }}>Jumlah Variabel / Kelompok</th>
              <th style={{ padding: '10px 14px', fontWeight: 600, textAlign: 'right' }}>Harga</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((item, idx) => (
                <tr key={item.id} style={{
                  borderBottom: '1px solid var(--paper-3)',
                  background: idx % 2 === 0 ? 'var(--white)' : 'var(--paper)',
                }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>
                    {item.name}
                  </td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-3)' }}>
                    {item.scope}
                  </td>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--green)', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    {formatCurrency(item.price)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} style={{ padding: '24px', textAlign: 'center', color: 'var(--ink-3)' }}>
                  Tidak ada uji SPSS yang cocok dengan pencarian <strong>"{query}"</strong>.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
