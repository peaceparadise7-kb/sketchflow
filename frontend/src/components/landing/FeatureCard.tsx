import React from 'react';

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="group relative p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1">
      {/* Subtle card glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Icon container */}
      <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-indigo-400 group-hover:text-indigo-300 group-hover:bg-indigo-950/50 group-hover:border-indigo-800/60 transition-colors mb-6 shadow-sm">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-400 font-normal leading-relaxed">
        {description}
      </p>
    </div>
  );
};
