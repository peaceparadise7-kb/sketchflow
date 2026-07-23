import React from 'react';

export type GlassBadgeVariant = 'emerald' | 'violet' | 'rose' | 'amber' | 'neutral';

interface GlassBadgeProps {
  children: React.ReactNode;
  variant?: GlassBadgeVariant;
  className?: string;
}

export const GlassBadge: React.FC<GlassBadgeProps> = ({
  children,
  variant = 'emerald',
  className = '',
}) => {
  const dotClasses: Record<GlassBadgeVariant, string> = {
    emerald: 'bg-emerald-400',
    violet: 'bg-emerald-400', // Restricted to Aurora Green for 0 blue/purple
    rose: 'bg-rose-400',
    amber: 'bg-amber-400',
    neutral: 'bg-neutral-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-black/30 border border-white/10 text-neutral-300 backdrop-blur-md shadow-md ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotClasses[variant]}`} />
      <span>{children}</span>
    </span>
  );
};

export default GlassBadge;
