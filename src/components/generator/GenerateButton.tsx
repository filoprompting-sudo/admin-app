import { Loader2 } from 'lucide-react';

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

export default function GenerateButton({ onClick, disabled, loading }: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full font-semibold text-white rounded-lg select-none transition-all flex items-center justify-center gap-2"
      style={{
        height: '52px',
        fontSize: '16px',
        backgroundColor: disabled || loading ? '#B0C4DE' : '#1A5276',
        boxShadow: disabled || loading ? 'none' : '0 2px 8px rgba(26,82,118,0.25)',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.backgroundColor = '#2E86C1';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.backgroundColor = '#1A5276';
        }
      }}
    >
      {loading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          Membuat jawaban...
        </>
      ) : (
        'Generate Jawaban'
      )}
    </button>
  );
}
