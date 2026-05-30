import { useState } from 'react';
import type { StyleKey } from '@/lib/prompts';
import type { FAQEntry } from '@/lib/storage';
import { useAI } from '@/hooks/useAI';
import { useToast } from '@/hooks/useToast';
import { useClipboard } from '@/hooks/useClipboard';
import { useFAQ } from '@/hooks/useFAQ';
import QuestionInput from '@/components/generator/QuestionInput';
import StyleSelector from '@/components/generator/StyleSelector';
import ProductContext from '@/components/generator/ProductContext';
import GenerateButton from '@/components/generator/GenerateButton';
import ResponseOutput from '@/components/generator/ResponseOutput';
import SaveFAQModal from '@/components/generator/SaveFAQModal';

export default function GeneratorPage() {
  const [question, setQuestion] = useState('');
  const [style, setStyle] = useState<StyleKey>('ramah');
  const [productContext, setProductContext] = useState('');
  const [validationError, setValidationError] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);

  const { isLoading, result, generate } = useAI();
  const { showToast } = useToast();
  const { copyToClipboard } = useClipboard();
  const { addFAQ } = useFAQ();

  const handleGenerate = () => {
    if (question.trim().length < 5) {
      setValidationError('Pertanyaan terlalu pendek. Minimal 5 karakter.');
      return;
    }
    setValidationError('');
    generate(style, question.trim(), productContext);
  };

  const handleCopy = async () => {
    if (result?.answer) {
      const success = await copyToClipboard(result.answer);
      if (success) {
        showToast('Jawaban berhasil disalin!');
      }
    }
  };

  const handleSaveFAQ = (q: string, a: string, category: FAQEntry['category']) => {
    const success = addFAQ(q, a, category);
    if (success) {
      showToast('FAQ berhasil disimpan!');
      setShowSaveModal(false);
    } else {
      showToast('Gagal menyimpan FAQ. Coba lagi.', 'error');
    }
  };

  const hasResult = !!result?.answer;
  const hasError = !!result?.error;
  const canGenerate = question.trim().length >= 5;

  return (
    <div className="px-4 py-5 flex flex-col gap-5">
      <QuestionInput
        value={question}
        onChange={(val) => {
          setQuestion(val);
          if (validationError) setValidationError('');
        }}
        error={validationError}
      />

      <StyleSelector selected={style} onChange={setStyle} />

      <ProductContext value={productContext} onChange={setProductContext} />

      <GenerateButton
        onClick={handleGenerate}
        disabled={!canGenerate}
        loading={isLoading}
      />

      {/* Error from API */}
      {hasError && !isLoading && (
        <div
          className="rounded-lg p-3 text-center"
          style={{
            backgroundColor: '#FADBD8',
            color: '#922B21',
            fontSize: '14px',
          }}
        >
          {result.error}
        </div>
      )}

      {/* Result */}
      {hasResult && !isLoading && (
        <ResponseOutput
          answer={result.answer}
          onCopy={handleCopy}
          onSave={() => setShowSaveModal(true)}
        />
      )}

      {/* Save FAQ Modal */}
      <SaveFAQModal
        visible={showSaveModal}
        question={question}
        answer={result?.answer || ''}
        onSave={handleSaveFAQ}
        onCancel={() => setShowSaveModal(false)}
      />
    </div>
  );
}
