import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden text-center">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 text-xs sm:text-sm font-medium mb-8 shadow-inner">
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
          <span>Introducing SketchFlow 1.0</span>
          <span className="text-indigo-400/60">•</span>
          <span className="text-slate-400">The Visual Platform for Software Engineers</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          Think visually.{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-indigo-200 to-white bg-clip-text text-transparent">
            Architect faster.
          </span>
        </h1>

        {/* Supporting Paragraph */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 font-normal mb-10 leading-relaxed">
          The minimalist digital canvas designed for engineering teams to diagram distributed systems, map user flows, and transform complex ideas into crystal-clear visual specifications.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            to={ROUTES.REGISTER}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-600/25 transition-all hover:shadow-indigo-600/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <span>Start Sketching Free</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-medium px-8 py-3.5 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-slate-600"
          >
            <span>Explore Architecture</span>
          </a>
        </div>

        {/* Micro feature highlights */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Instant canvas setup</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Open architecture</span>
          </div>
        </div>
      </div>
    </section>
  );
};
