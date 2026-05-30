import { STYLE_LABELS, type StyleKey } from '@/lib/prompts';

interface StyleSelectorProps {
  selected: StyleKey;
  onChange: (style: StyleKey) => void;
}

const styles: StyleKey[] = ['ramah', 'formal', 'singkat', 'soft_selling', 'luxury', 'fast_response'];

export default function StyleSelector({ selected, onChange }: StyleSelectorProps) {
  return (
    <div>
      <label
        className="block mb-2 font-semibold"
        style={{ fontSize: '14px', color: '#717D7E' }}
      >
        Gaya Respons
      </label>
      <div
        className="flex gap-2 overflow-x-auto pb-1"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {styles.map((style) => {
          const isActive = selected === style;
          return (
            <button
              key={style}
              onClick={() => onChange(style)}
              className="whitespace-nowrap select-none transition-all"
              style={{
                height: '40px',
                padding: '0 16px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 500,
                backgroundColor: isActive ? '#1A5276' : '#EBF5FB',
                color: isActive ? '#FFFFFF' : '#1A5276',
                border: isActive ? '1px solid #1A5276' : '1px solid transparent',
                flexShrink: 0,
              }}
            >
              {STYLE_LABELS[style]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
