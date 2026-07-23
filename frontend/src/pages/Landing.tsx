import React from 'react';
import { GlobalBackground } from '@/components/ui';
import { Hero, InteractiveLandingCanvas, Features, CTASection, Footer } from '@/components/landing';

export const Landing: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
      {/* 4-Layer Background Stack: Aurora Background -> Engineering Grid -> Content -> Floating UI */}
      <GlobalBackground />

      <main className="relative z-10 flex-1">
        <Hero />
        <InteractiveLandingCanvas />
        <Features />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
