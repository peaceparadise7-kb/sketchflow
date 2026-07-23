import React from 'react';
import { Link } from 'react-router-dom';
import { GlobalBackground, GlassBadge, GlassButton, GlassCard, GlassHeader } from '@/components/ui';
import { ROUTES } from '@/constants';

export const NotFound: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#050505] text-neutral-100 font-sans selection:bg-neutral-800 selection:text-white flex flex-col justify-between">
      {/* Shared Global Aurora & Engineering Grid Background */}
      <GlobalBackground />

      {/* Header */}
      <GlassHeader
        leftContent={
          <Link to={ROUTES.LANDING} className="flex items-center gap-2 text-white font-bold text-sm tracking-tight">
            <div className="w-6 h-6 rounded-lg bg-neutral-900 border border-white/15 flex items-center justify-center shadow-md">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2V4zm-6 8a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zm12 0a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zM4 18a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zm12 0a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1z" />
              </svg>
            </div>
            <span className="font-extrabold tracking-tight">SketchFlow</span>
          </Link>
        }
      />

      {/* Main 404 Center Body */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center py-16 px-4 text-center">
        <GlassCard className="p-10 max-w-md w-full shadow-2xl flex flex-col items-center">
          <GlassBadge variant="emerald" className="mb-4">
            Error 404
          </GlassBadge>

          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Canvas Not Found</h1>
          <p className="text-sm text-neutral-400 font-normal leading-relaxed mb-8">
            The whiteboard page or architectural diagram you are searching for does not exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link to={ROUTES.DASHBOARD} className="flex-1">
              <GlassButton variant="primary" className="w-full py-2.5 text-xs font-bold">
                Return to Dashboard
              </GlassButton>
            </Link>
            <Link to={ROUTES.LANDING} className="flex-1">
              <GlassButton variant="secondary" className="w-full py-2.5 text-xs font-medium">
                Back to Home
              </GlassButton>
            </Link>
          </div>
        </GlassCard>
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-6 text-center text-xs text-neutral-500 font-medium">
        <span>© {new Date().getFullYear()} SketchFlow Engine. All rights reserved.</span>
      </footer>
    </div>
  );
};

export default NotFound;
