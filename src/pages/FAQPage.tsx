import { useState } from 'react';
import type { FAQEntry } from '@/lib/storage';
import { useFAQ } from '@/hooks/useFAQ';
import { useToast } from '@/hooks/useToast';
import { useClipboard } from '@/hooks/useClipboard';
import FAQFilter from '@/components/faq/FAQFilter';
import FAQList from '@/components/faq/FAQList';
import ConfirmDialog from '@/components/shared/ConfirmDialog';

type CategoryFilter = 'semua' | FAQEntry['category'];

export default function FAQPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('semua');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const { faqs, updateFAQ, deleteFAQ } = useFAQ();
  const { showToast } = useToast();
  const { copyToClipboard } = useClipboard();

  const handleCopy = async (answer: string) => {
    const success = await copyToClipboard(answer);
    if (success) {
      showToast('Jawaban berhasil disalin!');
    }
  };

  const handleEdit = (
    id: string,
    question: string,
    answer: string,
    category: FAQEntry['category']
  ) => {
    const success = updateFAQ(id, { question, answer, category });
    if (success) {
      showToast('FAQ berhasil diperbarui!');
    } else {
      showToast('Gagal memperbarui FAQ. Coba lagi.', 'error');
    }
  };

  const handleDelete = (id: string) => {
    setDeleteTarget(id);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      const success = deleteFAQ(deleteTarget);
      if (success) {
        showToast('FAQ berhasil dihapus!');
      } else {
        showToast('Gagal menghapus FAQ. Coba lagi.', 'error');
      }
      setDeleteTarget(null);
    }
  };

  return (
    <div className="px-4 py-5 flex flex-col gap-4">
      <FAQFilter active={activeFilter} onChange={setActiveFilter} />
      <FAQList
        faqs={faqs}
        activeFilter={activeFilter}
        onCopy={handleCopy}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ConfirmDialog
        title="Hapus FAQ?"
        message="Tindakan ini tidak bisa dibatalkan."
        visible={!!deleteTarget}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        variant="danger"
      />
    </div>
  );
}
