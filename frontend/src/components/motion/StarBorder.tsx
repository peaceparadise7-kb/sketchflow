import React from 'react';

interface StarBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  speed?: string;
}

export const StarBorder: React.FC<StarBorderProps> = ({
  children,
  className = '',
  color = 'rgba(52, 211, 153, 0.45)', // Aurora Emerald Green
}) => {
  return (
    <div className={`relative inline-block rounded-full p-[1px] overflow-hidden group ${className}`}>
      {/* Slow Rotating Border Highlight */}
      <div
        className="absolute inset-[-100%] animate-[spin_6s_linear_infinite] opacity-75 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg, transparent 0 340deg, ${color} 360deg)`,
        }}
      />
      {/* Inner Child Wrapper */}
      <div className="relative z-10 rounded-full bg-black/40">
        {children}
      </div>
    </div>
  );
};

export default StarBorder;
