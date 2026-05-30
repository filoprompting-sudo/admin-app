import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GeneratorPage from '@/pages/GeneratorPage';
import FAQPage from '@/pages/FAQPage';
import Header from '@/components/shared/Header';
import BottomNav from '@/components/shared/BottomNav';
import Toast from '@/components/shared/Toast';
import { ToastProvider, useToast } from '@/hooks/useToast';

function AppContent() {
  const { toast } = useToast();

  return (
    <div
      className="flex flex-col min-h-screen mx-auto relative"
      style={{
        maxWidth: '512px',
        backgroundColor: '#F8F9FA',
      }}
    >
      <Header />
      <main
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: '80px' }}
      >
        <Routes>
          <Route path="/" element={<GeneratorPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <BottomNav />
      <Toast toast={toast} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </BrowserRouter>
  );
}
