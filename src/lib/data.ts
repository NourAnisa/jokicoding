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
    name: 'Multi Jasa',
    logoUrl: '/partners/multijasa.jpg',
    category: 'Product/service'
  },
  {
    id: 'part-2',
    name: 'Noura Dev',
    logoUrl: '/partners/nouradev.jpg',
    category: 'Programer'
  }
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'srv-1',
    title: 'Jasa Ngoding (Web, Mobile, Bot & Script)',
    slug: 'jasa-ngoding',
    category: 'IT & Web',
    price: 150000,
    priceUnit: '/fitur',
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
    price: 50000,
    priceUnit: '/website',
    description: 'Bantuan deploy website ke Vercel, Netlify, VPS, cPanel, Supabase DB, & Custom Domain (belum termasuk hosting & domain).',
    fullDescription: 'Layanan pengunggahan (deployment) dan setup hosting website agar dapat diakses secara publik online 24 jam. Termasuk konfigurasi domain custom, SSL/HTTPS gratis, integrasi database Supabase/PostgreSQL/MySQL, dan optimasi kecepatan server. (Biaya Jasa Rp 50.000 belum termasuk biaya langganan hosting dan sewa domain jika menggunakan opsi berbayar).',
    features: ['Setup Hosting & Deploy Server', 'Bantuan SSL / HTTPS Gratis', 'Integrasi Domain Custom', 'Belum Termasuk Biaya Hosting & Domain', 'Garansi Uptime 24/7'],
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
    description: 'Cetak / print tugas, makalah, & skripsi. Hitam Putih Rp 400/lembar & Warna Rp 800/lembar.',
    fullDescription: 'Layanan cetak / print dokumen terpercaya untuk mahasiswa dan pelajar. Cetak tugas kuliah, laporan praktikum, makalah, hingga naskah skripsi dengan kualitas tinta tajam dan rapi. Pilihan cetak Hitam Putih (BW) Rp 400 / lembar dan Cetak Warna Rp 800 / lembar. Menggunakan kertas HVS 75/80 gsm premium.',
    features: ['Hitam Putih: Rp 400 / lembar', 'Cetak Warna: Rp 800 / lembar', 'Kertas HVS 75/80 gsm Tajam & Rapi', 'Siap Jilid & Antar / Kirim'],
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
  },
  {
    id: 'srv-18',
    title: 'Jasa Olah Data SPSS & Analisis Statistik',
    slug: 'olah-data-spss',
    category: 'Akademik',
    price: 100000,
    priceUnit: '/uji',
    description: 'Jasa olah data SPSS lengkap 90+ uji: Deskriptif, Normalitas, Regresi, ANOVA, EFA, Chi-Square, MANOVA, ARIMA, dll.',
    fullDescription: 'Layanan spesialis pengolahan data statistik menggunakan SPSS untuk skripsi, tesis, disertasi, dan riset. Menyediakan lebih dari 90 jenis uji statistik lengkap dari uji dasar (Deskriptif, Normalitas, Homogenitas Rp 100rb), uji korelasi & regresi (Rp 200rb-350rb), EFA & Validitas (Rp 250rb-400rb), Paket Olah Data Lengkap (Rp 650rb), hingga analisis multivariat & time series (MANOVA, Cluster, ARIMA, Survival Analysis Rp 600rb-1.500rb). Termasuk interpretasi output SPSS, tabel siap cetak/lampiran, dan penjelasan bimbingan.',
    features: ['90+ Pilihan Uji SPSS Lengkap', 'Output SPSS (.spv & .doc) + Lampiran', 'Interpretasi Hasil & Penjelasan Pembahasan', 'Garansi Revisi Uji & Bimbingan Sidang'],
    estimatedTime: '1-3 Hari',
    popular: true,
    rating: 4.99,
    reviewCount: 310,
    iconName: 'BookOpenCheck'
  },
  {
    id: 'srv-19',
    title: 'Flutter (Commercial / Industrial Grade)',
    slug: 'flutter-commercial-industrial',
    category: 'IT & Web',
    price: 5000000,
    priceUnit: '/proyek',
    description: 'Jasa program Flutter untuk keperluan digitalisasi online bagi komersial, instansi, atau industri.',
    fullDescription: 'Layanan koding & pengembangan aplikasi mobile Flutter kelas komersial dan industri. Cocok untuk digitalisasi proses bisnis instansi, enterprise, sistem kasir, integrasi IoT, dan aplikasi skala besar Android & iOS.',
    features: ['Cross-Platform Android & iOS', 'Arsitektur Clean & Scalable', 'Integrasi API & Database Enterprise', 'Garansi & Support Maintenance'],
    estimatedTime: '7-14 Hari',
    popular: true,
    rating: 5.0,
    reviewCount: 32,
    iconName: 'Smartphone'
  },
  {
    id: 'srv-20',
    title: 'Jasa APK Android Kodular',
    slug: 'jasa-apk-android-kodular',
    category: 'IT & Web',
    price: 350000,
    priceUnit: '/proyek',
    description: 'Jasa program APK Android menggunakan Kodular / App Inventor dengan hasil APK lancar & siap install.',
    fullDescription: 'Layanan pembuatan aplikasi Android berbasis platform Kodular / App Inventor. Cocok untuk tugas sekolah, kuliah, prototipe aplikasi, maupun bisnis UMKM ringan dengan tampilan menarik dan fitur lengkap.',
    features: ['Hasil APK Siap Install', 'Bebas Bug & Desain Rapi', 'Integrasi Firebase / Google Sheets', 'Garansi Revisi'],
    estimatedTime: '1-2 Hari',
    popular: false,
    rating: 4.9,
    reviewCount: 45,
    iconName: 'Smartphone'
  },
  {
    id: 'srv-21',
    title: 'Jasa APK Android RAD Studio',
    slug: 'jasa-apk-android-rad-studio',
    category: 'IT & Web',
    price: 1500000,
    priceUnit: '/proyek',
    description: 'Jasa program aplikasi Android menggunakan RAD Studio (Delphi/C++Builder) untuk kontrol sistem & IoT.',
    fullDescription: 'Layanan pembuatan aplikasi Android menggunakan Embarcadero RAD Studio (Delphi/C++Builder). Cocok untuk aplikasi pengontrol sistem industri, integrasi perangkat keras, komunikasi serial/Bluetooth/WiFi IoT, dan utilitas enterprise.',
    features: ['High Performance Native Code', 'Kontrol Hardware & Sistem IoT', 'Multi-Device Support', 'Source Code Lengkap'],
    estimatedTime: '3-5 Hari',
    popular: false,
    rating: 4.95,
    reviewCount: 19,
    iconName: 'Cpu'
  },
  {
    id: 'srv-22',
    title: 'Jasa Program Delphi',
    slug: 'jasa-program-delphi',
    category: 'IT & Web',
    price: 800000,
    priceUnit: '/proyek',
    description: 'Jasa pembuatan program Delphi berbasis komputer PC/Laptop untuk penunjang bisnis, skripsi, & industri.',
    fullDescription: 'Layanan pemrograman Delphi (Object Pascal) untuk aplikasi desktop Windows/Linux. Mencakup aplikasi kasir POS, sistem inventaris toko/gudang, manajemen database MySQL/SQLServer/Access, serta tugas praktikum & skripsi.',
    features: ['Desktop Windows GUI Native', 'Koneksi Database MySQL / Access', 'Cetak Laporan FastReport / QuickReport', 'Source Code Pas & Dcu Included'],
    estimatedTime: '2-4 Hari',
    popular: false,
    rating: 4.9,
    reviewCount: 38,
    iconName: 'Monitor'
  },
  {
    id: 'srv-23',
    title: 'Jasa Program Java',
    slug: 'jasa-program-java',
    category: 'IT & Web',
    price: 800000,
    priceUnit: '/proyek',
    description: 'Jasa pembuatan dan pengembangan perangkat / aplikasi berbasis Java (Desktop GUI & OOP).',
    fullDescription: 'Layanan koding Java profesional untuk tugas kuliah OOP, aplikasi desktop Swing/JavaFX, sistem backend Spring Boot, maupun Android Java. Pengerjaan rapi berstandar industri dengan dokumentasi kode lengkap.',
    features: ['Clean OOP Architecture', 'GUI Swing / JavaFX / Console', 'Integrasi Database JDBC / JPA', 'Source Code & Tutorial Running'],
    estimatedTime: '2-4 Hari',
    popular: true,
    rating: 4.95,
    reviewCount: 87,
    iconName: 'Code'
  },
  {
    id: 'srv-24',
    title: 'Jasa Program Lazarus',
    slug: 'jasa-program-lazarus',
    category: 'IT & Web',
    price: 500000,
    priceUnit: '/proyek',
    description: 'Jasa pembuatan program Lazarus (Free Pascal) berbasis PC/Laptop untuk kebutuhan akademik & industri.',
    fullDescription: 'Layanan pembuatan aplikasi desktop gratis & open source menggunakan Lazarus IDE (Free Pascal). Cocok untuk mahasiswa, instansi, atau industri yang membutuhkan software tanpa biaya lisensi proprietary.',
    features: ['Cross-Platform Windows / Linux', 'Bebas Biaya Lisensi (Open Source)', 'Integrasi SQLite / MySQL', 'Source Code Lengkap'],
    estimatedTime: '2-3 Hari',
    popular: false,
    rating: 4.85,
    reviewCount: 24,
    iconName: 'Terminal'
  },
  {
    id: 'srv-25',
    title: 'Jasa Program Matlab',
    slug: 'jasa-program-matlab',
    category: 'IT & Web',
    price: 1500000,
    priceUnit: '/proyek',
    description: 'Jasa koding & simulasi Matlab: Pengolahan Sinyal, Citra Digital, Neural Network, & Komputasi Numerik.',
    fullDescription: 'Layanan spesialis pemrograman Matlab (Matrix Laboratory) dan Simulink untuk tugas akhir, tesis, dan riset teknik. Mencakup pengolahan citra digital (image processing), logika fuzzy, jaringan saraf tiruan (ANN/CNN), komputasi matriks, dan GUI Matlab.',
    features: ['Pengolahan Citra & Sinyal', 'Algoritma AI / Fuzzy / ANN', 'GUI App Designer Matlab', 'Laporan & Plot Grafik Hasil'],
    estimatedTime: '2-5 Hari',
    popular: true,
    rating: 4.98,
    reviewCount: 112,
    iconName: 'Binary'
  },
  {
    id: 'srv-26',
    title: 'Jasa Program NetBeans IDE',
    slug: 'jasa-program-netbeans-ide',
    category: 'IT & Web',
    price: 1500000,
    priceUnit: '/proyek',
    description: 'Jasa pembuatan & pengembangan aplikasi berbasis NetBeans IDE (Java Desktop, GUI Swing/JavaFX).',
    fullDescription: 'Layanan pembuatan sistem informasi dan software desktop lengkap menggunakan Apache NetBeans IDE. Termasuk perancangan database (MySQL/PostgreSQL), sistem login multi-user, iReport/JasperReports, dan installer .exe / .jar.',
    features: ['NetBeans Project Format', 'Laporan JasperReport / iReport', 'Design Patterns MVC', 'Database Migration File'],
    estimatedTime: '3-5 Hari',
    popular: false,
    rating: 4.9,
    reviewCount: 41,
    iconName: 'Code'
  },
  {
    id: 'srv-27',
    title: 'Jasa Program Python',
    slug: 'jasa-program-python',
    category: 'IT & Web',
    price: 1200000,
    priceUnit: '/proyek',
    description: 'Jasa koding Python: Data Science, AI/Machine Learning, Web Scraping, Otomasi, & Scripting.',
    fullDescription: 'Layanan pemrograman Python profesional untuk berbagai kebutuhan: script otomasi bot, web scraping (Selenium/BeautifulSoup), analisis data (Pandas/NumPy), Machine Learning (Scikit-Learn/TensorFlow), Django/Flask REST API, dan PyQt GUI.',
    features: ['AI / Machine Learning / Deep Learning', 'Web Scraping & Otomasi Script', 'Data Science & Visualisasi Data', 'Source Code + Jupyter Notebook'],
    estimatedTime: '2-4 Hari',
    popular: true,
    rating: 4.99,
    reviewCount: 290,
    iconName: 'FileCode'
  },
  {
    id: 'srv-28',
    title: 'Jasa Simulasi Proteus',
    slug: 'jasa-simulasi-proteus',
    category: 'IT & Web',
    price: 600000,
    priceUnit: '/proyek',
    description: 'Jasa pembuatan & simulasi rangkaian elektronik/digital komputerisasi menggunakan Proteus ISIS/ARES.',
    fullDescription: 'Layanan perancangan dan simulasi skematik elektronika digital/analog menggunakan Labcenter Proteus. Termasuk simulasi mikrokontroler (Arduino/AVR/PIC), desain layout PCB ARES 2D/3D, dan pengujian sinyal rangkaian.',
    features: ['Simulasi Skematik Proteus ISIS', 'Layout PCB ARES 2D & 3D', 'Uji Komponen Elektronika & IoT', 'File Rangkaian .DSN + .PDB'],
    estimatedTime: '1-3 Hari',
    popular: false,
    rating: 4.9,
    reviewCount: 56,
    iconName: 'Cpu'
  },
  {
    id: 'srv-29',
    title: 'Jasa Sketch Arduino',
    slug: 'jasa-sketch-arduino',
    category: 'IT & Web',
    price: 200000,
    priceUnit: '/proyek',
    description: 'Jasa pembuatan & koding firmware Arduino (sketch .ino) untuk sensor, aktuator, & proyek IoT.',
    fullDescription: 'Layanan pembuatan source code kodingan Arduino (Uno/Nano/Mega/ESP8266/ESP32). Pengerjaan firmware cepat untuk integrasi sensor (temperature, RFID, ultrasonic, GPS, GSM), LCD/OLED display, motor stepper/servo, dan Blynk/MQTT IoT.',
    features: ['Source Code Arduino (.ino)', 'Skema Rangkaian (Wiring Diagram)', 'Pengujian Bebas Bug', 'Bimbingan Upload Firmware'],
    estimatedTime: '1-2 Hari',
    popular: true,
    rating: 4.97,
    reviewCount: 185,
    iconName: 'Cpu'
  },
  {
    id: 'srv-30',
    title: 'Jasa Program AVR',
    slug: 'jasa-program-avr',
    category: 'IT & Web',
    price: 500000,
    priceUnit: '/proyek',
    description: 'Jasa koding firmware mikrokontroler AVR (ATmega/ATtiny) berbasis C/Assembly atau hex file.',
    fullDescription: 'Layanan pemrograman firmware mikrokontroler AVR menggunakan Microchip Studio (Atmel Studio) / CodeVisionAVR (CVAVR). Cocok untuk aplikasi industri, sistem kontrol real-time, timer, dan pengolahan register mikro dasar.',
    features: ['Firmware C / Assembly / CVAVR', 'File Hex / Bin siap Flash', 'Konfigurasi Register & Interupsi', 'Source Code Lengkap'],
    estimatedTime: '2-3 Hari',
    popular: false,
    rating: 4.88,
    reviewCount: 33,
    iconName: 'Cpu'
  },
  {
    id: 'srv-31',
    title: 'Jasa APK Android Inventor',
    slug: 'jasa-apk-android-inventor',
    category: 'IT & Web',
    price: 400000,
    priceUnit: '/proyek',
    description: 'Jasa pembuatan aplikasi Android menggunakan MIT App Inventor dengan hasil APK siap pakai.',
    fullDescription: 'Layanan koding aplikasi mobile Android berbasis MIT App Inventor. Sangat pas untuk proyek tugas sekolah/kuliah, media pembelajaran interaktif, kontrol Bluetooth Arduino, dan aplikasi sederhana dengan harga terjangkau.',
    features: ['File Project .aia & APK siap install', 'Koneksi Bluetooth / Web / Firebase', 'Desain UI Interaktif', 'Bimbingan & Revisi'],
    estimatedTime: '1-2 Hari',
    popular: false,
    rating: 4.92,
    reviewCount: 52,
    iconName: 'Smartphone'
  },
  {
    id: 'srv-32',
    title: 'Jasa APK Android Studio',
    slug: 'jasa-apk-android-studio',
    category: 'IT & Web',
    price: 1500000,
    priceUnit: '/proyek',
    description: 'Jasa koding aplikasi Android native menggunakan Android Studio (Kotlin/Java) siap Play Store.',
    fullDescription: 'Layanan pembuatan aplikasi Android profesional native menggunakan Android Studio dengan bahasa Kotlin atau Java. Berarsitektur Modern Android (MVVM, Room DB, Retrofit API, Jetpack Compose / XML). Siap untuk rilis Google Play Store.',
    features: ['Arsitektur MVVM & Jetpack', 'Source Code Kotlin / Java Native', 'Integrasi REST API & Push Notification', 'File APK & Bundle (.aab) Play Store'],
    estimatedTime: '4-7 Hari',
    popular: true,
    rating: 4.98,
    reviewCount: 98,
    iconName: 'Smartphone'
  },
  {
    id: 'srv-33',
    title: 'Jasa Program Raspberry Pi',
    slug: 'jasa-program-raspberry',
    category: 'IT & Web',
    price: 1000000,
    priceUnit: '/proyek',
    description: 'Jasa koding mini PC (Raspberry Pi, Orange Pi, Nano Pi) Python/C++ untuk IoT & Computer Vision.',
    fullDescription: 'Layanan pemrograman single-board computer (Raspberry Pi 3/4/5, Orange Pi, Nano Pi) berbasis Linux (Raspbian/Ubuntu). Mencakup koding OpenCV Computer Vision (deteksi wajah/objek), IoT Gateway MQTT, Server Lokal, & GPIO Hardware Control.',
    features: ['Koding Python / OpenCV / C++', 'GPIO Hardware & Sensor Control', 'IoT Gateway & Web Dashboard Server', 'Petunjuk Auto-run OS & Setup'],
    estimatedTime: '3-5 Hari',
    popular: false,
    rating: 4.94,
    reviewCount: 64,
    iconName: 'Cpu'
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
    const parsed: Partner[] = JSON.parse(stored);
    // Auto-migrate legacy default partners if found
    if (parsed.some(p => p.name === 'Google Cloud for Education')) {
      localStorage.setItem(LOCAL_STORAGE_PARTNERS_KEY, JSON.stringify(INITIAL_PARTNERS));
      return INITIAL_PARTNERS;
    }
    return parsed;
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
