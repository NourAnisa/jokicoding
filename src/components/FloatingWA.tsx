'use client';

import { useState } from 'react';
import { MessageSquare, X, MessageCircle, PhoneCall } from 'lucide-react';
import { generateGeneralWhatsAppLink } from '@/lib/whatsapp';
import { DEFAULT_SITE_CONFIG } from '@/lib/data';

export default function FloatingWA() {
  const [isOpen, setIsOpen] = useState(false);

  const phone1 = DEFAULT_SITE_CONFIG.adminPhone;
  const phone2 = DEFAULT_SITE_CONFIG.adminPhone2 || '6285155133070';

  const waLink1 = generateGeneralWhatsAppLink(phone1, 'Halo Admin 1 JokiCoding, saya ingin berkonsultasi.');
  const waLink2 = generateGeneralWhatsAppLink(phone2, 'Halo Admin 2 JokiCoding, saya ingin berkonsultasi.');

  return (
    <>
      {/* Drawer Popup when clicked */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '96px',
          right: '28px',
          zIndex: 100,
          width: '320px',
          background: 'var(--white)',
          color: 'var(--ink)',
          border: '1.5px solid var(--paper-3)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          padding: '20px',
          animation: 'fadeUp 0.2s var(--ease)',
        }}>
          {/* Popup Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: '#25d366', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <MessageSquare size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink)' }}>Pilih Admin WhatsApp</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--green)', fontWeight: 600 }}>🟢 Online 24/7</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent', border: 'none',
                color: 'var(--ink-3)', cursor: 'pointer', padding: '4px',
              }}
            >
              <X size={18} />
            </button>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--ink-3)', marginBottom: '14px', lineHeight: 1.4 }}>
            Silakan pilih nomor WhatsApp admin untuk respon cepat:
          </p>

          {/* Admin 1 Button */}
          <a
            href={waLink1}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 14px',
              borderRadius: 'var(--radius)',
              background: 'var(--paper-2)',
              border: '1px solid var(--paper-3)',
              marginBottom: '10px',
              textDecoration: 'none',
              transition: 'all 0.18s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '#25d366';
              (e.currentTarget as HTMLElement).style.background = '#f0fdf4';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--paper-3)';
              (e.currentTarget as HTMLElement).style.background = 'var(--paper-2)';
            }}
          >
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--ink)' }}>Admin 1 (Utama)</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--ink-3)' }}>📞 0815-2190-7985</div>
            </div>
            <span style={{
              background: '#25d366', color: '#fff',
              fontSize: '0.75rem', fontWeight: 700,
              padding: '4px 10px', borderRadius: 'var(--radius)',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              <MessageCircle size={12} /> Chat
            </span>
          </a>

          {/* Admin 2 Button */}
          <a
            href={waLink2}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 14px',
              borderRadius: 'var(--radius)',
              background: 'var(--paper-2)',
              border: '1px solid var(--paper-3)',
              textDecoration: 'none',
              transition: 'all 0.18s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '#25d366';
              (e.currentTarget as HTMLElement).style.background = '#f0fdf4';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--paper-3)';
              (e.currentTarget as HTMLElement).style.background = 'var(--paper-2)';
            }}
          >
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--ink)' }}>Admin 2 (Cadangan)</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--ink-3)' }}>📞 0851-5513-3070</div>
            </div>
            <span style={{
              background: '#25d366', color: '#fff',
              fontSize: '0.75rem', fontWeight: 700,
              padding: '4px 10px', borderRadius: 'var(--radius)',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              <MessageCircle size={12} /> Chat
            </span>
          </a>
        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat WhatsApp Admin"
        id="floating-wa-toggle"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 99,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#25d366',
          border: 'none',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4), 0 2px 6px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          transition: 'all 0.25s var(--ease)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1.1) translateY(-3px)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(37, 211, 102, 0.55)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1) translateY(0)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.4), 0 2px 6px rgba(0,0,0,0.1)';
        }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {/* Pulse dot */}
        <span style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          width: '12px',
          height: '12px',
          backgroundColor: '#34d399',
          borderRadius: '50%',
          border: '2px solid #25d366',
        }} />
      </button>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
