const KEYS = {
  faqs: 'adminmanager_faqs',
  productContext: 'adminmanager_product_context',
} as const;

export interface FAQEntry {
  id: string;
  question: string;
  answer: string;
  category: 'stok' | 'pengiriman' | 'retur' | 'produk' | 'lainnya';
  createdAt: string;
}

export function getFAQs(): FAQEntry[] {
  try {
    const raw = localStorage.getItem(KEYS.faqs);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFAQs(faqs: FAQEntry[]): boolean {
  try {
    localStorage.setItem(KEYS.faqs, JSON.stringify(faqs));
    return true;
  } catch {
    return false;
  }
}

export function getProductContext(): string {
  try {
    return localStorage.getItem(KEYS.productContext) || '';
  } catch {
    return '';
  }
}

export function saveProductContext(text: string): boolean {
  try {
    localStorage.setItem(KEYS.productContext, text);
    return true;
  } catch {
    return false;
  }
}
