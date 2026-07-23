import React from 'react';

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
              untitled-sketch.sketch
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
              100%
            </span>
            <div className="h-4 w-[1px] bg-slate-800" />
            <span className="text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-md flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Live Canvas
            </span>
          </div>
        </div>

        {/* Minimalist Excalidraw-Style Demo Whiteboard Canvas */}
        <div className="relative min-h-[440px] sm:min-h-[500px] bg-slate-950 p-6 sm:p-12 overflow-hidden select-none">
          {/* Subtle Canvas Dot Grid Pattern */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Left Canvas Minimal Tool Palette */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/90 border border-slate-800 rounded-xl p-1.5 hidden sm:flex flex-col gap-1.5 shadow-xl z-20">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 flex items-center justify-center text-xs font-bold" title="Select Tool">
              🖐️
            </div>
            <div className="w-8 h-8 rounded-lg bg-slate-800/60 text-slate-400 flex items-center justify-center text-xs" title="Rectangle">
              🟩
            </div>
            <div className="w-8 h-8 rounded-lg bg-slate-800/60 text-slate-400 flex items-center justify-center text-xs" title="Ellipse">
              ⭕
            </div>
            <div className="w-8 h-8 rounded-lg bg-slate-800/60 text-slate-400 flex items-center justify-center text-xs" title="Diamond">
              🔷
            </div>
            <div className="w-8 h-8 rounded-lg bg-slate-800/60 text-slate-400 flex items-center justify-center text-xs" title="Text">
              📝
            </div>
          </div>

          {/* Clean Canvas Objects Composition (Large Whitespace, Handful of Intentional Primitives) */}
          <div className="relative z-10 max-w-4xl mx-auto h-full flex flex-col justify-center py-6">
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
              <defs>
                <marker
                  id="arrow-head-excalidraw"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                </marker>
              </defs>

              {/* Orthogonal Connector Lines */}
              <path
                d="M 230 140 C 310 140, 310 140, 390 140"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="5,5"
                markerEnd="url(#arrow-head-excalidraw)"
              />
              <path
                d="M 570 140 C 650 140, 650 140, 730 140"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="5,5"
                markerEnd="url(#arrow-head-excalidraw)"
              />
            </svg>

            {/* Primitive Canvas Shapes */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 items-center justify-items-center">
              {/* Primitive 1: Rectangle (Start Idea) */}
              <div className="w-56 h-28 rounded-2xl bg-slate-900/90 border border-slate-700/80 p-4 shadow-xl flex flex-col items-center justify-center text-center group hover:border-sky-400 transition-colors">
                <span className="text-xs font-bold text-slate-100 tracking-tight">
                  Initial Concept
                </span>
                <span className="text-[10px] text-slate-400 mt-1">Rectangle Primitive</span>
              </div>

              {/* Primitive 2: Diamond (Decision) */}
              <div className="w-56 h-28 rounded-2xl bg-slate-900/90 border border-sky-500/50 p-4 shadow-xl flex flex-col items-center justify-center text-center ring-2 ring-sky-500/20">
                <span className="text-xs font-bold text-sky-300 tracking-tight">
                  Core Logic Flow
                </span>
                <span className="text-[10px] text-slate-400 mt-1">Diamond Primitive</span>
              </div>

              {/* Primitive 3: Ellipse (Final Output) */}
              <div className="w-56 h-28 rounded-full bg-slate-900/90 border border-slate-700/80 p-4 shadow-xl flex flex-col items-center justify-center text-center hover:border-sky-400 transition-colors">
                <span className="text-xs font-bold text-slate-100 tracking-tight">
                  Final Output
                </span>
                <span className="text-[10px] text-slate-400 mt-1">Ellipse Primitive</span>
              </div>
            </div>

            {/* Natural Text Annotation */}
            <div className="mt-12 text-center">
              <span className="text-xs font-mono text-slate-400 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg inline-block">
                📝 "Simple geometric primitives with connected arrows"
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MockBoard;
