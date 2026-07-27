'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { generateGeneralWhatsAppLink } from '@/lib/whatsapp';
import { DEFAULT_SITE_CONFIG } from '@/lib/data';

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem('jokicoding_theme') as 'light' | 'dark') || 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('jokicoding_theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const wa = generateGeneralWhatsAppLink(DEFAULT_SITE_CONFIG.adminPhone);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: scrolled ? 'var(--paper)' : 'var(--paper)',
      borderBottom: `1px solid ${scrolled ? 'var(--paper-3)' : 'transparent'}`,
      transition: 'border-color 0.25s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: '64px', gap: '32px' }}>

        {/* Brand */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.35rem',
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
            fontWeight: 400,
          }}>
            JokiCoding
          </span>
          <span style={{
            fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em',
            textTransform: 'uppercase', padding: '2px 6px',
            background: 'var(--orange)', color: '#fff',
            borderRadius: '3px',
          }}>PRO</span>
        </Link>

        {/* Nav */}
        <nav id="main-nav" style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1 }}>
          {[
            ['/#katalog', 'Layanan'],
            ['/#keunggulan', 'Keunggulan'],
            ['/#cara-order', 'Cara Order'],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="btn btn-ghost" style={{ padding: '7px 13px', fontSize: '0.88rem', fontWeight: 500 }}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <Link href="/admin/dashboard" style={{
            fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink-3)',
            padding: '6px 12px', borderRadius: 'var(--radius)',
            border: '1px solid var(--paper-3)',
            transition: 'all 0.15s ease',
          }}>
            Admin
          </Link>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              width: '34px', height: '34px', borderRadius: 'var(--radius)',
              border: '1px solid var(--paper-3)',
              background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--ink-3)', transition: 'all 0.15s ease',
            }}
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} color="#f59e0b" />}
          </button>

          <a href={wa} target="_blank" rel="noopener noreferrer"
            className="btn btn-orange btn-sm" id="nav-wa-cta">
            Chat WA
          </a>

          <button
            id="mobile-menu-toggle"
            onClick={() => setOpen(!open)}
            style={{
              display: 'none',
              width: '34px', height: '34px',
              background: 'transparent',
              border: '1px solid var(--paper-3)',
              borderRadius: 'var(--radius)',
              cursor: 'pointer',
              color: 'var(--ink)',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'var(--paper)',
          borderTop: '1px solid var(--paper-3)',
          padding: '16px 28px 20px',
        }}>
          {[
            ['/#katalog', 'Layanan'],
            ['/#keunggulan', 'Keunggulan'],
            ['/#cara-order', 'Cara Order'],
            ['/admin/dashboard', 'Admin Dashboard'],
          ].map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '12px 0',
              fontSize: '1rem', fontWeight: 500,
              color: 'var(--ink)',
              borderBottom: '1px solid var(--paper-3)',
            }}>
              {label}
            </Link>
          ))}
          <a href={wa} target="_blank" rel="noopener noreferrer"
            className="btn btn-wa" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>
            Chat WhatsApp Admin
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          #main-nav { display: none !important; }
          #mobile-menu-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
