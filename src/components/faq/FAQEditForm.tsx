import { useState } from 'react';
import type { FAQEntry } from '@/lib/storage';

interface FAQEditFormProps {
  faq: FAQEntry;
  onSave: (id: string, question: string, answer: string, category: FAQEntry['category']) => void;
  onCancel: () => void;
}

const categories: { value: FAQEntry['category']; label: string }[] = [
  { value: 'stok', label: 'Stok' },
  { value: 'pengiriman', label: 'Pengiriman' },
  { value: 'retur', label: 'Retur' },
  { value: 'produk', label: 'Produk' },
  { value: 'lainnya', label: 'Lainnya' },
];

export default function FAQEditForm({ faq, onSave, onCancel }: FAQEditFormProps) {
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);
  const [category, setCategory] = useState<FAQEntry['category']>(faq.category);

  const handleSave = () => {
    if (question.trim() && answer.trim()) {
      onSave(faq.id, question.trim(), answer.trim(), category);
    }
  };

  return (
    <div
      className="rounded-xl p-4"
      style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid #2E86C1',
      }}
    >
      <div className="flex flex-col gap-3">
        <div>
          <label
            className="block mb-1 font-semibold"
            style={{ fontSize: '13px', color: '#717D7E' }}
          >
            Pertanyaan
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full rounded-lg p-2.5 text-sm resize-y outline-none"
            style={{
              minHeight: '60px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              color: '#1C2833',
              lineHeight: 1.5,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#1A5276';
              e.currentTarget.style.boxShadow = '0 0 0 2px rgba(26,82,118,0.15)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>

        <div>
          <label
            className="block mb-1 font-semibold"
            style={{ fontSize: '13px', color: '#717D7E' }}
          >
            Jawaban
          </label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full rounded-lg p-2.5 text-sm resize-y outline-none"
            style={{
              minHeight: '80px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              color: '#1C2833',
              lineHeight: 1.5,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#1A5276';
              e.currentTarget.style.boxShadow = '0 0 0 2px rgba(26,82,118,0.15)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>

        <div>
          <label
            className="block mb-1 font-semibold"
            style={{ fontSize: '13px', color: '#717D7E' }}
          >
            Kategori
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as FAQEntry['category'])}
            className="w-full rounded-lg px-3 text-sm outline-none appearance-none"
            style={{
              height: '40px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              color: '#1C2833',
            }}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 mt-1">
          <button
            onClick={onCancel}
            className="flex-1 h-10 rounded-lg font-medium transition-all"
            style={{
              backgroundColor: '#F3F4F6',
              color: '#1C2833',
              fontSize: '14px',
            }}
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="flex-1 h-10 rounded-lg font-semibold text-white transition-all"
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
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
