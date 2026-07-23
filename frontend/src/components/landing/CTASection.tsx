import React from 'react';
import { Link } from 'react-router-dom';
import { GlassButton } from '../ui';
import { ROUTES } from '@/constants';

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
      <div className="optical-glass-card p-10 sm:p-16 text-center shadow-2xl overflow-hidden relative">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Ready to start drawing?
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg mb-8 leading-relaxed font-normal">
            Open your infinite canvas in seconds. No complicated setup, no bloat.
          </p>
          <div>
            <Link to={ROUTES.BOARD_DETAIL('new')}>
              <GlassButton variant="primary" className="py-4 px-9 text-base font-bold shadow-2xl">
                Open Canvas →
              </GlassButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
