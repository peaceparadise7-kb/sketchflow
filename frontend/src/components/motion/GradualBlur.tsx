import React from 'react';

interface GradualBlurProps {
  className?: string;
  height?: string;
  direction?: 'top-to-bottom' | 'bottom-to-top';
}

export const GradualBlur: React.FC<GradualBlurProps> = ({
  className = '',
  height = 'h-24',
  direction = 'top-to-bottom',
}) => {
  const isTopToBottom = direction === 'top-to-bottom';

  return (
    <div
      className={`relative w-full ${height} pointer-events-none overflow-hidden z-10 ${className}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-b ${
          isTopToBottom
            ? 'from-[#050505]/80 via-[#050505]/40 to-transparent backdrop-blur-md'
            : 'from-transparent via-[#050505]/40 to-[#050505]/80 backdrop-blur-md'
        }`}
        style={{
          maskImage: isTopToBottom
            ? 'linear-gradient(to bottom, black 0%, transparent 100%)'
            : 'linear-gradient(to top, black 0%, transparent 100%)',
          WebkitMaskImage: isTopToBottom
            ? 'linear-gradient(to bottom, black 0%, transparent 100%)'
            : 'linear-gradient(to top, black 0%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default GradualBlur;
