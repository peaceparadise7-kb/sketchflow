import React from 'react';
import { Link } from 'react-router-dom';
import { GlobalBackground, GlassHeader } from '../ui';
import { ROUTES } from '@/constants';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="relative min-h-screen bg-[#050505] flex flex-col justify-between overflow-x-hidden text-neutral-100 font-sans selection:bg-neutral-800 selection:text-white">
      {/* Shared Global Aurora & Engineering Grid Background */}
      <GlobalBackground />

      {/* Reusable Sticky True Glass Header */}
      <GlassHeader
        leftContent={
          <Link
            to={ROUTES.LANDING}
            className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 rounded-full px-3 py-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </Link>
        }
        centerContent={
          <Link
            to={ROUTES.LANDING}
            className="flex items-center gap-2 text-white font-bold text-sm tracking-tight focus:outline-none focus:ring-2 focus:ring-white/20 rounded-full p-1"
          >
            <div className="w-6 h-6 rounded-lg bg-neutral-900 border border-white/15 flex items-center justify-center shadow-md shadow-black/40">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2V4zm-6 8a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zm12 0a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zM4 18a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zm12 0a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1z" />
              </svg>
            </div>
            <span className="font-extrabold tracking-tight">SketchFlow</span>
          </Link>
        }
        rightContent={
          <a
            href="https://github.com/peaceparadise7-kb/sketchflow"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            title="GitHub Repository"
            className="text-neutral-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 rounded-full p-1.5 inline-flex items-center justify-center"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        }
      />

      {/* Glass Fade Gradient Below Header for Soft Scroll Experience */}
      <div className="sticky top-[76px] z-40 h-20 bg-gradient-to-b from-[#050505] via-[#050505]/50 to-transparent pointer-events-none -mb-20" />

      {/* Main Form Body */}
      <main className="relative z-10 flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-neutral-400 font-normal">{subtitle}</p>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {children}

          {/* Muted Secure Authentication Trust Indicator */}
          <div className="mt-6 text-center">
            <p className="text-xs text-neutral-500 font-medium flex items-center justify-center gap-1.5">
              <span>🔒</span>
              <span>Secure Authentication</span>
            </p>
          </div>
        </div>
      </main>

      {/* Minimalist Footer */}
      <footer className="relative z-20 py-6 text-center text-xs text-neutral-500 font-medium">
        <div className="flex items-center justify-center gap-4">
          <a href="#privacy" className="hover:text-neutral-300 transition-colors focus:outline-none focus:underline">
            Privacy
          </a>
          <span>•</span>
          <a href="#terms" className="hover:text-neutral-300 transition-colors focus:outline-none focus:underline">
            Terms
          </a>
          <span>•</span>
          <a href="#security" className="hover:text-neutral-300 transition-colors focus:outline-none focus:underline">
            Security
          </a>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
