import React from 'react';

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="optical-glass-card p-8 group transition-all duration-300 hover:scale-[1.015] hover:border-t-white/40">
      {/* Icon Container */}
      <div className="w-12 h-12 rounded-2xl bg-black/50 border border-white/15 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:border-emerald-400/40 transition-all mb-6 shadow-lg shadow-black/60">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-neutral-400 font-normal leading-relaxed">
        {description}
      </p>
    </div>
  );
};
