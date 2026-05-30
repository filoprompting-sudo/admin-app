import type { FAQEntry } from '@/lib/storage';

type CategoryFilter = 'semua' | FAQEntry['category'];

interface FAQFilterProps {
  active: CategoryFilter;
  onChange: (filter: CategoryFilter) => void;
}

const filters: { value: CategoryFilter; label: string }[] = [
  { value: 'semua', label: 'Semua' },
  { value: 'stok', label: 'Stok' },
  { value: 'pengiriman', label: 'Pengiriman' },
  { value: 'retur', label: 'Retur' },
  { value: 'produk', label: 'Produk' },
  { value: 'lainnya', label: 'Lainnya' },
];

export default function FAQFilter({ active, onChange }: FAQFilterProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {filters.map((filter) => {
        const isActive = active === filter.value;
        return (
          <button
            key={filter.value}
            onClick={() => onChange(filter.value)}
            className="whitespace-nowrap select-none transition-all"
            style={{
              height: '36px',
              padding: '0 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 500,
              backgroundColor: isActive ? '#1A5276' : '#EBF5FB',
              color: isActive ? '#FFFFFF' : '#1A5276',
              border: isActive ? '1px solid #1A5276' : '1px solid transparent',
              flexShrink: 0,
            }}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
