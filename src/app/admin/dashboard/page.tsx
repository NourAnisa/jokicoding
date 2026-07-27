'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Service, Order, SiteConfig, ServiceCategory, Partner } from '@/types';
import {
  getServices, saveServices,
  getPartners, savePartners,
  getOrders, updateOrderStatus, deleteOrder,
  getSiteConfig, saveSiteConfig
} from '@/lib/data';
import { formatCurrency } from '@/lib/whatsapp';
import { saveAdminPin, verifyAdminPin, isSessionValid, destroySession } from '@/lib/auth';
import {
  ShieldCheck, Plus, Trash2, Edit, LogOut,
  Package, ShoppingBag, Settings, Building2, Save, Lock, KeyRound
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'services' | 'partners' | 'orders' | 'config'>('services');

  const [services, setServices] = useState<Service[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [config, setConfig] = useState<SiteConfig>({
    brandName: '', tagline: '', adminPhone: ''
  });

  // Service Modal State
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceSlug, setServiceSlug] = useState('');
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>('IT & Web');
  const [servicePrice, setServicePrice] = useState<number>(50000);
  const [servicePriceUnit, setServicePriceUnit] = useState('/proyek');
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceFeatures, setServiceFeatures] = useState('');
  const [serviceEstTime, setServiceEstTime] = useState('1-2 Hari');

  // Partner Modal State
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null);
  const [partnerName, setPartnerName] = useState('');
  const [partnerCategory, setPartnerCategory] = useState('');
  const [partnerLogoUrl, setPartnerLogoUrl] = useState('');

  // Password Security Change State
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState<{ text: string; error: boolean } | null>(null);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPinChangeMsg(null);

    if (!verifyAdminPin(currentPinInput)) {
      setPinChangeMsg({ text: 'Password Admin saat ini salah!', error: true });
      return;
    }
    if (newPinInput.length < 6) {
      setPinChangeMsg({ text: 'Password Baru minimal harus 6 karakter!', error: true });
      return;
    }
    if (newPinInput !== confirmPinInput) {
      setPinChangeMsg({ text: 'Konfirmasi Password Baru tidak cocok!', error: true });
      return;
    }

    saveAdminPin(newPinInput);
    setCurrentPinInput('');
    setNewPinInput('');
    setConfirmPinInput('');
    setPinChangeMsg({ text: '✓ Password Admin Berhasil Diperbarui!', error: false });
  };

  useEffect(() => {
    if (!isSessionValid()) {
      router.push('/admin/login');
      return;
    }
    setServices(getServices());
    setPartners(getPartners());
    setOrders(getOrders());
    setConfig(getSiteConfig());
  }, [router]);

  const handleLogout = () => {
    destroySession();
    router.push('/admin/login');
  };

  // Service Handlers
  const handleOpenAddService = () => {
    setEditingServiceId(null);
    setServiceTitle('');
    setServiceSlug('');
    setServiceCategory('IT & Web');
    setServicePrice(50000);
    setServicePriceUnit('/proyek');
    setServiceDescription('');
    setServiceFeatures('Garansi Revisi\nPengerjaan Rapi\nDokumentasi Lengkap');
    setServiceEstTime('1-2 Hari');
    setIsServiceModalOpen(true);
  };

  const handleOpenEditService = (srv: Service) => {
    setEditingServiceId(srv.id);
    setServiceTitle(srv.title);
    setServiceSlug(srv.slug);
    setServiceCategory(srv.category);
    setServicePrice(srv.price);
    setServicePriceUnit(srv.priceUnit);
    setServiceDescription(srv.description);
    setServiceFeatures(srv.features.join('\n'));
    setServiceEstTime(srv.estimatedTime);
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    const featuresList = serviceFeatures.split('\n').filter(f => f.trim().length > 0);
    const slugFinal = serviceSlug.trim() || serviceTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    let updated: Service[];
    if (editingServiceId) {
      updated = services.map(s => s.id === editingServiceId ? {
        ...s,
        title: serviceTitle,
        slug: slugFinal,
        category: serviceCategory,
        price: Number(servicePrice),
        priceUnit: servicePriceUnit,
        description: serviceDescription,
        features: featuresList,
        estimatedTime: serviceEstTime
      } : s);
    } else {
      const newService: Service = {
        id: `srv-${Date.now()}`,
        title: serviceTitle,
        slug: slugFinal,
        category: serviceCategory,
        price: Number(servicePrice),
        priceUnit: servicePriceUnit,
        description: serviceDescription,
        fullDescription: serviceDescription,
        features: featuresList,
        estimatedTime: serviceEstTime,
        rating: 5.0,
        reviewCount: 1,
        iconName: 'Code'
      };
      updated = [newService, ...services];
    }

    setServices(updated);
    saveServices(updated);
    setIsServiceModalOpen(false);
  };

  const handleDeleteService = (id: string) => {
    if (confirm('Yakin ingin menghapus jenis jasa ini?')) {
      const updated = services.filter(s => s.id !== id);
      setServices(updated);
      saveServices(updated);
    }
  };

  // Partner Logo Image Upload File Handler
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPartnerLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Partner Handlers
  const handleOpenAddPartner = () => {
    setEditingPartnerId(null);
    setPartnerName('');
    setPartnerCategory('Teknologi');
    setPartnerLogoUrl('');
    setIsPartnerModalOpen(true);
  };

  const handleOpenEditPartner = (ptr: Partner) => {
    setEditingPartnerId(ptr.id);
    setPartnerName(ptr.name);
    setPartnerCategory(ptr.category || '');
    setPartnerLogoUrl(ptr.logoUrl || '');
    setIsPartnerModalOpen(true);
  };

  const handleSavePartner = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: Partner[];

    if (editingPartnerId) {
      updated = partners.map(p => p.id === editingPartnerId ? {
        ...p,
        name: partnerName,
        category: partnerCategory,
        logoUrl: partnerLogoUrl
      } : p);
    } else {
      const newPartner: Partner = {
        id: `part-${Date.now()}`,
        name: partnerName,
        category: partnerCategory,
        logoUrl: partnerLogoUrl
      };
      updated = [...partners, newPartner];
    }

    setPartners(updated);
    savePartners(updated);
    setIsPartnerModalOpen(false);
  };

  const handleDeletePartner = (id: string) => {
    if (confirm('Yakin ingin menghapus Mitra ini?')) {
      const updated = partners.filter(p => p.id !== id);
      setPartners(updated);
      savePartners(updated);
    }
  };

  // Order Handlers
  const handleStatusChange = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status);
    setOrders(getOrders());
  };

  const handleDeleteOrderClick = (orderId: string) => {
    if (confirm('Hapus riwayat pesanan ini?')) {
      deleteOrder(orderId);
      setOrders(getOrders());
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveSiteConfig(config);
    alert('Pengaturan website berhasil disimpan!');
  };

  return (
    <div style={{ paddingTop: '36px', paddingBottom: '80px', background: 'var(--paper)', minHeight: '100vh' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '16px',
          background: 'var(--white)',
          border: '1px solid var(--paper-3)',
          padding: '24px 28px',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '32px',
          boxShadow: 'var(--shadow-xs)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '10px',
              background: 'var(--orange)', color: '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ink)' }}>Dashboard Admin JokiCoding</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-3)', marginTop: '2px' }}>
                Kelola jenis jasa, mitra, pesanan masuk, & pengaturan WhatsApp/QRIS.
              </p>
            </div>
          </div>

          <button onClick={handleLogout} className="btn btn-outline btn-sm" style={{ color: '#dc2626', borderColor: 'var(--paper-3)' }}>
            <LogOut size={15} /> Keluar Admin
          </button>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
          {[
            { key: 'services', label: `Jasa (${services.length})`, icon: Package },
            { key: 'partners', label: `Mitra (${partners.length})`, icon: Building2 },
            { key: 'orders', label: `Pesanan (${orders.length})`, icon: ShoppingBag },
            { key: 'config', label: 'Pengaturan WA & QRIS', icon: Settings },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`filter-tab ${activeTab === key ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px' }}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        {/* TAB 1: KELOLA JENIS JASA */}
        {activeTab === 'services' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ color: 'var(--ink)', fontSize: '1.1rem', fontWeight: 600 }}>Daftar Jasa Ditampilkan</h3>
              <button onClick={handleOpenAddService} className="btn btn-orange btn-sm">
                <Plus size={16} /> Tambah Jasa Baru
              </button>
            </div>

            <div className="catalog-grid">
              {services.map((srv) => (
                <div key={srv.id} className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span className="tag tag-blue">{srv.category}</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--green)' }}>
                        {formatCurrency(srv.price)}
                      </span>
                    </div>
                    <h4 style={{ color: 'var(--ink)', fontSize: '1rem', fontWeight: 600, marginBottom: '6px' }}>{srv.title}</h4>
                    <p style={{ color: 'var(--ink-3)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '16px' }}>{srv.description}</p>
                  </div>

                  <div style={{ borderTop: '1px solid var(--paper-3)', paddingTop: '12px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button onClick={() => handleOpenEditService(srv)} className="btn btn-outline btn-sm">
                      <Edit size={14} /> Edit
                    </button>
                    <button onClick={() => handleDeleteService(srv.id)} className="btn btn-outline btn-sm" style={{ color: '#dc2626' }}>
                      <Trash2 size={14} /> Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: KELOLA MITRA */}
        {activeTab === 'partners' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ color: 'var(--ink)', fontSize: '1.1rem', fontWeight: 600 }}>Daftar Mitra & Logo</h3>
              <button onClick={handleOpenAddPartner} className="btn btn-orange btn-sm">
                <Plus size={16} /> Tambah Mitra Baru
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {partners.map((ptr) => (
                <div key={ptr.id} className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {ptr.logoUrl ? (
                      <img src={ptr.logoUrl} alt={ptr.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--paper-3)', background: '#fff' }} />
                    ) : (
                      <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--paper-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Building2 size={20} color="var(--ink-3)" />
                      </div>
                    )}
                    <div>
                      <h4 style={{ color: 'var(--ink)', fontSize: '0.9rem', fontWeight: 600 }}>{ptr.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--ink-3)' }}>{ptr.category || 'Mitra Usaha'}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => handleOpenEditPartner(ptr)} className="btn btn-outline btn-sm" style={{ padding: '6px' }}>
                      <Edit size={14} />
                    </button>
                    <button onClick={() => handleDeletePartner(ptr.id)} className="btn btn-outline btn-sm" style={{ padding: '6px', color: '#dc2626' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DAFTAR PESANAN */}
        {activeTab === 'orders' && (
          <div>
            <h3 style={{ color: 'var(--ink)', fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px' }}>Riwayat Pesanan Pelanggan</h3>

            {orders.length > 0 ? (
              <div className="card" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', color: 'var(--ink)' }}>
                  <thead>
                    <tr style={{ background: 'var(--paper-2)', textAlign: 'left', borderBottom: '1px solid var(--paper-3)' }}>
                      <th style={{ padding: '12px 16px' }}>ID & Waktu</th>
                      <th style={{ padding: '12px 16px' }}>Pelanggan</th>
                      <th style={{ padding: '12px 16px' }}>Detail Jasa</th>
                      <th style={{ padding: '12px 16px' }}>Metode Bayar</th>
                      <th style={{ padding: '12px 16px' }}>Total</th>
                      <th style={{ padding: '12px 16px' }}>Status</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((ord) => (
                      <tr key={ord.id} style={{ borderBottom: '1px solid var(--paper-3)' }}>
                        <td style={{ padding: '12px 16px' }}>
                          <strong style={{ color: 'var(--orange)' }}>{ord.id}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--ink-3)' }}>
                            {new Date(ord.createdAt).toLocaleString('id-ID')}
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ fontWeight: 600 }}>{ord.customerName}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--ink-3)' }}>WA: {ord.customerPhone}</div>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ fontWeight: 600 }}>{ord.serviceTitle}</div>
                          {ord.programmingLanguage && <div style={{ fontSize: '0.78rem', color: 'var(--blue)' }}>💻 {ord.programmingLanguage}</div>}
                          {ord.hostingPlatform && <div style={{ fontSize: '0.78rem', color: 'var(--green)' }}>🌐 {ord.hostingPlatform}</div>}
                          {ord.pageCount && <div style={{ fontSize: '0.78rem', color: 'var(--orange)' }}>📄 {ord.pageCount} Halaman</div>}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span className="tag tag-green">{ord.paymentMethod.toUpperCase()}</span>
                        </td>
                        <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--green)' }}>
                          {formatCurrency(ord.totalPrice)}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <select
                            value={ord.status}
                            onChange={(e) => handleStatusChange(ord.id, e.target.value as Order['status'])}
                            className="form-select"
                            style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Dikonfirmasi</option>
                            <option value="processing">Dalam Proses</option>
                            <option value="completed">Selesai</option>
                            <option value="cancelled">Dibatalkan</option>
                          </select>
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                          <button onClick={() => handleDeleteOrderClick(ord.id)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer' }}>
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--ink-3)' }}>
                Belum ada pesanan masuk.
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CONFIG */}
        {activeTab === 'config' && (
          <div className="card" style={{ maxWidth: '560px', padding: '28px' }}>
            <h3 style={{ color: 'var(--ink)', fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px' }}>Pengaturan WhatsApp & QRIS</h3>
            <form onSubmit={handleSaveConfig} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="form-label">Nomor WhatsApp Admin 1 / Utama (misal 6281521907985)</label>
                <input
                  type="text"
                  value={config.adminPhone}
                  onChange={(e) => setConfig({ ...config, adminPhone: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Nomor WhatsApp Admin 2 / Cadangan (misal 6285155133070)</label>
                <input
                  type="text"
                  value={config.adminPhone2 || ''}
                  onChange={(e) => setConfig({ ...config, adminPhone2: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">URL Gambar QRIS Usaha</label>
                <input
                  type="text"
                  value={config.qrisImageUrl || ''}
                  onChange={(e) => setConfig({ ...config, qrisImageUrl: e.target.value })}
                  className="form-input"
                />
              </div>

              <button type="submit" className="btn btn-orange" style={{ alignSelf: 'flex-start' }}>
                <Save size={16} /> Simpan Pengaturan
              </button>
            </form>

            {/* PASSWORD SECURITY FORM */}
            <div style={{ marginTop: '36px', paddingTop: '28px', borderTop: '1px solid var(--paper-3)' }}>
              <h3 style={{ color: 'var(--ink)', fontSize: '1.1rem', fontWeight: 600, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <KeyRound size={18} color="var(--orange)" /> Keamanan & Ganti Password Admin
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-3)', marginBottom: '16px' }}>
                Ubah password / PIN akses portal admin untuk menjaga keamanan akun Anda.
              </p>

              {pinChangeMsg && (
                <div style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius)',
                  background: pinChangeMsg.error ? '#fef2f2' : '#f0fdf4',
                  border: pinChangeMsg.error ? '1px solid #fecaca' : '1px solid #bbf7d0',
                  color: pinChangeMsg.error ? '#dc2626' : '#16a34a',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  marginBottom: '16px',
                }}>
                  {pinChangeMsg.text}
                </div>
              )}

              <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label className="form-label">Password saat ini</label>
                  <input
                    type="password"
                    required
                    placeholder="Masukkan password admin saat ini"
                    value={currentPinInput}
                    onChange={(e) => setCurrentPinInput(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Password Baru</label>
                  <input
                    type="password"
                    required
                    placeholder="Masukkan password baru (min. 6 karakter)"
                    value={newPinInput}
                    onChange={(e) => setNewPinInput(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Konfirmasi Password Baru</label>
                  <input
                    type="password"
                    required
                    placeholder="Ketik ulang password baru"
                    value={confirmPinInput}
                    onChange={(e) => setConfirmPinInput(e.target.value)}
                    className="form-input"
                  />
                </div>

                <button type="submit" className="btn btn-outline" style={{ alignSelf: 'flex-start' }}>
                  <Lock size={15} /> Perbarui Password Admin
                </button>
              </form>
            </div>
          </div>
        )}

        {/* SERVICE MODAL */}
        {isServiceModalOpen && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
          }}>
            <div style={{
              background: 'var(--white)',
              color: 'var(--ink)',
              border: '1px solid var(--paper-3)',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '520px', width: '100%',
              padding: '28px',
              boxShadow: 'var(--shadow-md)',
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '18px', color: 'var(--ink)' }}>
                {editingServiceId ? 'Edit Jenis Jasa' : 'Tambah Jasa Baru'}
              </h3>

              <form onSubmit={handleSaveService} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label className="form-label">Nama Jasa</label>
                  <input type="text" required value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} className="form-input" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Kategori</label>
                    <select value={serviceCategory} onChange={(e) => setServiceCategory(e.target.value as ServiceCategory)} className="form-select">
                      <option value="IT & Web">IT & Web</option>
                      <option value="Akademik">Akademik</option>
                      <option value="Desain">Desain</option>
                      <option value="Multimedia">Multimedia</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Harga (IDR)</label>
                    <input type="number" required value={servicePrice} onChange={(e) => setServicePrice(Number(e.target.value))} className="form-input" />
                  </div>
                </div>

                <div>
                  <label className="form-label">Deskripsi Singkat</label>
                  <textarea rows={2} required value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} className="form-textarea" />
                </div>

                <div>
                  <label className="form-label">Keunggulan (1 baris per item)</label>
                  <textarea rows={3} value={serviceFeatures} onChange={(e) => setServiceFeatures(e.target.value)} className="form-textarea" />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="button" onClick={() => setIsServiceModalOpen(false)} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                    Batal
                  </button>
                  <button type="submit" className="btn btn-orange" style={{ flex: 1, justifyContent: 'center' }}>
                    Simpan Jasa
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* PARTNER MODAL */}
        {isPartnerModalOpen && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
          }}>
            <div style={{
              background: 'var(--white)',
              color: 'var(--ink)',
              border: '1px solid var(--paper-3)',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '460px', width: '100%',
              padding: '28px',
              boxShadow: 'var(--shadow-md)',
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '18px', color: 'var(--ink)' }}>
                {editingPartnerId ? 'Edit Mitra' : 'Tambah Mitra Baru'}
              </h3>

              <form onSubmit={handleSavePartner} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label className="form-label">Nama Mitra / Perusahaan / Kampus</label>
                  <input type="text" required placeholder="misal: Kemendikbud Kampus Merdeka" value={partnerName} onChange={(e) => setPartnerName(e.target.value)} className="form-input" />
                </div>

                <div>
                  <label className="form-label">Kategori Mitra</label>
                  <input type="text" placeholder="misal: Pendidikan / Perbankan / Teknologi" value={partnerCategory} onChange={(e) => setPartnerCategory(e.target.value)} className="form-input" />
                </div>

                <div>
                  <label className="form-label">Upload File Gambar Logo Mitra</label>
                  <input type="file" accept="image/*" onChange={handleLogoFileUpload} className="form-input" style={{ padding: '6px' }} />
                  {partnerLogoUrl && (
                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={partnerLogoUrl} alt="Preview" style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover', border: '1px solid var(--paper-3)' }} />
                      <span style={{ fontSize: '0.8rem', color: 'var(--green)', fontWeight: 600 }}>✓ Logo Siap Diunggah</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="form-label">Atau Masukkan URL Gambar (Opsional)</label>
                  <input type="text" placeholder="https://..." value={partnerLogoUrl} onChange={(e) => setPartnerLogoUrl(e.target.value)} className="form-input" />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="button" onClick={() => setIsPartnerModalOpen(false)} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                    Batal
                  </button>
                  <button type="submit" className="btn btn-orange" style={{ flex: 1, justifyContent: 'center' }}>
                    Simpan Mitra & Logo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
