import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to={ROUTES.LANDING}
              className="flex items-center gap-2 text-white font-bold text-xl tracking-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-1"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-md shadow-indigo-500/20">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 4a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2V4zm-6 8a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zm12 0a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zM4 18a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zm12 0a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1z"
                  />
                </svg>
              </div>
              <span>SketchFlow</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            <a
              href="#features"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-2 py-1"
            >
              Features
            </a>
            <a
              href="https://github.com/peaceparadise7-kb/sketchflow"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-2 py-1"
            >
              <span>GitHub</span>
              <svg className="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to={ROUTES.LOGIN}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-3 py-1.5"
            >
              Login
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className="text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md shadow-indigo-600/30 transition-all hover:shadow-indigo-600/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="text-slate-400 hover:text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-4 space-y-3" id="mobile-menu">
          <a
            href="#features"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-white py-1"
          >
            Features
          </a>
          <a
            href="https://github.com/peaceparadise7-kb/sketchflow"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-base font-medium text-slate-300 hover:text-white py-1"
          >
            GitHub
          </a>
          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            <Link
              to={ROUTES.LOGIN}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-center text-base font-medium text-slate-300 hover:text-white py-2"
            >
              Login
            </Link>
            <Link
              to={ROUTES.REGISTER}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-center text-base font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
