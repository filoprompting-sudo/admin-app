import { Copy, Bookmark, AlertTriangle } from 'lucide-react';

interface ResponseOutputProps {
  answer: string;
  onCopy: () => void;
  onSave: () => void;
}

export default function ResponseOutput({ answer, onCopy, onSave }: ResponseOutputProps) {
  return (
    <div
      style={{
        animation: 'fadeIn 0.3s ease',
      }}
    >
      {/* Divider */}
      <div className="flex items-center gap-3 my-4">
        <div className="flex-1" style={{ height: '1px', backgroundColor: '#E5E7EB' }} />
        <span
          className="uppercase tracking-wider font-medium"
          style={{ fontSize: '12px', color: '#717D7E' }}
        >
          Hasil
        </span>
        <div className="flex-1" style={{ height: '1px', backgroundColor: '#E5E7EB' }} />
      </div>

      {/* Output Card */}
      <div
        className="rounded-xl p-4"
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E7EB',
        }}
      >
        <p
          className="whitespace-pre-wrap"
          style={{
            fontSize: '16px',
            lineHeight: 1.7,
            color: '#1C2833',
          }}
        >
          {answer}
        </p>
      </div>

      {/* Disclaimer */}
      <div
        className="flex items-start gap-2 rounded-lg mt-3 px-3 py-2.5"
        style={{
          backgroundColor: '#FEF9E7',
          borderLeft: '3px solid #F39C12',
        }}
      >
        <AlertTriangle size={14} style={{ color: '#7D6608', marginTop: '2px', flexShrink: 0 }} />
        <p style={{ fontSize: '13px', color: '#7D6608', lineHeight: 1.5 }}>
          Selalu periksa jawaban sebelum dikirim. AI bisa salah — terutama soal stok dan harga.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={onCopy}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg font-semibold transition-all"
          style={{
            height: '48px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #1A5276',
            color: '#1A5276',
            fontSize: '15px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#EBF5FB';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
          }}
        >
          <Copy size={16} />
          Salin Jawaban
        </button>
        <button
          onClick={onSave}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg font-semibold text-white transition-all"
          style={{
            height: '48px',
            backgroundColor: '#1A5276',
            fontSize: '15px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2E86C1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#1A5276';
          }}
        >
          <Bookmark size={16} />
          Simpan ke FAQ
        </button>
      </div>
    </div>
  );
}
