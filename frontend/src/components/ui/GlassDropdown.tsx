import React, { useState } from 'react';

interface GlassDropdownItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
}

interface GlassDropdownProps {
  trigger: React.ReactNode;
  items: GlassDropdownItem[];
}

export const GlassDropdown: React.FC<GlassDropdownProps> = ({ trigger, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 bg-[#0f172a]/90 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl py-2 z-50 animate-card-entrance">
            {items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium transition-colors ${
                  item.danger
                    ? 'text-rose-400 hover:bg-rose-950/40'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GlassDropdown;
