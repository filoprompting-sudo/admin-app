import { useState } from 'react';
import { X } from 'lucide-react';
import type { FAQEntry } from '@/lib/storage';

interface SaveFAQModalProps {
  visible: boolean;
  question: string;
  answer: string;
  onSave: (question: string, answer: string, category: FAQEntry['category']) => void;
  onCancel: () => void;
}

const categories: { value: FAQEntry['category']; label: string }[] = [
  { value: 'stok', label: 'Stok' },
  { value: 'pengiriman', label: 'Pengiriman' },
  { value: 'retur', label: 'Retur' },
  { value: 'produk', label: 'Produk' },
  { value: 'lainnya', label: 'Lainnya' },
];

export default function SaveFAQModal({
  visible,
  question,
  answer,
  onSave,
  onCancel,
}: SaveFAQModalProps) {
  const [q, setQ] = useState(question);
  const [a, setA] = useState(answer);
  const [category, setCategory] = useState<FAQEntry['category']>('stok');

  // Reset when opening
  useState(() => {
    if (visible) {
      setQ(question);
      setA(answer);
      setCategory('stok');
    }
  });

  if (!visible) return null;

  const handleSave = () => {
    if (q.trim() && a.trim()) {
      onSave(q.trim(), a.trim(), category);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div
        className="bg-white rounded-2xl p-5 mx-4 w-full"
        style={{
          maxWidth: '400px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          animation: 'slideUp 0.3s ease-out',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold" style={{ fontSize: '18px', color: '#1C2833' }}>
            Simpan ke FAQ
          </h3>
          <button
            onClick={onCancel}
            className="flex items-center justify-center"
            style={{ width: '36px', height: '36px', color: '#717D7E' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div>
            <label
              className="block mb-1.5 font-semibold"
              style={{ fontSize: '14px', color: '#717D7E' }}
            >
              Pertanyaan
            </label>
            <textarea
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-lg p-3 text-base resize-y outline-none"
              style={{
                minHeight: '80px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                color: '#1C2833',
                lineHeight: 1.5,
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

          <div>
            <label
              className="block mb-1.5 font-semibold"
              style={{ fontSize: '14px', color: '#717D7E' }}
            >
              Jawaban
            </label>
            <textarea
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="w-full rounded-lg p-3 text-base resize-y outline-none"
              style={{
                minHeight: '100px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                color: '#1C2833',
                lineHeight: 1.5,
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

          <div>
            <label
              className="block mb-1.5 font-semibold"
              style={{ fontSize: '14px', color: '#717D7E' }}
            >
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as FAQEntry['category'])}
              className="w-full rounded-lg px-3.5 text-base outline-none appearance-none"
              style={{
                height: '48px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                color: '#1C2833',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#1A5276';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
              }}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={onCancel}
            className="h-11 px-5 rounded-lg font-medium transition-all"
            style={{
              backgroundColor: 'transparent',
              color: '#717D7E',
              fontSize: '14px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F3F4F6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="flex-1 h-11 rounded-lg font-semibold text-white transition-all"
            style={{
              backgroundColor: '#1A5276',
              fontSize: '14px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2E86C1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#1A5276';
            }}
          >
            Simpan ke FAQ
          </button>
        </div>
      </div>
    </div>
  );
}
