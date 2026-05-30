import { useLocation, useNavigate } from 'react-router-dom';
import { Zap, ClipboardList } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { path: '/', label: 'Generator', icon: Zap },
    { path: '/faq', label: 'FAQ', icon: ClipboardList },
  ];

  return (
    <nav
      className="sticky bottom-0 z-50 bg-white flex items-center justify-around"
      style={{ height: '60px', borderTop: '1px solid #E5E7EB' }}
    >
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        const Icon = tab.icon;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center justify-center gap-1 select-none"
            style={{
              width: '50%',
              height: '60px',
              color: isActive ? '#1A5276' : '#717D7E',
              fontWeight: isActive ? 600 : 500,
              fontSize: '12px',
              transition: 'all 0.2s ease',
            }}
          >
            <Icon size={20} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
