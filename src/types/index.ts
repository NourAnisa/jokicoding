export type ServiceCategory = 'Akademik' | 'Desain' | 'IT & Web' | 'Multimedia';

export interface Service {
  id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  price: number; // Dalam IDR
  priceUnit: string;
  description: string;
  fullDescription: string;
  features: string[];
  estimatedTime: string;
  popular?: boolean;
  rating: number;
  reviewCount: number;
  iconName: string;
  isPageBased?: boolean; // Apakah jasa dihitung per halaman
}

export interface Partner {
  id: string;
  name: string;
  logoUrl: string; // Base64 Data URL atau HTTP URL
  category?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
export type PaymentMethod = 'qris_gopay' | 'transfer_bank' | 'cash';

export interface Order {
  id: string;
  serviceId: string;
  serviceTitle: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  paymentMethod: PaymentMethod;
  notes: string;
  deadline?: string;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  // Dynamic Custom Options per Jasa
  programmingLanguage?: string; // Jasa Ngoding
  hostingPlatform?: string;     // Jasa Hosting
  pageCount?: number;           // Jasa Menulis/Pengetikan/Tulis Tangan/Print
  printType?: string;           // Jasa Cetak/Print (Hitam Putih / Warna)
  spssTest?: string;            // Jasa Olah Data SPSS
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  adminPhone: string;
  adminPhone2?: string;
  qrisImageUrl?: string;
  bankInfo?: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
}
