import { CheckCircle, AlertCircle } from 'lucide-react';
import type { ToastState } from '@/hooks/useToast';

interface ToastProps {
  toast: ToastState;
}

export default function Toast({ toast }: ToastProps) {
  if (!toast.visible) return null;

  return (
    <div
      className="fixed left-1/2 z-[200] flex items-center gap-2 px-5 py-3 rounded-lg text-white"
      style={{
        top: '16px',
        transform: 'translateX(-50%)',
        backgroundColor: toast.type === 'success' ? '#27AE60' : '#E74C3C',
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        animation: 'slideDown 0.3s ease-out',
      }}
    >
      {toast.type === 'success' ? (
        <CheckCircle size={16} />
      ) : (
        <AlertCircle size={16} />
      )}
      <span className="font-medium" style={{ fontSize: '14px' }}>
        {toast.message}
      </span>
    </div>
  );
}
