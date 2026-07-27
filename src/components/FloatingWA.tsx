'use client';

import { MessageSquare } from 'lucide-react';
import { generateGeneralWhatsAppLink } from '@/lib/whatsapp';
import { DEFAULT_SITE_CONFIG } from '@/lib/data';

export default function FloatingWA() {
  const waLink = generateGeneralWhatsAppLink(DEFAULT_SITE_CONFIG.adminPhone);

  return (
    <>
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp Admin"
        id="floating-wa"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 90,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#25d366',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4), 0 2px 6px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          transition: 'all 0.25s var(--ease-out, cubic-bezier(0.22,1,0.36,1))',
          textDecoration: 'none',
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
        <MessageSquare size={24} />
        {/* Online indicator dot */}
        <span style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          width: '12px',
          height: '12px',
          backgroundColor: '#34d399',
          borderRadius: '50%',
          border: '2px solid #25d366',
          animation: 'pulse-dot 2s infinite',
        }} />
      </a>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
      `}</style>
    </>
  );
}
