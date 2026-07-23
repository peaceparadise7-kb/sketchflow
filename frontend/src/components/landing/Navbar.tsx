import React from 'react';
import { Link } from 'react-router-dom';
import { GlassButton, GlassBadge } from '../ui';
import { ROUTES } from '@/constants';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-5 inset-x-0 z-50 w-full max-w-5xl mx-auto px-4 sm:px-6">
      <div className="optical-glass-pill flex items-center justify-between px-6 py-3 shadow-2xl">
        {/* Brand Logo */}
        <Link to={ROUTES.LANDING} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-white/20 flex items-center justify-center shadow-lg shadow-black/50 group-hover:scale-105 transition-transform">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2V4zm-6 8a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zm12 0a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zM4 18a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zm12 0a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm text-white tracking-tight leading-none group-hover:text-emerald-400 transition-colors">
              SketchFlow
            </span>
            <span className="text-[9px] font-mono text-neutral-400 leading-tight">Infinite Whiteboard</span>
          </div>
          <GlassBadge variant="emerald" className="hidden sm:inline-flex">
            v2.0
          </GlassBadge>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-neutral-300">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a
            href="https://github.com/peaceparadise7-kb/sketchflow"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Link to={ROUTES.LOGIN}>
            <GlassButton variant="secondary" className="py-2 px-3.5 text-xs">
              Sign In
            </GlassButton>
          </Link>
          <Link to={ROUTES.BOARD_DETAIL('new')}>
            <GlassButton variant="primary" className="py-2 px-4 text-xs font-bold">
              Launch App
            </GlassButton>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
