import React from 'react';

interface GlassHeaderProps {
  leftContent?: React.ReactNode;
  centerContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
}

export const GlassHeader: React.FC<GlassHeaderProps> = ({
  leftContent,
  centerContent,
  rightContent,
  className = '',
}) => {
  return (
    <header className={`sticky top-5 z-50 w-full max-w-6xl mx-auto px-4 animate-header-fade ${className}`}>
      <div className="optical-glass-pill flex items-center justify-between px-6 py-3 transition-all duration-300">
        {/* Specular top reflection line */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
        <div className="relative z-10">{leftContent}</div>
        <div className="relative z-10">{centerContent}</div>
        <div className="relative z-10">{rightContent}</div>
      </div>
    </header>
  );
};

export default GlassHeader;
