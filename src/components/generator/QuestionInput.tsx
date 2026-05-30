import { useState } from 'react';

interface QuestionInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function QuestionInput({ value, onChange, error }: QuestionInputProps) {
  const [localError, setLocalError] = useState('');

  const displayError = error || localError;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    if (localError) setLocalError('');
  };

  return (
    <div>
      <label
        className="block mb-2 font-semibold"
        style={{ fontSize: '14px', color: '#717D7E' }}
      >
        Pertanyaan Customer
      </label>
      <textarea
        value={value}
        onChange={handleChange}
        placeholder="Paste pertanyaan customer di sini..."
        className="w-full rounded-xl p-3.5 text-base resize-y outline-none transition-all"
        style={{
          minHeight: '120px',
          backgroundColor: '#FFFFFF',
          border: displayError ? '1px solid #E74C3C' : '1px solid #E5E7EB',
          color: '#1C2833',
          lineHeight: 1.6,
        }}
        onFocus={(e) => {
          if (!displayError) {
            e.currentTarget.style.borderColor = '#1A5276';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(26,82,118,0.15)';
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = displayError ? '#E74C3C' : '#E5E7EB';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
      {displayError && (
        <p className="mt-1.5" style={{ fontSize: '13px', color: '#E74C3C' }}>
          {displayError}
        </p>
      )}
    </div>
  );
}
