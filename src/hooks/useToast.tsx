import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';

export interface ToastState {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
}

interface ToastContextValue {
  toast: ToastState;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextValue>({
  toast: { message: '', type: 'success', visible: false },
  showToast: () => {},
});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'success',
    visible: false,
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' = 'success') => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setToast({ message, type, visible: true });
      timerRef.current = setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 2000);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  return useContext(ToastContext);
}
