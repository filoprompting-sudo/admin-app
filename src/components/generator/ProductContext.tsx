import { useState, useEffect, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { getProductContext, saveProductContext } from '@/lib/storage';

interface ProductContextProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductContext({ value, onChange }: ProductContextProps) {
  const [expanded, setExpanded] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = getProductContext();
    if (saved && !value) {
      onChange(saved);
      setExpanded(true);
    }
  }, []);

  // Auto-save to localStorage on debounce
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      if (value !== undefined) {
        saveProductContext(value);
      }
    }, 1000);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [value]);

  return (
    <div>
      {!expanded ? (
        <button
          onClick={() => setExpanded(true)}
          className="w-full flex items-center justify-center gap-2 transition-all"
          style={{
            height: '44px',
            border: '1px dashed #E5E7EB',
            borderRadius: '8px',
            color: '#1A5276',
            fontSize: '14px',
            fontWeight: 500,
            backgroundColor: 'transparent',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#1A5276';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E5E7EB';
          }}
        >
          <Plus size={16} />
          Tambah Info Produk
        </button>
      ) : (
        <div
          style={{
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div className="flex items-center justify-between mb-1">
            <label
              className="font-semibold"
              style={{ fontSize: '14px', color: '#717D7E' }}
            >
              Info Produk (opsional)
            </label>
            <button
              onClick={() => setExpanded(false)}
              className="p-1"
              style={{ color: '#717D7E' }}
            >
              <Minus size={16} />
            </button>
          </div>
          <p className="mb-2" style={{ fontSize: '12px', color: '#717D7E' }}>
            Berikan info produk agar AI memberikan jawaban yang lebih akurat.
          </p>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Contoh: Stok ukuran S-XL ready. Harga 89rb. Warna: hitam, putih, merah. Pengiriman 1-3 hari."
            className="w-full rounded-xl p-3.5 text-base resize-y outline-none transition-all"
            style={{
              minHeight: '100px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              color: '#1C2833',
              lineHeight: 1.6,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#1A5276';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(26,82,118,0.15)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
}
