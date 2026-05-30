import { Bot } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showIcon?: boolean;
}

export default function Header({ title = 'Admin Manager', showIcon = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 h-[52px] flex items-center px-4" style={{ backgroundColor: '#1A5276' }}>
      <div className="flex items-center gap-2">
        {showIcon && <Bot size={20} className="text-white" />}
        <h1 className="text-white font-bold" style={{ fontSize: '18px' }}>
          {title}
        </h1>
      </div>
    </header>
  );
}
