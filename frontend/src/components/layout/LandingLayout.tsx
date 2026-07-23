import React from 'react';
import { GlobalBackground } from '../ui';
import { Navbar as LandingNavbar } from '../landing/Navbar';

interface LandingLayoutProps {
  children: React.ReactNode;
}

export const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <GlobalBackground />
      <LandingNavbar />
      <main className="relative z-10">{children}</main>
    </div>
  );
};

export default LandingLayout;
