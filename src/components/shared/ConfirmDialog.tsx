import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'default';
}

export default function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Hapus',
  cancelLabel = 'Batal',
  visible,
  onConfirm,
  onCancel,
  variant = 'danger',
}: ConfirmDialogProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div
        className="bg-white rounded-2xl p-5 mx-4 flex flex-col items-center"
        style={{
          maxWidth: '320px',
          width: '100%',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          animation: 'slideUp 0.3s ease-out',
        }}
      >
        <div
          className="flex items-center justify-center rounded-full mb-3"
          style={{
            width: '48px',
            height: '48px',
            backgroundColor: variant === 'danger' ? '#FADBD8' : '#D6EAF8',
          }}
        >
          <AlertTriangle
            size={24}
            style={{ color: variant === 'danger' ? '#E74C3C' : '#2E86C1' }}
          />
        </div>
        <h3
          className="text-center font-bold mb-1"
          style={{ fontSize: '18px', color: '#1C2833' }}
        >
          {title}
        </h3>
        <p
          className="text-center mb-5"
          style={{ fontSize: '14px', color: '#717D7E' }}
        >
          {message}
        </p>
        <div className="flex gap-3 w-full">
          <button
            onClick={onCancel}
            className="flex-1 h-11 rounded-lg font-medium"
            style={{
              backgroundColor: '#F3F4F6',
              color: '#1C2833',
              fontSize: '14px',
            }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-11 rounded-lg font-semibold text-white"
            style={{
              backgroundColor: variant === 'danger' ? '#E74C3C' : '#1A5276',
              fontSize: '14px',
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
