import { useNavigate } from 'react-router-dom';
import { Inbox } from 'lucide-react';

export default function FAQEmptyState() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div
        className="flex items-center justify-center rounded-full mb-4"
        style={{
          width: '64px',
          height: '64px',
          backgroundColor: '#EBF5FB',
        }}
      >
        <Inbox size={32} style={{ color: '#1A5276' }} />
      </div>
      <h3
        className="text-center font-semibold mb-1"
        style={{ fontSize: '16px', color: '#1C2833' }}
      >
        Belum ada FAQ tersimpan.
      </h3>
      <p
        className="text-center mb-5"
        style={{ fontSize: '14px', color: '#717D7E', lineHeight: 1.5 }}
      >
        Generate jawaban di halaman Generator, lalu simpan yang terbaik ke sini.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 rounded-lg font-semibold text-white transition-all"
        style={{
          backgroundColor: '#1A5276',
          fontSize: '14px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#2E86C1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#1A5276';
        }}
      >
        Buka Generator
      </button>
    </div>
  );
}
