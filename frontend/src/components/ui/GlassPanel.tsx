import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`relative bg-[#08080a]/70 backdrop-blur-[32px] backdrop-saturate-[180%] border border-white/[0.08] shadow-[0_24px_50px_rgba(0,0,0,0.85)] rounded-3xl p-6 sm:p-8 overflow-hidden ${className}`}
    >
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};

export default GlassPanel;
