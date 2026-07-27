import { Order } from '@/types';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function generateWhatsAppLink(
  adminPhone: string,
  order: Omit<Order, 'id' | 'createdAt' | 'status'> & { id?: string }
): string {
  const cleanPhone = adminPhone.replace(/[^0-9]/g, '');

  let paymentText = '';
  switch (order.paymentMethod) {
    case 'qris_gopay':
      paymentText = '📲 GoPay / QRIS Instant (Sudah/Akan Scan QRIS)';
      break;
    case 'transfer_bank':
      paymentText = '🏦 Transfer Bank (BCA / Mandiri / BRI)';
      break;
    case 'cash':
    default:
      paymentText = '💵 Bayar di Tempat / Pas Pengerjaan Selesai';
      break;
  }

  // Custom options text formatting
  let customDetailsText = '';
  if (order.programmingLanguage) {
    customDetailsText += `• *Bahasa/Framework*: ${order.programmingLanguage}\n`;
  }
  if (order.hostingPlatform) {
    customDetailsText += `• *Jenis Hosting*: ${order.hostingPlatform}\n`;
  }
  if (order.printType) {
    customDetailsText += `• *Jenis Print*: ${order.printType}\n`;
  }
  if (order.pageCount && order.pageCount > 0) {
    customDetailsText += `• *Jumlah Halaman/Lembar*: ${order.pageCount} Lembar\n`;
  }

  const text = `Halo Admin *JokiCoding*, saya ingin memesan jasa berikut:

📋 *DETAIL PEMESANAN*
• *No. Pesanan* : ${order.id || 'N/A'}
• *Nama*        : ${order.customerName}
• *No. WA*      : ${order.customerPhone}
${order.customerEmail ? `• *Email*       : ${order.customerEmail}\n` : ''}• *Jenis Jasa*  : ${order.serviceTitle}
${customDetailsText}• *Estimasi Biaya* : ${formatCurrency(order.totalPrice)}
• *Metode Bayar* : ${paymentText}
${order.deadline ? `• *Target Deadline*: ${order.deadline}\n` : ''}
📝 *Catatan / Instruksi Pengerjaan*:
"${order.notes || 'Tidak ada catatan khusus'}"

Mohon konfirmasinya ya Min, Terima kasih!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function generateGeneralWhatsAppLink(adminPhone: string, customMessage?: string): string {
  const cleanPhone = adminPhone.replace(/[^0-9]/g, '');
  const defaultText = customMessage || 'Halo Admin JokiCoding, saya ingin berkonsultasi mengenai jasa tugas / ngoding / desain.';
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultText)}`;
}
