'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Service, Order, SiteConfig, ServiceCategory, Partner } from '@/types';
import {
  getServices,
  saveServices,
  getPartners,
  savePartners,
  getOrders,
  updateOrderStatus,
  deleteOrder,
  getSiteConfig,
  saveSiteConfig
} from '@/lib/data';
import { formatCurrency } from '@/lib/whatsapp';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit,
  LogOut,
  Package,
  ShoppingBag,
  Settings,
  Building2,
  Save,
  Upload,
  Image as ImageIcon
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'services' | 'partners' | 'orders' | 'config'>('services');

  const [services, setServices] = useState<Service[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [config, setConfig] = useState<SiteConfig>({
    brandName: '',
    tagline: '',
    adminPhone: ''
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

  // Auth Guard
  useEffect(() => {
    const isAuth = sessionStorage.getItem('jokicoding_admin_authenticated');
    if (!isAuth) {
      router.push('/admin/login');
      return;
    }

    setServices(getServices());
    setPartners(getPartners());
    setOrders(getOrders());
    setConfig(getSiteConfig());
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('jokicoding_admin_authenticated');
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

  // Config Save
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveSiteConfig(config);
    alert('Pengaturan website berhasil disimpan!');
  };

  return (
    <div style={{ paddingTop: '30px', paddingBottom: '80px' }}>
      <div className="container">
        {/* Admin Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-glow)',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '30px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'var(--gradient-primary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={26} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>Dashboard Admin JokiCoding</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Kelola jenis jasa, kelola daftar mitra (upload logo), pantau pesanan masuk, & atur sistem pembayaran.
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.85rem', color: '#ef4444' }}
          >
            <LogOut size={16} /> Keluar Admin
          </button>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
          <button
            onClick={() => setActiveTab('services')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              border: activeTab === 'services' ? '1px solid var(--accent-indigo)' : '1px solid var(--border-color)',
              backgroundColor: activeTab === 'services' ? 'var(--badge-indigo-bg)' : 'var(--bg-secondary)',
              color: activeTab === 'services' ? 'var(--badge-indigo-text)' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Package size={18} /> Kelola Jenis Jasa ({services.length})
          </button>

          <button
            onClick={() => setActiveTab('partners')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              border: activeTab === 'partners' ? '1px solid var(--accent-violet)' : '1px solid var(--border-color)',
              backgroundColor: activeTab === 'partners' ? 'var(--badge-indigo-bg)' : 'var(--bg-secondary)',
              color: activeTab === 'partners' ? 'var(--badge-indigo-text)' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Building2 size={18} /> Kelola Mitra / Upload Logo ({partners.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              border: activeTab === 'orders' ? '1px solid var(--accent-emerald)' : '1px solid var(--border-color)',
              backgroundColor: activeTab === 'orders' ? 'var(--badge-emerald-bg)' : 'var(--bg-secondary)',
              color: activeTab === 'orders' ? 'var(--badge-emerald-text)' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <ShoppingBag size={18} /> Pesanan Masuk ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('config')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              border: activeTab === 'config' ? '1px solid var(--accent-amber)' : '1px solid var(--border-color)',
              backgroundColor: activeTab === 'config' ? 'var(--badge-amber-bg)' : 'var(--bg-secondary)',
              color: activeTab === 'config' ? 'var(--badge-amber-text)' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Settings size={18} /> Pengaturan WA & QRIS
          </button>
        </div>

        {/* TAB 1: KELOLA JENIS JASA */}
        {activeTab === 'services' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem' }}>Daftar Jenis Jasa Ditampilkan</h3>
              <button onClick={handleOpenAddService} className="btn-primary" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
                <Plus size={18} /> Tambah Jenis Jasa Baru
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {services.map((srv) => (
                <div key={srv.id} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <span className="badge badge-indigo">{srv.category}</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--price-color)' }}>
                        {formatCurrency(srv.price)}
                      </span>
                    </div>
                    <h4 style={{ color: 'var(--text-main)', fontSize: '1.05rem', marginBottom: '6px' }}>{srv.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '12px' }}>{srv.description}</p>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button
                      onClick={() => handleOpenEditService(srv)}
                      className="btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteService(srv.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(239, 68, 68, 0.12)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontSize: '0.78rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Trash2 size={14} /> Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: KELOLA MITRA (WITH LOGO FILE UPLOAD) */}
        {activeTab === 'partners' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem' }}>Daftar Mitra & Upload Logo Perusahaan</h3>
              <button onClick={handleOpenAddPartner} className="btn-primary" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
                <Plus size={18} /> Tambah Mitra Baru (Upload Logo)
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {partners.map((ptr) => (
                <div key={ptr.id} className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {ptr.logoUrl ? (
                      <img
                        src={ptr.logoUrl}
                        alt={ptr.name}
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '8px',
                          objectFit: 'cover',
                          border: '1px solid var(--border-color)',
                          backgroundColor: '#ffffff'
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: 'var(--badge-indigo-bg)',
                        color: 'var(--accent-indigo)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Building2 size={22} />
                      </div>
                    )}
                    <div>
                      <h4 style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{ptr.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>{ptr.category || 'Mitra Usaha'}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => handleOpenEditPartner(ptr)} className="btn-secondary" style={{ padding: '6px', borderRadius: '6px' }}>
                      <Edit size={14} />
                    </button>
                    <button onClick={() => handleDeletePartner(ptr.id)} style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DAFTAR PESANAN MASUK */}
        {activeTab === 'orders' && (
          <div>
            <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem', marginBottom: '20px' }}>Riwayat Pesanan Pelanggan (Lengkap Pilihan Custom)</h3>

            {orders.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.85rem',
                  color: 'var(--text-main)',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden'
                }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-card-hover)', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '14px' }}>ID & Waktu</th>
                      <th style={{ padding: '14px' }}>Pelanggan</th>
                      <th style={{ padding: '14px' }}>Jasa Dipesan & Spesifikasi</th>
                      <th style={{ padding: '14px' }}>Metode Bayar</th>
                      <th style={{ padding: '14px' }}>Total Biaya</th>
                      <th style={{ padding: '14px' }}>Status</th>
                      <th style={{ padding: '14px', textAlign: 'right' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((ord) => (
                      <tr key={ord.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '14px' }}>
                          <strong style={{ color: 'var(--accent-indigo)' }}>{ord.id}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                            {new Date(ord.createdAt).toLocaleString('id-ID')}
                          </div>
                        </td>
                        <td style={{ padding: '14px' }}>
                          <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{ord.customerName}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>WA: {ord.customerPhone}</div>
                        </td>
                        <td style={{ padding: '14px', color: 'var(--text-main)' }}>
                          <div style={{ fontWeight: 700 }}>{ord.serviceTitle}</div>
                          {ord.programmingLanguage && (
                            <div style={{ fontSize: '0.78rem', color: 'var(--accent-indigo)' }}>
                              💻 Bahasa: <strong>{ord.programmingLanguage}</strong>
                            </div>
                          )}
                          {ord.hostingPlatform && (
                            <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)' }}>
                              🌐 Server: <strong>{ord.hostingPlatform}</strong>
                            </div>
                          )}
                          {ord.pageCount && (
                            <div style={{ fontSize: '0.78rem', color: 'var(--accent-amber)' }}>
                              📄 Halaman: <strong>{ord.pageCount} Halaman</strong>
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '14px' }}>
                          <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                            {ord.paymentMethod.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: '14px', fontWeight: 700, color: 'var(--price-color)' }}>
                          {formatCurrency(ord.totalPrice)}
                        </td>
                        <td style={{ padding: '14px' }}>
                          <select
                            value={ord.status}
                            onChange={(e) => handleStatusChange(ord.id, e.target.value as Order['status'])}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '6px',
                              backgroundColor: 'var(--bg-primary)',
                              border: '1px solid var(--border-color)',
                              color: 'var(--text-main)',
                              fontSize: '0.8rem',
                              outline: 'none'
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Dikonfirmasi</option>
                            <option value="processing">Dalam Proses</option>
                            <option value="completed">Selesai</option>
                            <option value="cancelled">Dibatalkan</option>
                          </select>
                        </td>
                        <td style={{ padding: '14px', textAlign: 'right' }}>
                          <button
                            onClick={() => handleDeleteOrderClick(ord.id)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#ef4444',
                              cursor: 'pointer',
                              padding: '4px'
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                Belum ada pesanan masuk. Pesanan dari form pelanggan akan otomatis muncul di sini.
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PENGATURAN CONFIG */}
        {activeTab === 'config' && (
          <div className="glass-panel" style={{ maxWidth: '600px', padding: '30px' }}>
            <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem', marginBottom: '20px' }}>Pengaturan WhatsApp & QRIS Usaha</h3>

            <form onSubmit={handleSaveConfig} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Nomor WhatsApp Admin (Format Internasional misal 628xxx)
                </label>
                <input
                  type="text"
                  value={config.adminPhone}
                  onChange={(e) => setConfig({ ...config, adminPhone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  URL Gambar QRIS Usaha (GoPay/OVO/DANA/Bank)
                </label>
                <input
                  type="text"
                  value={config.qrisImageUrl || ''}
                  onChange={(e) => setConfig({ ...config, qrisImageUrl: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)'
                  }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '12px', marginTop: '10px' }}>
                <Save size={16} /> Simpan Pengaturan
              </button>
            </form>
          </div>
        )}

        {/* ADD / EDIT SERVICE MODAL */}
        {isServiceModalOpen && (
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
              maxWidth: '520px',
              width: '100%',
              backgroundColor: 'var(--bg-secondary)',
              padding: '28px'
            }}>
              <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem', marginBottom: '16px' }}>
                {editingServiceId ? 'Edit Jenis Jasa' : 'Tambah Jenis Jasa Baru'}
              </h3>

              <form onSubmit={handleSaveService} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Nama Jasa</label>
                  <input
                    type="text"
                    required
                    placeholder="misal: Jasa Desain Banner Promo"
                    value={serviceTitle}
                    onChange={(e) => setServiceTitle(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Kategori</label>
                    <select
                      value={serviceCategory}
                      onChange={(e) => setServiceCategory(e.target.value as ServiceCategory)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                    >
                      <option value="IT & Web">IT & Web</option>
                      <option value="Akademik">Akademik</option>
                      <option value="Desain">Desain</option>
                      <option value="Multimedia">Multimedia</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Harga (IDR)</label>
                    <input
                      type="number"
                      required
                      value={servicePrice}
                      onChange={(e) => setServicePrice(Number(e.target.value))}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Deskripsi Singkat</label>
                  <textarea
                    rows={2}
                    required
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Keunggulan (Baris Baru)</label>
                  <textarea
                    rows={3}
                    value={serviceFeatures}
                    onChange={(e) => setServiceFeatures(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="button" onClick={() => setIsServiceModalOpen(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                    Batal
                  </button>
                  <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                    Simpan Jasa
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ADD / EDIT PARTNER MODAL WITH FILE LOGO UPLOAD */}
        {isPartnerModalOpen && (
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
              maxWidth: '460px',
              width: '100%',
              backgroundColor: 'var(--bg-secondary)',
              padding: '28px'
            }}>
              <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem', marginBottom: '16px' }}>
                {editingPartnerId ? 'Edit Mitra' : 'Tambah Mitra Baru'}
              </h3>

              <form onSubmit={handleSavePartner} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Nama Mitra / Perusahaan / Kampus
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="misal: Kemendikbud Kampus Merdeka"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Kategori Mitra
                  </label>
                  <input
                    type="text"
                    placeholder="misal: Pendidikan / Perbankan / Teknologi"
                    value={partnerCategory}
                    onChange={(e) => setPartnerCategory(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                  />
                </div>

                {/* FILE LOGO UPLOAD */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Upload File Gambar Logo Mitra
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoFileUpload}
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      fontSize: '0.82rem'
                    }}
                  />

                  {/* Logo Preview */}
                  {partnerLogoUrl && (
                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={partnerLogoUrl}
                        alt="Logo Preview"
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '8px',
                          objectFit: 'cover',
                          border: '1px solid var(--accent-indigo)'
                        }}
                      />
                      <span style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)' }}>
                        ✓ Logo Siap Diunggah
                      </span>
                    </div>
                  )}
                </div>

                {/* ALTERNATIVE LOGO URL INPUT */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-subtle)', marginBottom: '4px' }}>
                    Atau Masukkan URL Gambar (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={partnerLogoUrl}
                    onChange={(e) => setPartnerLogoUrl(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)', fontSize: '0.8rem' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="button" onClick={() => setIsPartnerModalOpen(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                    Batal
                  </button>
                  <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
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
