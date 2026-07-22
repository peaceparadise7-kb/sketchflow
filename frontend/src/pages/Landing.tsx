import React from 'react';
import { Hero, MockBoard, Features, CTASection, Footer } from '@/components/landing';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Note: Navbar is rendered via MainLayout header */}
      <main className="flex-1">
        <Hero />
        <MockBoard />
        <Features />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
