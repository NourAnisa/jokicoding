'use client';

import { useState, useEffect } from 'react';
import { Service, PaymentMethod } from '@/types';
import { DEFAULT_SITE_CONFIG, saveOrder } from '@/lib/data';
import { generateWhatsAppLink, formatCurrency } from '@/lib/whatsapp';
import { X, QrCode, CreditCard, Banknote, ArrowRight, ShieldCheck, Copy, Check, Code, Server, FileText, Plus, Minus } from 'lucide-react';

interface OrderModalProps {
  service: Service | null;
  onClose: () => void;
}

export default function OrderModal({ service, onClose }: OrderModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qris_gopay');
  const [notes, setNotes] = useState('');
  const [deadline, setDeadline] = useState('');

  // Custom Service-Specific Options
  const [programmingLanguage, setProgrammingLanguage] = useState('Next.js / React (TypeScript)');
  const [hostingPlatform, setHostingPlatform] = useState('Vercel (Gratis SSL/HTTPS)');
  const [pageCount, setPageCount] = useState<number>(1);

  const [copiedBank, setCopiedBank] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine if service is page/unit based
  const isPageBasedService = Boolean(
    service && (
      service.priceUnit.includes('/halaman') ||
      service.priceUnit.includes('/bab') ||
      service.priceUnit.includes('/artikel') ||
      service.priceUnit.includes('/slide') ||
      service.slug.includes('tulis-tangan') ||
      service.slug.includes('pengetikan') ||
      service.slug.includes('makalah') ||
      service.slug.includes('skripsi')
    )
  );

  const isCodingService = Boolean(service && (service.slug === 'jasa-ngoding' || service.category === 'IT & Web' && service.slug !== 'jasa-hosting'));
  const isHostingService = Boolean(service && service.slug === 'jasa-hosting');

  // Calculate dynamic total price
  const calculatedTotalPrice = service
    ? isPageBasedService
      ? service.price * Math.max(1, pageCount)
      : service.price
    : 0;

  if (!service) return null;

  const handleCopyBank = () => {
    if (DEFAULT_SITE_CONFIG.bankInfo) {
      navigator.clipboard.writeText(DEFAULT_SITE_CONFIG.bankInfo.accountNumber);
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Mohon isi Nama Lengkap dan Nomor WhatsApp Anda.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        serviceId: service.id,
        serviceTitle: service.title,
        customerName,
        customerPhone,
        customerEmail,
        paymentMethod,
        notes,
        deadline,
        totalPrice: calculatedTotalPrice,
        programmingLanguage: isCodingService ? programmingLanguage : undefined,
        hostingPlatform: isHostingService ? hostingPlatform : undefined,
        pageCount: isPageBasedService ? pageCount : undefined,
      };

      const saved = saveOrder(orderPayload);

      const waLink = generateWhatsAppLink(DEFAULT_SITE_CONFIG.adminPhone, {
        ...saved,
        ...orderPayload
      });

      window.open(waLink, '_blank');
      onClose();
    } catch (err) {
      console.error('Order save error:', err);
      alert('Terjadi kesalahan saat memproses pesanan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '600px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        backgroundColor: 'var(--bg-secondary)',
        padding: '28px',
        position: 'relative',
        borderRadius: 'var(--radius-lg)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <span className="badge badge-emerald" style={{ marginBottom: '6px' }}>Formulir Pemesanan Custom</span>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>{service.title}</h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-card-hover)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              padding: '6px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Pricing Notice */}
        <div style={{
          backgroundColor: 'var(--badge-indigo-bg)',
          border: '1px solid rgba(79, 70, 229, 0.25)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimasi Total Biaya</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--price-color)' }}>
              {formatCurrency(calculatedTotalPrice)}
              {isPageBasedService && (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  {' '}({pageCount} × {formatCurrency(service.price)})
                </span>
              )}
            </div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--accent-indigo)' }}>
            ⚡ Estimasi: <strong>{service.estimatedTime}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* CUSTOM OPTION 1: Bahasa Pemrograman for Jasa Ngoding */}
          {isCodingService && (
            <div style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '14px'
            }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                <Code size={16} color="var(--accent-indigo)" /> Pilih Bahasa Pemrograman / Framework:
              </label>
              <select
                value={programmingLanguage}
                onChange={(e) => setProgrammingLanguage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  outline: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 600
                }}
              >
                <option value="Next.js / React (TypeScript)">Next.js / React (TypeScript / JS)</option>
                <option value="PHP / Laravel / CodeIgniter">PHP / Laravel / CodeIgniter</option>
                <option value="Python / Django / Bot Script">Python / Django / FastApi / Bot Script</option>
                <option value="Node.js / Express / REST API">Node.js / Express / NestJS</option>
                <option value="C++ / Java / Algoritma & Struktur Data">C++ / Java / Algoritma & Data Structure</option>
                <option value="HTML5 / CSS3 / JavaScript Vanilla">HTML5 / CSS3 / JS Vanilla</option>
              </select>
            </div>
          )}

          {/* CUSTOM OPTION 2: Platform Hosting for Jasa Hosting */}
          {isHostingService && (
            <div style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '14px'
            }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                <Server size={16} color="var(--accent-emerald)" /> Pilih Jenis Hosting / Platform Server:
              </label>
              <select
                value={hostingPlatform}
                onChange={(e) => setHostingPlatform(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  outline: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 600
                }}
              >
                <option value="Vercel (Gratis SSL & CDN)">Vercel Deployment (Gratis SSL & CDN)</option>
                <option value="Netlify (Gratis Hosting)">Netlify Deployment (Gratis)</option>
                <option value="VPS Linux (Ubuntu/Debian Server)">VPS Linux (Ubuntu/Debian Nginx/Apache)</option>
                <option value="cPanel Shared Hosting">cPanel Shared Hosting (.com/.id)</option>
                <option value="Supabase PostgreSQL DB">Supabase Database & Auth Setup</option>
              </select>
            </div>
          )}

          {/* CUSTOM OPTION 3: Jumlah Halaman/Unit for Page-based services */}
          {isPageBasedService && (
            <div style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '14px'
            }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                <FileText size={16} color="var(--accent-amber)" /> Jumlah Halaman / Unit:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setPageCount(Math.max(1, pageCount - 1))}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-main)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  min={1}
                  value={pageCount}
                  onChange={(e) => setPageCount(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{
                    width: '90px',
                    textAlign: 'center',
                    padding: '8px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setPageCount(pageCount + 1)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-main)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Plus size={16} />
                </button>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Halaman / Slide / Bab
                </span>
              </div>
            </div>
          )}

          {/* Customer Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
              Nama Lengkap <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Budi Santoso"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                outline: 'none'
              }}
            />
          </div>

          {/* Customer Phone */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
              Nomor WhatsApp Active <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="Contoh: 08123456789"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                outline: 'none'
              }}
            />
          </div>

          {/* Target Deadline */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
              Target Tanggal Selesai (Deadline)
            </label>
            <input
              type="text"
              placeholder="Contoh: Besok sore / 30 Juli 2026"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                outline: 'none'
              }}
            />
          </div>

          {/* Payment Method Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
              Pilih Metode Pembayaran <span style={{ color: '#ef4444' }}>*</span>
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setPaymentMethod('qris_gopay')}
                style={{
                  padding: '12px 8px',
                  borderRadius: '10px',
                  border: paymentMethod === 'qris_gopay' ? '2px solid var(--accent-emerald)' : '1px solid var(--border-color)',
                  backgroundColor: paymentMethod === 'qris_gopay' ? 'var(--badge-emerald-bg)' : 'var(--bg-primary)',
                  color: paymentMethod === 'qris_gopay' ? 'var(--badge-emerald-text)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}
              >
                <QrCode size={20} style={{ margin: '0 auto 4px auto' }} />
                <div>GoPay / QRIS</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('transfer_bank')}
                style={{
                  padding: '12px 8px',
                  borderRadius: '10px',
                  border: paymentMethod === 'transfer_bank' ? '2px solid var(--accent-indigo)' : '1px solid var(--border-color)',
                  backgroundColor: paymentMethod === 'transfer_bank' ? 'var(--badge-indigo-bg)' : 'var(--bg-primary)',
                  color: paymentMethod === 'transfer_bank' ? 'var(--badge-indigo-text)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}
              >
                <CreditCard size={20} style={{ margin: '0 auto 4px auto' }} />
                <div>Transfer Bank</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                style={{
                  padding: '12px 8px',
                  borderRadius: '10px',
                  border: paymentMethod === 'cash' ? '2px solid var(--accent-amber)' : '1px solid var(--border-color)',
                  backgroundColor: paymentMethod === 'cash' ? 'var(--badge-amber-bg)' : 'var(--bg-primary)',
                  color: paymentMethod === 'cash' ? 'var(--badge-amber-text)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}
              >
                <Banknote size={20} style={{ margin: '0 auto 4px auto' }} />
                <div>Bayar Nanti</div>
              </button>
            </div>
          </div>

          {/* Conditional Payment Details */}
          {paymentMethod === 'qris_gopay' && (
            <div style={{
              backgroundColor: 'var(--badge-emerald-bg)',
              border: '1px solid rgba(5, 150, 105, 0.3)',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--badge-emerald-text)', marginBottom: '8px' }}>
                📲 Scan Kode QRIS (GoPay / OVO / DANA / M-Banking)
              </div>
              <img
                src={DEFAULT_SITE_CONFIG.qrisImageUrl}
                alt="QRIS Payment Code"
                style={{
                  width: '180px',
                  height: '180px',
                  margin: '0 auto 10px auto',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  padding: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
              />
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Buka aplikasi GoPay atau Mobile Banking Anda lalu scan QRIS di atas. Bukti pembayaran dapat dilampirkan langsung saat obrolan WhatsApp dibuka.
              </p>
            </div>
          )}

          {paymentMethod === 'transfer_bank' && DEFAULT_SITE_CONFIG.bankInfo && (
            <div style={{
              backgroundColor: 'var(--badge-indigo-bg)',
              border: '1px solid rgba(79, 70, 229, 0.3)',
              borderRadius: '12px',
              padding: '14px'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--badge-indigo-text)', marginBottom: '6px' }}>
                🏦 Rekening Bank Resmi JokiCoding
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {DEFAULT_SITE_CONFIG.bankInfo.bankName} - {DEFAULT_SITE_CONFIG.bankInfo.accountNumber}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    a.n {DEFAULT_SITE_CONFIG.bankInfo.accountHolder}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyBank}
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                >
                  {copiedBank ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                  <span>{copiedBank ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
              Catatan / Instruksi Pengerjaan (Opsional)
            </label>
            <textarea
              rows={3}
              placeholder="Contoh: Tolong buatkan makalah 10 halaman tentang AI, atau lampirkan instruksi dosen..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-whatsapp"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '14px',
              fontSize: '1rem',
              marginTop: '8px'
            }}
          >
            {isSubmitting ? 'Memproses...' : 'Kirim Pesanan ke WhatsApp Admin'} <ArrowRight size={18} />
          </button>

          <p style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <ShieldCheck size={14} /> Privasi identitas & file tugas 100% dijamin aman.
          </p>
        </form>
      </div>
    </div>
  );
}
