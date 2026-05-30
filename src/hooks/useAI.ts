import { useState, useCallback } from 'react';
import { generateAnswer } from '@/lib/anthropic';
import type { StyleKey } from '@/lib/prompts';
import type { GenerateResponse } from '@/lib/anthropic';

export function useAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(null);

  const generate = useCallback(
    async (style: StyleKey, question: string, productContext: string = '') => {
      // Check online status
      if (!navigator.onLine) {
        setResult({
          answer: '',
          error: 'Tidak ada koneksi internet. Pastikan HP terhubung ke internet.',
        });
        return;
      }

      setIsLoading(true);
      setResult(null);

      const response = await generateAnswer(style, question, productContext);
      setResult(response);
      setIsLoading(false);
    },
    []
  );

  const reset = useCallback(() => {
    setResult(null);
    setIsLoading(false);
  }, []);

  return { isLoading, result, generate, reset };
}
