'use client';

import Link from 'next/link';
import { Service } from '@/types';
import { formatCurrency } from '@/lib/whatsapp';
import {
  Code, Server, GraduationCap, BookOpenCheck, FileText,
  Newspaper, Keyboard, PenTool, Presentation, FileCheck,
  Palette, Video, Star, ArrowRight, Clock, Check
} from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onOrderClick: (service: Service) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Code, Server, GraduationCap, BookOpenCheck, FileText,
  Newspaper, Keyboard, PenTool, Presentation, FileCheck, Palette, Video,
};

const CATEGORY_TAG: Record<string, string> = {
  'IT & Web':   'tag-blue',
  'Akademik':   'tag-green',
  'Desain':     'tag-orange',
  'Multimedia': 'tag-purple',
};

const CATEGORY_ACCENT: Record<string, string> = {
  'IT & Web':   '#1d4ed8',
  'Akademik':   '#16a34a',
  'Desain':     '#e05c2a',
  'Multimedia': '#6d28d9',
};

export default function ServiceCard({ service, onOrderClick }: ServiceCardProps) {
  const IconComponent = ICON_MAP[service.iconName] || Code;
  const tagClass = CATEGORY_TAG[service.category] || 'tag-blue';
  const accent = CATEGORY_ACCENT[service.category] || '#1d4ed8';

  return (
    <article className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Accent top bar */}
      <div style={{ height: '3px', background: accent, borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }} />

      <div style={{ padding: '22px 22px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <span className={`tag ${tagClass}`} style={{ marginBottom: '10px', display: 'inline-block' }}>
              {service.category}
            </span>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.3, color: 'var(--ink)' }}>
              <Link href={`/jasa/${service.slug}`} style={{ color: 'inherit' }}>
                {service.title}
              </Link>
            </h3>
          </div>
          <div style={{
            width: '38px', height: '38px', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--paper-2)', flexShrink: 0, marginLeft: '12px',
          }}>
            <IconComponent size={18} color={accent} />
          </div>
        </div>

        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '0.78rem', color: 'var(--ink-4)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#ca8a04', fontWeight: 600 }}>
            <Star size={11} fill="#ca8a04" color="#ca8a04" />
            {service.rating}
          </span>
          <span>·</span>
          <span>{service.reviewCount} pesanan</span>
          <span>·</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Clock size={11} /> {service.estimatedTime}
          </span>
          {service.popular && (
            <>
              <span>·</span>
              <span style={{ color: accent, fontWeight: 700 }}>Terpopuler</span>
            </>
          )}
        </div>

        {/* Description */}
        <p style={{ fontSize: '0.865rem', color: 'var(--ink-3)', lineHeight: 1.6, marginBottom: '14px' }}>
          {service.description}
        </p>

        {/* Features */}
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px', flex: 1 }}>
          {service.features.slice(0, 3).map((feat, i) => (
            <li key={i} style={{ display: 'flex', gap: '8px', fontSize: '0.82rem', color: 'var(--ink-3)', alignItems: 'flex-start' }}>
              <Check size={13} color="var(--green)" style={{ marginTop: '2px', flexShrink: 0 }} strokeWidth={2.5} />
              {feat}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div style={{
          borderTop: '1px solid var(--paper-3)',
          paddingTop: '14px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--ink-4)', fontWeight: 500 }}>Mulai dari</div>
            <div className="price">{formatCurrency(service.price)}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--ink-4)' }}>{service.priceUnit}</div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link href={`/jasa/${service.slug}`} className="btn btn-outline btn-sm">
              Detail
            </Link>
            <button onClick={() => onOrderClick(service)} className="btn btn-orange btn-sm">
              Pesan <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
