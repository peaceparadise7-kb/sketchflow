import React, { useState } from 'react';

interface GlassTooltipProps {
  content: string;
  children: React.ReactNode;
}

export const GlassTooltip: React.FC<GlassTooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[11px] font-medium text-slate-200 bg-slate-900/90 backdrop-blur-md border border-white/[0.08] rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none">
          {content}
        </div>
      )}
    </div>
  );
};

export default GlassTooltip;
