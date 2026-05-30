import { useState } from 'react';
import type { FAQEntry } from '@/lib/storage';
import FAQCard from './FAQCard';
import FAQEditForm from './FAQEditForm';
import FAQEmptyState from './FAQEmptyState';

interface FAQListProps {
  faqs: FAQEntry[];
  activeFilter: string;
  onCopy: (answer: string) => void;
  onEdit: (id: string, question: string, answer: string, category: FAQEntry['category']) => void;
  onDelete: (id: string) => void;
}

export default function FAQList({ faqs, activeFilter, onCopy, onEdit, onDelete }: FAQListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const filtered =
    activeFilter === 'semua'
      ? faqs
      : faqs.filter((f) => f.category === activeFilter);

  if (faqs.length === 0) {
    return <FAQEmptyState />;
  }

  if (filtered.length === 0) {
    return (
      <div className="text-center py-10">
        <p style={{ fontSize: '15px', color: '#717D7E' }}>
          Belum ada FAQ untuk kategori{' '}
          <span className="font-medium" style={{ color: '#1C2833' }}>
            {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
          </span>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {filtered.map((faq) =>
        editingId === faq.id ? (
          <FAQEditForm
            key={faq.id}
            faq={faq}
            onSave={(id, q, a, c) => {
              onEdit(id, q, a, c);
              setEditingId(null);
            }}
            onCancel={() => setEditingId(null)}
          />
        ) : (
          <FAQCard
            key={faq.id}
            faq={faq}
            onCopy={onCopy}
            onEdit={() => setEditingId(faq.id)}
            onDelete={onDelete}
          />
        )
      )}
    </div>
  );
}
