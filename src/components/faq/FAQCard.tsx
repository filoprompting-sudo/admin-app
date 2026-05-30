import { useState } from 'react';
import { Pencil, Trash2, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import type { FAQEntry } from '@/lib/storage';

const CATEGORY_STYLES: Record<
  FAQEntry['category'],
  { bg: string; text: string; label: string }
> = {
  stok: { bg: '#D5F5E3', text: '#1E8449', label: 'Stok' },
  pengiriman: { bg: '#D6EAF8', text: '#1A5276', label: 'Pengiriman' },
  retur: { bg: '#FADBD8', text: '#922B21', label: 'Retur' },
  produk: { bg: '#FCF3CF', text: '#7D6608', label: 'Produk' },
  lainnya: { bg: '#E8DAEF', text: '#6C3483', label: 'Lainnya' },
};

interface FAQCardProps {
  faq: FAQEntry;
  onCopy: (answer: string) => void;
  onEdit: (faq: FAQEntry) => void;
  onDelete: (id: string) => void;
}

export default function FAQCard({ faq, onCopy, onEdit, onDelete }: FAQCardProps) {
  const [expanded, setExpanded] = useState(false);
  const catStyle = CATEGORY_STYLES[faq.category];

  const formattedDate = new Date(faq.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div
      className="rounded-xl p-4"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}
    >
      {/* Top row: Category + Actions */}
      <div className="flex items-center justify-between">
        <span
          className="rounded-full font-semibold"
          style={{
            padding: '4px 10px',
            fontSize: '12px',
            backgroundColor: catStyle.bg,
            color: catStyle.text,
          }}
        >
          {catStyle.label}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(faq)}
            className="flex items-center justify-center rounded transition-all"
            style={{ width: '36px', height: '36px', color: '#717D7E' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F3F4F6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(faq.id)}
            className="flex items-center justify-center rounded transition-all"
            style={{ width: '36px', height: '36px', color: '#E74C3C' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FADBD8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Question */}
      <h4
        className="mt-2.5 font-semibold"
        style={{ fontSize: '16px', color: '#1C2833', lineHeight: 1.4 }}
      >
        {faq.question}
      </h4>

      {/* Answer */}
      <div className="mt-1.5">
        <p
          style={{
            fontSize: '15px',
            color: '#717D7E',
            lineHeight: 1.6,
            ...(expanded
              ? {}
              : {
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }),
          }}
        >
          {faq.answer}
        </p>
        {faq.answer.length > 100 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-1 font-medium flex items-center gap-0.5"
            style={{ fontSize: '14px', color: '#1A5276' }}
          >
            {expanded ? (
              <>
                Lihat lebih sedikit <ChevronUp size={14} />
              </>
            ) : (
              <>
                Lihat selengkapnya <ChevronDown size={14} />
              </>
            )}
          </button>
        )}
      </div>

      {/* Bottom row: Date + Copy */}
      <div className="flex items-center justify-between mt-3">
        <span style={{ fontSize: '12px', color: '#717D7E' }}>{formattedDate}</span>
        <button
          onClick={() => onCopy(faq.answer)}
          className="flex items-center gap-1.5 font-medium transition-all px-2 py-1 rounded"
          style={{ fontSize: '14px', color: '#1A5276' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#EBF5FB';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Copy size={14} />
          Salin
        </button>
      </div>
    </div>
  );
}
