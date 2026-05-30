import { useCallback } from 'react';

export function useClipboard() {
  const copyToClipboard = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
          return true;
        }

        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);

        if (success) return true;

        // Last resort
        alert('Salin teks ini secara manual:\n\n' + text);
        return false;
      } catch {
        return false;
      }
    },
    []
  );

  return { copyToClipboard };
}
