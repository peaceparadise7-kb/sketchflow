import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-10 sm:p-16 text-center shadow-2xl">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Ready to sketch your next idea?
          </h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed font-normal">
            Start diagramming your system architecture in seconds. No complicated setup, no bloat.
          </p>
          <div>
            <Link
              to={ROUTES.REGISTER}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-lg px-8 py-4 rounded-xl shadow-xl shadow-indigo-600/30 transition-all hover:shadow-indigo-600/50 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <span>Start Drawing</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
