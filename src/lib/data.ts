import { Service, Order, SiteConfig, Partner } from '@/types';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  brandName: 'JokiCoding & Akademik Master',
  tagline: 'Solusi Terpercaya untuk Jasa Ngoding, Tugas Akademik, Desain, & Multimedia',
  adminPhone: '6281521907985',
  adminPhone2: '6285155133070',
  qrisImageUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=00020101021126580014ID.GO.QRIS.WWW01189360091400000000005204581253033605802ID5914JOKICODING%20INC6007JAKARTA61051234562070703A0163047A8F',
  bankInfo: {
    bankName: 'BCA',
    accountNumber: '8720192841',
    accountHolder: 'Admin JokiCoding'
  }
};

export const INITIAL_PARTNERS: Partner[] = [
  {
    id: 'part-1',
    name: 'Google Cloud for Education',
    logoUrl: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=120&auto=format&fit=crop&q=80',
    category: 'Teknologi'
  },
  {
    id: 'part-2',
    name: 'GitHub Campus Student',
    logoUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=120&auto=format&fit=crop&q=80',
    category: 'Developer'
  },
  {
    id: 'part-3',
    name: 'Kemendikbud Kampus Merdeka',
    logoUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=120&auto=format&fit=crop&q=80',
    category: 'Pendidikan'
  },
  {
    id: 'part-4',
    name: 'Bank BCA Business',
    logoUrl: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=120&auto=format&fit=crop&q=80',
    category: 'Perbankan'
  },
  {
    id: 'part-5',
    name: 'GoPay QRIS Indonesia',
    logoUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=120&auto=format&fit=crop&q=80',
    category: 'Pembayaran'
  },
  {
    id: 'part-6',
    name: 'Canva Pro for Education',
    logoUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=120&auto=format&fit=crop&q=80',
    category: 'Desain'
  }
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'srv-1',
    title: 'Jasa Ngoding (Web, Mobile, Bot & Script)',
    slug: 'jasa-ngoding',
    category: 'IT & Web',
    price: 50000,
    priceUnit: '/proyek',
    description: 'Pengerjaan tugas koding, website Next.js/React/PHP/Laravel, aplikasi mobile, bot Python, & perbaikan bug.',
    fullDescription: 'Layanan jasa ngoding profesional untuk mahasiswa, pelajar, maupun kebutuhan bisnis. Menguasai berbagai bahasa pemrograman dan framework modern seperti JavaScript/TypeScript, React, Next.js, Node.js, Python, PHP, MySQL, Laravel, C++, Java, dan HTML/CSS. Bebas konsultasi dan revisi sampai program berjalan lancar.',
    features: ['Source Code Lengkap & Rapi', 'Penjelasan Kode / Modul', 'Bebas Garansi Revisi', 'Support Pemasangan / Running'],
    estimatedTime: '1-3 Hari',
    popular: true,
    rating: 5.0,
    reviewCount: 142,
    iconName: 'Code'
  },
  {
    id: 'srv-2',
    title: 'Jasa Hosting & Deploy Website',
    slug: 'jasa-hosting',
    category: 'IT & Web',
    price: 30000,
    priceUnit: '/website',
    description: 'Bantuan deploy website ke Vercel, Netlify, VPS, cPanel, Supabase DB, & setup Custom Domain .com/id.',
    fullDescription: 'Layanan pengunggahan (deployment) dan setup hosting website agar dapat diakses secara publik online 24 jam. Termasuk konfigurasi domain custom, SSL/HTTPS gratis, integrasi database Supabase/PostgreSQL/MySQL, dan optimasi kecepatan server.',
    features: ['Setup Hosting & Server', 'Bantuan SSL / HTTPS Gratis', 'Integrasi Domain Custom', 'Garansi Uptime 24/7'],
    estimatedTime: '1 Hari',
    popular: false,
    rating: 4.9,
    reviewCount: 68,
    iconName: 'Server'
  },
  {
    id: 'srv-3',
    title: 'Bimbingan & Pengerjaan Skripsi',
    slug: 'jasa-skripsi',
    category: 'Akademik',
    price: 250000,
    priceUnit: '/bab',
    description: 'Bantuan pengerjaan proposal, Bab 1-5, olah data statistik (SPSS/SmartPLS/Python), & persiapan sidang.',
    fullDescription: 'Layanan asistensi dan pengerjaan skripsi, tesis, serta tugas akhir profesional. Mencakup penyusunan bab pendahuluan, tinjauan pustaka, metodologi penelitian, analisis data (kualitatif/kuantitatif), dan pembahasan hasil. Bebas konsultasi materi dan revisi dosen.',
    features: ['Original & Bebas Plagiasi', 'Olah Data SPSS / Python / Excel', 'Format Sesuai Panduan Kampus', 'Bebas Revisi Dosen Pembimbing'],
    estimatedTime: '3-7 Hari',
    popular: true,
    rating: 4.95,
    reviewCount: 230,
    iconName: 'GraduationCap'
  },
  {
    id: 'srv-4',
    title: 'Publikasi Jurnal Sinta & Scopus',
    slug: 'publikasi-jurnal',
    category: 'Akademik',
    price: 350000,
    priceUnit: '/naskah',
    description: 'Jasa translate, penyesuaian template jurnal, submit, & garansi publish di Jurnal Sinta (1-6) / International.',
    fullDescription: 'Layanan penyuntingan dan pendampingan publikasi artikel ilmiah di Jurnal Nasional Terakreditasi Sinta maupun Jurnal Internasional (Scopus/Copernicus). Termasuk perbaikan format naskah (IEEE/APA/Chicago), translation (Inggris), dan submit OJS.',
    features: ['Cek Plagiasi Turnitin < 20%', 'Formatting Sesuai Template OJS', 'Proofreading Bahasa Inggris', 'Bantuan Respon Reviewer'],
    estimatedTime: '5-14 Hari',
    popular: false,
    rating: 4.9,
    reviewCount: 54,
    iconName: 'BookOpenCheck'
  },
  {
    id: 'srv-5',
    title: 'Penyusunan Makalah & Essay',
    slug: 'jasa-makalah',
    category: 'Akademik',
    price: 3000,
    priceUnit: '/halaman',
    description: 'Penulisan makalah kuliah/sekolah terstruktur rapi, referensi terpercaya, daftar pustaka otomatis (Mendeley).',
    fullDescription: 'Jasa pembuatan makalah ilmiah, paper kuliah, essay kritikal, dan laporan praktikum. Setiap karya disusun berdasarkan literatur ilmiah valid (Google Scholar/ScienceDirect) dan menggunakan sitasi standar seperti APA 7th atau IEEE.',
    features: ['Sitasi Mendeley / Zotero', 'Lengkap Cover & Daftar Pustaka', 'File DOCX & PDF', 'Bebas Plagiasi Turnitin'],
    estimatedTime: '1-2 Hari',
    popular: true,
    rating: 4.88,
    reviewCount: 189,
    iconName: 'FileText'
  },
  {
    id: 'srv-6',
    title: 'Paper / Artikel Ilmiah (Memindah ke Template)',
    slug: 'paper-artikel',
    category: 'Akademik',
    price: 75000,
    priceUnit: '/artikel',
    description: 'Memindah & merapikan naskah tulisan ke template jurnal / conference sesuai format panduan.',
    fullDescription: 'Layanan memindahkan dan merapikan naskah tulisan ke dalam template artikel ilmiah, paper conference, atau jurnal sesuai format panduan kampus/publisher (IEEE/APA/OJS).',
    features: ['Format Sesuai Template Jurnal / IEEE', 'Struktur IMRAD Baku & Rapi', 'Penataan Grafik, Gambar & Tabel', 'Pengerjaan Cepat'],
    estimatedTime: '1-2 Hari',
    popular: false,
    rating: 4.9,
    reviewCount: 76,
    iconName: 'Newspaper'
  },
  {
    id: 'srv-7',
    title: 'Jasa Pengetikan & Rapikan Dokumen',
    slug: 'jasa-pengetikan',
    category: 'Akademik',
    price: 2000,
    priceUnit: '/halaman',
    description: 'Pengetikan ulang dokumen, merapikan format MS Word/Excel/PDF, nomor halaman, & daftar isi otomatis.',
    fullDescription: 'Layanan ketik dokumen cepat dari foto, gambar, rekaman audio, atau tulisan tangan ke Microsoft Word. Termasuk merapikan margin, font, spasi, penomoran halaman romawi/angka, serta daftar isi/tabel/gambar otomatis.',
    features: ['Ketik Cepat & Akurat', 'Daftar Isi Otomatis', 'Format Rapi Sesuai Standard', 'Dapat File MS Word & PDF'],
    estimatedTime: '1 Hari',
    popular: false,
    rating: 4.85,
    reviewCount: 210,
    iconName: 'Keyboard'
  },
  {
    id: 'srv-8',
    title: 'Jasa Tulis Tangan Rapi',
    slug: 'tulis-tangan',
    category: 'Akademik',
    price: 5000,
    priceUnit: '/halaman',
    description: 'Penulisan tangan tugas sekolah/kuliah di kertas folio/HVS dengan tulisan super rapi dan bersih.',
    fullDescription: 'Layanan jasa tulis tangan tugas sekolah, rangkuman materi, atau catatan kuliah pada buku, kertas folio bergaris, atau HVS. Tulisan dijamin rapi, konsisten, tidak ada tip-ex berlebihan, dan difoto dengan pencahayaan terang definisi tinggi.',
    features: ['Tulisan Tegak / Bersambung Rapi', 'Tersedia Pilihan Kertas Folio/HVS', 'Hasil Foto Scan CamScanner HD', 'Pengiriman Cepat'],
    estimatedTime: '1 Hari',
    popular: true,
    rating: 4.92,
    reviewCount: 315,
    iconName: 'PenTool'
  },
  {
    id: 'srv-9',
    title: 'Desain PPT Presentasi Interaktif',
    slug: 'desain-ppt',
    category: 'Desain',
    price: 25000,
    priceUnit: '/10 slide',
    description: 'Pembuatan slide presentasi PowerPoint/Canva modern, profesional, infografis menarik & animasi.',
    fullDescription: 'Bantu ubah materi tulisan Anda menjadi slide presentasi PPT yang memukau audiens dan dosen. Menggunakan desain visual kekinian, skema warna menarik, elemen icon/vektor modern, serta tata letak infografis yang mudah dipahami.',
    features: ['Desain Modern & Aesthetic', 'Animasi & Transisi Smooth', 'Free Font & Icon Kit', 'File PPTX & PDF'],
    estimatedTime: '1 Hari',
    popular: true,
    rating: 4.96,
    reviewCount: 280,
    iconName: 'Presentation'
  },
  {
    id: 'srv-10',
    title: 'Desain CV ATS Friendly & Kreatif',
    slug: 'desain-cv',
    category: 'Desain',
    price: 25000,
    priceUnit: '/desain',
    description: 'Pembuatan CV profesional lolos sistem ATS perusahaan & CV Kreatif visual menarik + Surat Lamaran.',
    fullDescription: 'Tingkatkan peluang dipanggil interview kerja dengan CV standar ATS (Applicant Tracking System) yang direkomendasikan HRD atau CV Visual Kreatif untuk bidang industri kreatif. Bonus pembuatan Surat Lamaran Kerja (Cover Letter) profesional.',
    features: ['Format Lolos Scan Mesin ATS', 'Desain Modern & Elegan', 'Termasuk Surat Lamaran', 'Format PDF Siap Send Email'],
    estimatedTime: '1 Hari',
    popular: true,
    rating: 4.98,
    reviewCount: 405,
    iconName: 'FileCheck'
  },
  {
    id: 'srv-11',
    title: 'Jasa Desain Grafis (Logo, Banner, Poster)',
    slug: 'jasa-desain',
    category: 'Desain',
    price: 35000,
    priceUnit: '/desain',
    description: 'Desain logo UMKM/olshop, banner promosi, poster acara, feed Instagram, & brosur menarik.',
    fullDescription: 'Layanan pembuatan desain grafis komersial dan visual media sosial. Cocok untuk kebutuhan branding usaha, materi promosi event, spanduk, banner toko online, hingga template konten feed Instagram.',
    features: ['High Resolution 4K Graphics', 'Revisi Sampai Cocok', 'Master File PSD/AI/PNG', 'Siap Cetak / Upload'],
    estimatedTime: '1-2 Hari',
    popular: false,
    rating: 4.87,
    reviewCount: 165,
    iconName: 'Palette'
  },
  {
    id: 'srv-12',
    title: 'Jasa Edit Video (TikTok, Reels, Youtube)',
    slug: 'edit-video',
    category: 'Multimedia',
    price: 75000,
    priceUnit: '/menit',
    description: 'Editing video konten TikTok/Reels, video presentasi, tugas perkuliahan, subtitling & sound effect.',
    fullDescription: 'Layanan penyuntingan video profesional menggunakan Adobe Premiere Pro & CapCut Pro. Meliputi pemotongan klip (trimming), efek transisi sinematik, efek suara (SFX), background music bebas hak cipta, penambahan subtitle/teks dinamis, dan color grading.',
    features: ['Subtitle Dinamis & Trendi', 'Efek Transisi & Sound FX', 'Color Grading Sinematik', 'Resolusi Full HD / 4K'],
    estimatedTime: '1-2 Hari',
    popular: true,
    rating: 4.94,
    reviewCount: 198,
    iconName: 'Video'
  },
  {
    id: 'srv-13',
    title: 'Jasa Cetak / Print Dokumen',
    slug: 'jasa-print',
    category: 'Akademik',
    price: 400,
    priceUnit: '/lembar',
    description: 'Cetak / print tugas, makalah, & skripsi. Hitam Putih Rp 400/lembar & Warna Rp 600/lembar.',
    fullDescription: 'Layanan cetak / print dokumen terpercaya untuk mahasiswa dan pelajar. Cetak tugas kuliah, laporan praktikum, makalah, hingga naskah skripsi dengan kualitas tinta tajam dan rapi. Pilihan cetak Hitam Putih (BW) Rp 400 / lembar dan Cetak Warna Rp 600 / lembar. Menggunakan kertas HVS 75/80 gsm premium.',
    features: ['Hitam Putih: Rp 400 / lembar', 'Cetak Warna: Rp 600 / lembar', 'Kertas HVS 75/80 gsm Tajam & Rapi', 'Siap Jilid & Antar / Kirim'],
    estimatedTime: '1 Hari',
    popular: true,
    rating: 4.96,
    reviewCount: 340,
    iconName: 'Printer'
  },
  {
    id: 'srv-14',
    title: 'Paket Terima Beres Laporan Magang',
    slug: 'paket-laporan-magang',
    category: 'Akademik',
    price: 2000000,
    priceUnit: '/paket',
    description: 'Paket terima beres Laporan Magang / PKL lengkap Bab 1-5, jurnal harian, & lampiran.',
    fullDescription: 'Layanan pengerjaan paket terima beres Laporan Magang / Praktek Kerja Lapangan (PKL) komprehensif. Mencakup penyusunan profil perusahaan, Bab 1 Pendahuluan s/d Bab 5 Penutup, jurnal kegiatan harian, analisis tugas magang, lampiran pendukung, serta revisi gratis hingga disetujui dosen pembimbing.',
    features: ['Penyusunan Bab 1 s/d Bab 5 Lengkap', 'Penyusunan Jurnal Kegiatan Harian', 'Format Sesuai Panduan Kampus', 'Bebas Garansi Revisi Pembimbing', 'Siap Cetak & Softfile DOCX/PDF'],
    estimatedTime: '3-5 Hari',
    popular: true,
    rating: 4.98,
    reviewCount: 95,
    iconName: 'FileText'
  },
  {
    id: 'srv-15',
    title: 'Paket Terima Beres Skripsi / Tugas Akhir',
    slug: 'paket-skripsi-lengkap',
    category: 'Akademik',
    price: 5000000,
    priceUnit: '/paket',
    description: 'Paket terima beres Skripsi / TA lengkap Bab 1-5, aplikasi/program, olah data, ppt, & bimbingan.',
    fullDescription: 'Layanan pengerjaan paket terima beres Skripsi / Tugas Akhir (TA) full service dari awal sampai lulus. Mencakup penyusunan Proposal, Bab 1 Pendahuluan s/d Bab 5 Penutup, pembuatan program/aplikasi (jika jurusan IT), olah data statistik (SPSS/SmartPLS/Python), slide PPT presentasi, serta asistensi bimbingan & revisi tanpa batas.',
    features: ['Proposal & Bab 1 s/d 5 Full Paket', 'Pembuatan Program / Aplikasi (Untuk IT)', 'Olah Data Statistik SPSS/SmartPLS/Excel', 'Slide PPT Presentasi Sidang', 'Garansi Revisi Dosen Pembimbing Sampai Lulus'],
    estimatedTime: '7-14 Hari',
    popular: true,
    rating: 5.0,
    reviewCount: 285,
    iconName: 'GraduationCap'
  },
  {
    id: 'srv-16',
    title: 'Paket Terima Beres Tesis (S2)',
    slug: 'paket-tesis-s2',
    category: 'Akademik',
    price: 7000000,
    priceUnit: '/paket',
    description: 'Paket terima beres Tesis Magister (S2) riset mendalam, metodologi ilmiah, olah data advance, & artikel.',
    fullDescription: 'Layanan asistensi dan pengerjaan Paket Terima Beres Tesis Magister (S2) profesional. Disusun dengan standar ilmiah tinggi, tinjauan pustaka jurnal internasional terindeks, pengolahan data statistik tingkat lanjut (SEM/PLS/Python/EViews), manuskrip artikel ilmiah, dan pendampingan revisi draf hingga bebas ujian tesis.',
    features: ['Draf Tesis S2 Lengkap Bab 1 - 5', 'Riset Literatur Jurnal Internasional', 'Olah Data Tingkat Lanjut (SEM / PLS / EViews)', 'Draf Artikel Ilmiah Siap Publish', 'Garansi Revisi & Konsultasi'],
    estimatedTime: '10-20 Hari',
    popular: true,
    rating: 4.97,
    reviewCount: 110,
    iconName: 'BookOpenCheck'
  },
  {
    id: 'srv-17',
    title: 'Paket Terima Beres Disertasi (S3)',
    slug: 'paket-disertasi-s3',
    category: 'Akademik',
    price: 9000000,
    priceUnit: '/paket',
    description: 'Paket terima beres Disertasi Doktoral (S3) analisis kebaruan (novelty), metodologi advance, & naskah Scopus.',
    fullDescription: 'Layanan pendampingan dan pengerjaan Paket Terima Beres Disertasi Doktoral (S3) eksklusif. Berfokus pada perumusan Kebaruan Riset (Novelty), pemodelan teoritis, analisis data kompleks, pendampingan ujian kelayakan, serta draf artikel jurnal reputasi tinggi (Scopus/Sinta 1-2).',
    features: ['Perumusan Novelty / Kebaruan Riset Doktoral', 'Naskah Disertasi S3 Lengkap & Komprehensif', 'Analisis Data Kompleks & Metodologi Kuat', 'Draft Manuskrip Scopus / Sinta 1-2', 'Pendampingan Konsultasi Eksklusif'],
    estimatedTime: '14-30 Hari',
    popular: true,
    rating: 5.0,
    reviewCount: 48,
    iconName: 'Award'
  }
];

const LOCAL_STORAGE_SERVICES_KEY = 'jokicoding_services';
const LOCAL_STORAGE_PARTNERS_KEY = 'jokicoding_partners';
const LOCAL_STORAGE_ORDERS_KEY = 'jokicoding_orders';
const LOCAL_STORAGE_CONFIG_KEY = 'jokicoding_config';

export function getServices(): Service[] {
  if (typeof window === 'undefined') return INITIAL_SERVICES;
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_SERVICES_KEY);
    if (!stored) {
      localStorage.setItem(LOCAL_STORAGE_SERVICES_KEY, JSON.stringify(INITIAL_SERVICES));
      return INITIAL_SERVICES;
    }
    const parsed: Service[] = JSON.parse(stored);
    
    // Ensure initial services & price updates exist
    let updated = [...parsed];
    let changed = false;

    INITIAL_SERVICES.forEach(initSrv => {
      const idx = updated.findIndex(s => s.slug === initSrv.slug);
      if (idx === -1) {
        updated.push(initSrv);
        changed = true;
      } else {
        // Sync updated initial prices and title/units
        if (updated[idx].price !== initSrv.price || updated[idx].title !== initSrv.title || updated[idx].priceUnit !== initSrv.priceUnit) {
          updated[idx] = { ...updated[idx], price: initSrv.price, title: initSrv.title, priceUnit: initSrv.priceUnit, description: initSrv.description };
          changed = true;
        }
      }
    });

    if (changed) {
      localStorage.setItem(LOCAL_STORAGE_SERVICES_KEY, JSON.stringify(updated));
    }
    return updated;
  } catch {
    return INITIAL_SERVICES;
  }
}

export function saveServices(services: Service[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_SERVICES_KEY, JSON.stringify(services));
}

// Partner Storage Helpers
export function getPartners(): Partner[] {
  if (typeof window === 'undefined') return INITIAL_PARTNERS;
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_PARTNERS_KEY);
    if (!stored) {
      localStorage.setItem(LOCAL_STORAGE_PARTNERS_KEY, JSON.stringify(INITIAL_PARTNERS));
      return INITIAL_PARTNERS;
    }
    return JSON.parse(stored);
  } catch {
    return INITIAL_PARTNERS;
  }
}

export function savePartners(partners: Partner[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_PARTNERS_KEY, JSON.stringify(partners));
}

export function getOrders(): Order[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveOrder(newOrder: Omit<Order, 'id' | 'createdAt' | 'status'>): Order {
  const orders = getOrders();
  const order: Order = {
    ...newOrder,
    id: `ORD-${Date.now().toString().slice(-6)}`,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  orders.unshift(order);
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
  }
  return order;
}

export function updateOrderStatus(orderId: string, status: Order['status']) {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === orderId);
  if (index !== -1) {
    orders[index].status = status;
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
    }
  }
}

export function deleteOrder(orderId: string) {
  const orders = getOrders().filter(o => o.id !== orderId);
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
  }
}

export function getSiteConfig(): SiteConfig {
  if (typeof window === 'undefined') return DEFAULT_SITE_CONFIG;
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_CONFIG_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_SITE_CONFIG;
  } catch {
    return DEFAULT_SITE_CONFIG;
  }
}

export function saveSiteConfig(config: SiteConfig) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_CONFIG_KEY, JSON.stringify(config));
}
