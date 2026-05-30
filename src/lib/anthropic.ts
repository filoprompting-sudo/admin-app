import type { StyleKey } from './prompts';
import { buildPrompt } from './prompts';

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || '';

export interface GenerateResponse {
  answer: string;
  error?: string;
}

export async function generateAnswer(
  style: StyleKey,
  question: string,
  productContext: string = ''
): Promise<GenerateResponse> {
  if (!API_KEY) {
    return { answer: '', error: 'API key tidak dikonfigurasi. Tambahkan VITE_ANTHROPIC_API_KEY di file .env.' };
  }

  const { system, user } = buildPrompt(style, question, productContext);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20251001',
        max_tokens: 512,
        system,
        messages: [
          { role: 'user', content: user },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || `HTTP ${response.status}`;
      return { answer: '', error: `Gagal membuat jawaban. ${errorMessage}` };
    }

    const data = await response.json();
    const answer = data.content?.[0]?.text || '';

    if (!answer) {
      return { answer: '', error: 'Jawaban kosong dari AI. Coba lagi.' };
    }

    return { answer };
  } catch {
    return { answer: '', error: 'Gagal membuat jawaban. Coba lagi beberapa saat.' };
  }
}
