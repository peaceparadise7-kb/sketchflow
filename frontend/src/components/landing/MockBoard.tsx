import React from 'react';

// Subcomponents for the mock whiteboard elements
const ToolbarButton: React.FC<{ active?: boolean; children: React.ReactNode }> = ({ active, children }) => (
  <div
    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
      active ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
    }`}
  >
    {children}
  </div>
);

const ArchitectureCard: React.FC<{
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
}> = ({ title, badge, badgeColor, description }) => (
  <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 shadow-xl backdrop-blur-sm hover:border-slate-600 transition-colors w-64">
    <div className="flex items-center justify-between mb-2">
      <span className="font-semibold text-slate-100 text-sm">{title}</span>
      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${badgeColor}`}>
        {badge}
      </span>
    </div>
    <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const StickyNote: React.FC<{ text: string; colorClass: string }> = ({ text, colorClass }) => (
  <div className={`p-4 rounded-lg shadow-lg text-xs font-medium max-w-[200px] border transform -rotate-1 hover:rotate-0 transition-transform ${colorClass}`}>
    <div className="flex items-center gap-1.5 mb-1.5 opacity-80">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
      <span className="text-[10px] uppercase font-bold tracking-wider">Note</span>
    </div>
    <p className="leading-snug">{text}</p>
  </div>
);

export const MockBoard: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      {/* Application Window Frame */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Window Header / Toolbar */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-4 text-xs font-mono text-slate-400 hidden sm:inline-block">
              system-architecture-v1.sketch
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
              Zoom 100%
            </span>
            <div className="h-4 w-[1px] bg-slate-800" />
            <span className="text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-md flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live Sync
            </span>
          </div>
        </div>

        {/* Board Main Area */}
        <div className="relative min-h-[480px] bg-slate-950 p-6 sm:p-10 overflow-hidden">
          {/* Subtle Grid Background Pattern */}
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Left Canvas Tool Palette */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/90 border border-slate-800 rounded-xl p-1.5 hidden md:flex flex-col gap-1 shadow-xl z-20">
            <ToolbarButton active>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
              </svg>
            </ToolbarButton>
            <ToolbarButton>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </ToolbarButton>
            <ToolbarButton>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </ToolbarButton>
            <ToolbarButton>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </ToolbarButton>
          </div>

          {/* Diagram Component Layout */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
            {/* Card 1: API Gateway */}
            <div className="relative group">
              <ArchitectureCard
                title="API Gateway"
                badge="Ingress"
                badgeColor="bg-indigo-950 text-indigo-300 border-indigo-700"
                description="Central routing, rate limiting, and request payload validation."
              />
              {/* Connector Arrow */}
              <div className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-6 border-t-2 border-dashed border-indigo-500/60" />
            </div>

            {/* Card 2: Microservices */}
            <div className="relative space-y-6">
              <ArchitectureCard
                title="Auth & Session Service"
                badge="Security"
                badgeColor="bg-emerald-950 text-emerald-300 border-emerald-700"
                description="Stateless JWT verification and token rotation pipeline."
              />
              <ArchitectureCard
                title="Canvas Engine"
                badge="Core"
                badgeColor="bg-sky-950 text-sky-300 border-sky-700"
                description="Real-time WebSocket delta synchronization engine."
              />
            </div>

            {/* Card 3: Storage & Note */}
            <div className="relative space-y-6">
              <ArchitectureCard
                title="PostgreSQL Cluster"
                badge="Storage"
                badgeColor="bg-purple-950 text-purple-300 border-purple-700"
                description="Primary / Replica multi-region persistence storage."
              />

              <StickyNote
                text="⚡ Use Redis pub/sub channel for sub-10ms cursor updates across active sessions."
                colorClass="bg-amber-950/80 text-amber-200 border-amber-800/80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
