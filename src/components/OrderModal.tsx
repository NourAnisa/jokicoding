'use client';

import { useState } from 'react';
import { Service, PaymentMethod } from '@/types';
import { DEFAULT_SITE_CONFIG, saveOrder } from '@/lib/data';
import { generateWhatsAppLink, formatCurrency } from '@/lib/whatsapp';
import { SPSS_TEST_LIST } from '@/lib/spssData';
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
  const [targetAdminPhone, setTargetAdminPhone] = useState<string>(DEFAULT_SITE_CONFIG.adminPhone);
  const [notes, setNotes] = useState('');
  const [deadline, setDeadline] = useState('');

  // Custom Service-Specific Options
  const [programmingLanguage, setProgrammingLanguage] = useState('Next.js / React (TypeScript)');
  const [hostingPlatform, setHostingPlatform] = useState('Vercel (Gratis SSL/HTTPS)');
  const [pageCount, setPageCount] = useState<number>(1);
  const [printType, setPrintType] = useState<'Hitam Putih' | 'Warna'>('Hitam Putih');
  const [selectedSPSSTestId, setSelectedSPSSTestId] = useState<string>('spss-1');

  const [copiedBank, setCopiedBank] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPrintService = Boolean(
    service && (
      service.slug === 'jasa-print' ||
      service.title.toLowerCase().includes('print') ||
      service.title.toLowerCase().includes('cetak')
    )
  );

  const isSPSSService = Boolean(
    service && (
      service.slug === 'olah-data-spss' ||
      service.title.toLowerCase().includes('spss')
    )
  );

  const isPageBasedService = Boolean(
    service && !isSPSSService && (
      isPrintService ||
      service.priceUnit.includes('/halaman') ||
      service.priceUnit.includes('/lembar') ||
      service.priceUnit.includes('/bab') ||
      service.priceUnit.includes('/artikel') ||
      service.priceUnit.includes('/slide') ||
      service.slug.includes('tulis-tangan') ||
      service.slug.includes('pengetikan') ||
      service.slug.includes('makalah')
    )
  );

  const isCodingService = Boolean(service && (service.slug === 'jasa-ngoding' || service.category === 'IT & Web' && service.slug !== 'jasa-hosting'));
  const isHostingService = Boolean(service && service.slug === 'jasa-hosting');

  const selectedSPSSTestObj = SPSS_TEST_LIST.find(t => t.id === selectedSPSSTestId);

  const currentUnitPrice = service
    ? isPrintService
      ? (printType === 'Warna' ? 800 : 400)
      : isSPSSService && selectedSPSSTestObj
      ? selectedSPSSTestObj.price
      : service.price
    : 0;

  const calculatedTotalPrice = service
    ? isSPSSService && selectedSPSSTestObj
      ? selectedSPSSTestObj.price
      : isPageBasedService
      ? currentUnitPrice * Math.max(1, pageCount)
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
        printType: isPrintService ? (printType === 'Warna' ? 'Cetak Warna (Rp 800/lembar)' : 'Hitam Putih (Rp 400/lembar)') : undefined,
        spssTest: isSPSSService && selectedSPSSTestObj ? `${selectedSPSSTestObj.name} [${selectedSPSSTestObj.scope}] - ${formatCurrency(selectedSPSSTestObj.price)}` : undefined,
      };

      const saved = saveOrder(orderPayload);

      const waLink = generateWhatsAppLink(targetAdminPhone || DEFAULT_SITE_CONFIG.adminPhone, {
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
    <div className="modal-overlay" style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '30px 16px',
      overflowY: 'auto',
    }}>
      <div className="modal-inner" style={{
        background: 'var(--white)',
        color: 'var(--ink)',
        border: '1px solid var(--paper-3)',
        borderRadius: 'var(--radius-lg)',
        maxWidth: '560px', width: '100%',
        margin: '0 auto 30px',
        padding: '28px',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <span className="tag tag-green" style={{ marginBottom: '6px' }}>Form Pemesanan</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--ink)' }}>{service.title}</h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--paper-2)',
              border: '1px solid var(--paper-3)',
              color: 'var(--ink-2)',
              padding: '6px',
              borderRadius: 'var(--radius)',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Total Price Notice */}
        <div style={{
          background: 'var(--paper-2)',
          border: '1px solid var(--paper-3)',
          borderRadius: 'var(--radius)',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--ink-3)' }}>Estimasi Total Biaya</span>
            <div className="price" style={{ fontSize: '1.4rem' }}>
              {formatCurrency(calculatedTotalPrice)}
              {isPageBasedService && (
                <span style={{ fontSize: '0.8rem', color: 'var(--ink-3)', fontWeight: 400 }}>
                  {' '}({pageCount} × {formatCurrency(service.price)})
                </span>
              )}
            </div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--ink-3)' }}>
            ⚡ Estimasi: <strong style={{ color: 'var(--ink)' }}>{service.estimatedTime}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* CUSTOM OPTION: Pilihan Uji SPSS */}
          {isSPSSService && (
            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                📊 Pilih Jenis Uji / Paket Analisis SPSS:
              </label>
              <select
                value={selectedSPSSTestId}
                onChange={(e) => setSelectedSPSSTestId(e.target.value)}
                className="form-select"
                style={{ fontSize: '0.85rem' }}
              >
                {(['Uji Dasar & Asumsi', 'Korelasi & Bivariat', 'Regresi & Instrumen', 'Paket & Multivariat Kompleks'] as const).map(cat => (
                  <optgroup key={cat} label={`── ${cat.toUpperCase()} ──`}>
                    {SPSS_TEST_LIST.filter(t => t.category === cat).map(t => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.scope}) — {formatCurrency(t.price)}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          )}

          {/* CUSTOM OPTION 1: Bahasa Pemrograman for Jasa Ngoding */}
          {isCodingService && (
            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Code size={15} color="var(--blue)" /> Bahasa Pemrograman / Framework:
              </label>
              <select
                value={programmingLanguage}
                onChange={(e) => setProgrammingLanguage(e.target.value)}
                className="form-select"
              >
                <option value="Next.js / React (TypeScript)">Next.js / React (TypeScript / JS)</option>
                <option value="PHP / Laravel / CodeIgniter">PHP / Laravel / CodeIgniter</option>
                <option value="Python / Django / Bot Script">Python / Django / FastApi / Bot Script</option>
                <option value="Node.js / Express / NestJS">Node.js / Express / NestJS</option>
                <option value="C++ / Java / Algoritma & Struktur Data">C++ / Java / Algoritma & Data Structure</option>
                <option value="HTML5 / CSS3 / JavaScript Vanilla">HTML5 / CSS3 / JS Vanilla</option>
              </select>
            </div>
          )}

          {/* CUSTOM OPTION: Tipe Print untuk Jasa Cetak / Print */}
          {isPrintService && (
            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                🖨️ Jenis Cetak / Print:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setPrintType('Hitam Putih')}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius)',
                    border: printType === 'Hitam Putih' ? '1.5px solid var(--ink)' : '1px solid var(--paper-3)',
                    background: printType === 'Hitam Putih' ? 'var(--ink)' : 'var(--white)',
                    color: printType === 'Hitam Putih' ? 'var(--paper)' : 'var(--ink-2)',
                    cursor: 'pointer',
                    fontSize: '0.83rem',
                    fontWeight: 600,
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div>⬛⬜ Hitam Putih (BW)</div>
                  <div style={{ fontSize: '0.73rem', opacity: 0.8 }}>Rp 400 / lembar</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPrintType('Warna')}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius)',
                    border: printType === 'Warna' ? '1.5px solid var(--ink)' : '1px solid var(--paper-3)',
                    background: printType === 'Warna' ? 'var(--ink)' : 'var(--white)',
                    color: printType === 'Warna' ? 'var(--paper)' : 'var(--ink-2)',
                    cursor: 'pointer',
                    fontSize: '0.83rem',
                    fontWeight: 600,
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div>🎨 Cetak Warna</div>
                  <div style={{ fontSize: '0.73rem', opacity: 0.8 }}>Rp 800 / lembar</div>
                </button>
              </div>
            </div>
          )}

          {/* CUSTOM OPTION 2: Platform Hosting for Jasa Hosting */}
          {isHostingService && (
            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Server size={15} color="var(--green)" /> Jenis Hosting / Platform Server:
              </label>
              <select
                value={hostingPlatform}
                onChange={(e) => setHostingPlatform(e.target.value)}
                className="form-select"
              >
                <option value="Vercel (Gratis SSL & CDN)">Vercel Deployment (Gratis SSL & CDN)</option>
                <option value="Netlify (Gratis Hosting)">Netlify Deployment (Gratis)</option>
                <option value="VPS Linux (Ubuntu/Debian Server)">VPS Linux (Ubuntu/Debian Nginx/Apache)</option>
                <option value="cPanel Shared Hosting">cPanel Shared Hosting (.com/.id)</option>
                <option value="Supabase PostgreSQL DB">Supabase Database & Auth Setup</option>
              </select>
            </div>
          )}

          {/* CUSTOM OPTION 3: Jumlah Halaman */}
          {isPageBasedService && (
            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileText size={15} color="var(--orange)" /> Jumlah Halaman / Unit:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setPageCount(Math.max(1, pageCount - 1))}
                  className="btn btn-outline btn-sm"
                  style={{ width: '36px', height: '36px', padding: 0, justifyContent: 'center' }}
                >
                  <Minus size={14} />
                </button>
                <input
                  type="number"
                  min={1}
                  value={pageCount}
                  onChange={(e) => setPageCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="form-input"
                  style={{ width: '80px', textAlign: 'center', fontWeight: 700 }}
                />
                <button
                  type="button"
                  onClick={() => setPageCount(pageCount + 1)}
                  className="btn btn-outline btn-sm"
                  style={{ width: '36px', height: '36px', padding: 0, justifyContent: 'center' }}
                >
                  <Plus size={14} />
                </button>
                <span style={{ fontSize: '0.83rem', color: 'var(--ink-3)' }}>
                  Halaman / Slide / Bab
                </span>
              </div>
            </div>
          )}

          {/* Customer Name */}
          <div>
            <label className="form-label">
              Nama Lengkap <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Budi Santoso"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="form-input"
            />
          </div>

          {/* Customer Phone */}
          <div>
            <label className="form-label">
              Nomor WhatsApp Active <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="Contoh: 08123456789"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="form-input"
            />
          </div>

          {/* Target Deadline */}
          <div>
            <label className="form-label">Target Tanggal Selesai (Deadline)</label>
            <input
              type="text"
              placeholder="Contoh: Besok sore / 30 Juli 2026"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="form-input"
            />
          </div>

          {/* Target Admin WhatsApp Selection */}
          <div>
            <label className="form-label">Pilih Admin WhatsApp Tujuan <span style={{ color: '#dc2626' }}>*</span></label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setTargetAdminPhone(DEFAULT_SITE_CONFIG.adminPhone)}
                style={{
                  padding: '10px 12px',
                  borderRadius: 'var(--radius)',
                  border: targetAdminPhone === DEFAULT_SITE_CONFIG.adminPhone ? '1.5px solid var(--ink)' : '1px solid var(--paper-3)',
                  background: targetAdminPhone === DEFAULT_SITE_CONFIG.adminPhone ? 'var(--ink)' : 'var(--white)',
                  color: targetAdminPhone === DEFAULT_SITE_CONFIG.adminPhone ? 'var(--paper)' : 'var(--ink-2)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  transition: 'background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease',
                }}
              >
                <div>💬 Admin 1 (Utama)</div>
                <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>0815-2190-7985</div>
              </button>

              <button
                type="button"
                onClick={() => setTargetAdminPhone(DEFAULT_SITE_CONFIG.adminPhone2 || '6285155133070')}
                style={{
                  padding: '10px 12px',
                  borderRadius: 'var(--radius)',
                  border: targetAdminPhone === (DEFAULT_SITE_CONFIG.adminPhone2 || '6285155133070') ? '1.5px solid var(--ink)' : '1px solid var(--paper-3)',
                  background: targetAdminPhone === (DEFAULT_SITE_CONFIG.adminPhone2 || '6285155133070') ? 'var(--ink)' : 'var(--white)',
                  color: targetAdminPhone === (DEFAULT_SITE_CONFIG.adminPhone2 || '6285155133070') ? 'var(--paper)' : 'var(--ink-2)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  transition: 'background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease',
                }}
              >
                <div>💬 Admin 2 (Cadangan)</div>
                <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>0851-5513-3070</div>
              </button>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="form-label">
              Pilih Metode Pembayaran <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { key: 'qris_gopay', label: 'GoPay / QRIS', icon: QrCode },
                { key: 'transfer_bank', label: 'Transfer Bank', icon: CreditCard },
                { key: 'cash', label: 'Bayar Nanti', icon: Banknote },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPaymentMethod(key as PaymentMethod)}
                  style={{
                    padding: '12px 8px',
                    borderRadius: 'var(--radius)',
                    border: paymentMethod === key ? '1.5px solid var(--ink)' : '1px solid var(--paper-3)',
                    background: paymentMethod === key ? 'var(--ink)' : 'var(--white)',
                    color: paymentMethod === key ? 'var(--paper)' : 'var(--ink-2)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    transition: 'background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease',
                  }}
                >
                  <Icon size={18} style={{ margin: '0 auto 4px' }} />
                  <div>{label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* QRIS / Bank Details */}
          {paymentMethod === 'qris_gopay' && (
            <div style={{
              background: 'var(--paper-2)',
              border: '1px solid var(--paper-3)',
              borderRadius: 'var(--radius)',
              padding: '16px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px' }}>
                📲 Scan Kode QRIS (GoPay / OVO / DANA / M-Banking)
              </div>
              <img
                src={DEFAULT_SITE_CONFIG.qrisImageUrl}
                alt="QRIS Payment Code"
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  height: 'auto',
                  margin: '0 auto 12px',
                  display: 'block',
                  borderRadius: 'var(--radius)',
                  background: '#ffffff',
                  padding: '8px',
                  border: '1px solid var(--paper-3)',
                  boxShadow: 'var(--shadow-xs)',
                }}
              />
              <p style={{ fontSize: '0.78rem', color: 'var(--ink-3)' }}>
                Buka aplikasi GoPay atau M-Banking lalu scan QRIS di atas. Bukti pembayaran dilampirkan saat chat WhatsApp dibuka.
              </p>
            </div>
          )}

          {paymentMethod === 'transfer_bank' && DEFAULT_SITE_CONFIG.bankInfo && (
            <div style={{
              background: 'var(--paper-2)',
              border: '1px solid var(--paper-3)',
              borderRadius: 'var(--radius)',
              padding: '14px',
            }}>
              <div style={{ fontSize: '0.83rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                🏦 Rekening Bank Resmi JokiCoding
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink)' }}>
                    {DEFAULT_SITE_CONFIG.bankInfo.bankName} - {DEFAULT_SITE_CONFIG.bankInfo.accountNumber}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--ink-3)' }}>
                    a.n {DEFAULT_SITE_CONFIG.bankInfo.accountHolder}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyBank}
                  className="btn btn-outline btn-sm"
                >
                  {copiedBank ? <Check size={13} color="var(--green)" /> : <Copy size={13} />}
                  <span>{copiedBank ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="form-label">Catatan / Instruksi Pengerjaan (Opsional)</label>
            <textarea
              rows={3}
              placeholder="Contoh: Tolong buatkan makalah 10 halaman tentang AI..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="form-textarea"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-wa"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '13px',
              fontSize: '0.95rem',
              marginTop: '4px',
            }}
          >
            {isSubmitting ? 'Memproses...' : 'Kirim Pesanan ke WhatsApp Admin'} <ArrowRight size={17} />
          </button>

          <p style={{ fontSize: '0.75rem', color: 'var(--ink-4)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <ShieldCheck size={14} /> Privasi identitas & file tugas 100% dijamin aman.
          </p>
        </form>
      </div>
    </div>
  );
}
