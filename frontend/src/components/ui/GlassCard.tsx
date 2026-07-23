import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animateEntrance?: boolean;
  withTopHighlight?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  animateEntrance = true,
  withTopHighlight = true,
}) => {
  return (
    <div
      className={`optical-glass-card p-7 sm:p-10 ${
        animateEntrance ? 'animate-card-entrance' : ''
      } ${className}`}
    >
      {/* Specular Top Reflection Line */}
      {withTopHighlight && (
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
      )}
      {/* Inner Edge Frame */}
      <div className="absolute inset-0 rounded-3xl border border-white/[0.04] pointer-events-none" />
      {children}
    </div>
  );
};

export default GlassCard;
