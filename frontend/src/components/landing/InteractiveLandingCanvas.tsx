import React, { useState, useRef } from 'react';

interface CanvasNode {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  shape: 'rectangle' | 'ellipse' | 'diamond' | 'text' | 'image' | 'sticky';
  color?: string;
}

export const InteractiveLandingCanvas: React.FC = () => {
  const [nodes, setNodes] = useState<CanvasNode[]>([
    { id: 'node-1', x: 140, y: 130, w: 220, h: 125, label: 'User Flow', shape: 'rectangle' },
    { id: 'node-2', x: 430, y: 130, w: 140, h: 125, label: 'Ideas', shape: 'ellipse' },
    { id: 'node-3', x: 700, y: 125, w: 130, h: 130, label: 'Decision', shape: 'diamond', color: 'text-blue-300' },
    { id: 'node-4', x: 150, y: 370, w: 160, h: 40, label: 'Rough thoughts', shape: 'text' },
    { id: 'node-5', x: 450, y: 340, w: 160, h: 105, label: '', shape: 'image' },
    { id: 'node-6', x: 700, y: 330, w: 145, h: 115, label: 'Ship it.', shape: 'sticky', color: 'text-[#fde047]' },
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('node-1');
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string>('select');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const isDraggingNodeRef = useRef<boolean>(false);
  const activeDragNodeIdRef = useRef<string | null>(null);
  const nodeOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleAddShape = (shape: CanvasNode['shape']) => {
    const newNodeId = `node-${Date.now()}`;
    const defaultLabels = {
      rectangle: 'New Rectangle',
      ellipse: 'New Ellipse',
      diamond: 'Decision',
      text: 'Text Note',
      image: '',
      sticky: 'Draft Idea',
    };
    const newNode: CanvasNode = {
      id: newNodeId,
      x: 380 + Math.random() * 60,
      y: 200 + Math.random() * 50,
      w: shape === 'text' ? 140 : shape === 'sticky' ? 140 : 180,
      h: shape === 'text' ? 40 : shape === 'sticky' ? 110 : 100,
      label: defaultLabels[shape],
      shape,
    };
    setNodes((prev) => [...prev, newNode]);
    setSelectedNodeId(newNodeId);
  };

  const handleDeleteSelected = () => {
    if (selectedNodeId) {
      setNodes((prev) => prev.filter((n) => n.id !== selectedNodeId));
      setSelectedNodeId(null);
    }
  };

  const handleReset = () => {
    setNodes([
      { id: 'node-1', x: 140, y: 130, w: 220, h: 125, label: 'User Flow', shape: 'rectangle' },
      { id: 'node-2', x: 430, y: 130, w: 140, h: 125, label: 'Ideas', shape: 'ellipse' },
      { id: 'node-3', x: 700, y: 125, w: 130, h: 130, label: 'Decision', shape: 'diamond', color: 'text-blue-300' },
      { id: 'node-4', x: 150, y: 370, w: 160, h: 40, label: 'Rough thoughts', shape: 'text' },
      { id: 'node-5', x: 450, y: 340, w: 160, h: 105, label: '', shape: 'image' },
      { id: 'node-6', x: 700, y: 330, w: 145, h: 115, label: 'Ship it.', shape: 'sticky', color: 'text-[#fde047]' },
    ]);
    setSelectedNodeId('node-1');
    setZoomLevel(100);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleNodeMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedNodeId(id);
    isDraggingNodeRef.current = true;
    activeDragNodeIdRef.current = id;
    const node = nodes.find((n) => n.id === id);
    if (node) {
      nodeOffsetRef.current = {
        x: e.clientX - node.x,
        y: e.clientY - node.y,
      };
    }
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (editingNodeId) setEditingNodeId(null);
    setSelectedNodeId(null);
    setIsPanning(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingNodeRef.current && activeDragNodeIdRef.current) {
      const newX = e.clientX - nodeOffsetRef.current.x;
      const newY = e.clientY - nodeOffsetRef.current.y;
      setNodes((prev) =>
        prev.map((node) =>
          node.id === activeDragNodeIdRef.current ? { ...node, x: newX, y: newY } : node
        )
      );
    } else if (isPanning) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    isDraggingNodeRef.current = false;
    activeDragNodeIdRef.current = null;
    setIsPanning(false);
  };

  return (
    <section id="product-canvas" className="w-[90vw] max-w-7xl mx-auto px-2 sm:px-4 mb-28 relative z-20">
      {/* 
        PREMIUM SMOKED OPTICAL GLASS FRAME 
        (Apple Vision Pro / Apple Glass machined acrylic aesthetic with diffuse Aurora bleed underneath)
      */}
      <div className="bg-[#0a0a0d]/75 backdrop-blur-[36px] backdrop-saturate-[180%] border-t border-t-white/[0.18] border-x border-x-white/[0.08] border-b border-b-white/[0.04] shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.2),0_40px_100px_rgba(0,0,0,0.95)] rounded-[28px] overflow-hidden relative min-h-[560px] sm:min-h-[640px] flex flex-col justify-between">
        
        {/* TOP FLOATING CHROME LAYER */}
        <div className="relative z-30 p-5 flex items-center justify-between pointer-events-none">
          {/* Top Left: Smoked Glass Menu Drawer Button */}
          <button className="pointer-events-auto bg-black/50 border border-white/10 hover:border-white/25 text-neutral-300 hover:text-white p-2.5 rounded-xl backdrop-blur-xl shadow-lg transition-colors flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Top Center: Floating Smoked Glass Capsule Toolbar */}
          <div className="pointer-events-auto optical-glass-pill px-3 py-1.5 flex items-center gap-1.5 border border-white/15 backdrop-blur-2xl shadow-2xl">
            <button
              onClick={() => setActiveTool('select')}
              className={`p-2 rounded-lg text-xs transition-all ${
                activeTool === 'select'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-inner'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
              title="Select Tool"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
              </svg>
            </button>
            <div className="h-4 w-[1px] bg-white/10 mx-0.5" />
            <button
              onClick={() => handleAddShape('rectangle')}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Rectangle"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
            </button>
            <button
              onClick={() => handleAddShape('ellipse')}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Ellipse"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
              </svg>
            </button>
            <button
              onClick={() => handleAddShape('diamond')}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Diamond"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 12l10 10 10-10L12 2z" />
              </svg>
            </button>
            <button
              onClick={() => handleAddShape('text')}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Text"
            >
              <span className="font-serif text-sm font-bold">T</span>
            </button>
            <button
              onClick={() => handleAddShape('sticky')}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Sticky Note"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => handleAddShape('image')}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Image Placeholder"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </button>
            {selectedNodeId && (
              <>
                <div className="h-4 w-[1px] bg-white/10 mx-0.5" />
                <button
                  onClick={handleDeleteSelected}
                  className="p-2 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/40 text-xs transition-colors"
                  title="Delete Selected"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Top Right: Smoked Glass Collaborators Indicator */}
          <div className="pointer-events-auto bg-black/50 border border-white/10 px-3.5 py-1.5 rounded-xl backdrop-blur-xl text-xs font-mono text-neutral-300 flex items-center gap-2 shadow-lg">
            <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>2</span>
          </div>
        </div>

        {/* LIVE INTERACTIVE CANVAS VIEWPORT */}
        <div
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="absolute inset-0 bg-transparent cursor-grab active:cursor-grabbing overflow-hidden select-none"
        >
          {/* Scalable & Pannable Objects Container */}
          <div
            className="absolute inset-0 pointer-events-auto"
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel / 100})`,
              transformOrigin: '0 0',
            }}
          >
            {/* SVG Hand-Drawn / Curved Vector Lines & Arrowheads Layer */}
            <svg className="absolute inset-0 w-[4000px] h-[4000px] pointer-events-none z-0 overflow-visible">
              <defs>
                <marker
                  id="arrow-sky"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                </marker>
                <marker
                  id="arrow-purple"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
                </marker>
              </defs>

              {/* 1. Curved Arrow from Ellipse ("Ideas") to Diamond ("Decision") */}
              <path
                d="M 570 190 C 610 210, 630 210, 695 190"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.75"
                markerEnd="url(#arrow-sky)"
              />

              {/* 2. Freehand Curved Arrow pointing towards Image Placeholder */}
              <path
                d="M 320 440 C 370 430, 390 400, 440 380"
                fill="none"
                stroke="#a855f7"
                strokeWidth="1.75"
                markerEnd="url(#arrow-purple)"
              />

              {/* 3. Underline stroke below "Rough thoughts" */}
              <path
                d="M 152 410 C 190 412, 230 409, 298 411"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Canvas Primitives */}
            {nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isEditing = editingNodeId === node.id;

              return (
                <div
                  key={node.id}
                  onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    setEditingNodeId(node.id);
                  }}
                  style={{
                    left: node.x,
                    top: node.y,
                    width: node.w,
                    height: node.h,
                  }}
                  className={`absolute cursor-move z-10 flex flex-col items-center justify-center transition-shadow duration-150 ${
                    node.shape === 'rectangle'
                      ? 'border border-white/40 bg-transparent rounded-lg p-4'
                      : node.shape === 'ellipse'
                      ? 'border border-white/40 bg-transparent rounded-full p-4'
                      : node.shape === 'diamond'
                      ? 'relative flex items-center justify-center p-4'
                      : node.shape === 'image'
                      ? 'border border-dashed border-purple-400/40 rounded-xl bg-purple-950/10 p-4'
                      : node.shape === 'sticky'
                      ? 'bg-[#eab308]/10 border border-[#fde047]/40 rounded-xl backdrop-blur-md p-4 shadow-xl'
                      : 'p-2'
                  } ${
                    isSelected && node.shape !== 'diamond'
                      ? 'ring-1 ring-emerald-400 border-emerald-400 shadow-emerald-950/50'
                      : ''
                  }`}
                >
                  {/* Diamond Vector Border */}
                  {node.shape === 'diamond' && (
                    <div
                      className={`absolute inset-0 border rotate-45 transition-colors ${
                        isSelected ? 'border-emerald-400 bg-emerald-950/10' : 'border-blue-400/50 bg-blue-950/10'
                      }`}
                    />
                  )}

                  {/* Node Label Content */}
                  <div className="relative z-10 text-center w-full flex items-center justify-center">
                    {node.shape === 'image' ? (
                      <div className="flex flex-col items-center justify-center text-purple-300/60 gap-1">
                        <svg className="w-7 h-7 stroke-[1.25]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      </div>
                    ) : isEditing ? (
                      <input
                        type="text"
                        value={node.label}
                        onChange={(e) => {
                          const val = e.target.value;
                          setNodes((prev) =>
                            prev.map((n) => (n.id === node.id ? { ...n, label: val } : n))
                          );
                        }}
                        onBlur={() => setEditingNodeId(null)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') setEditingNodeId(null);
                        }}
                        autoFocus
                        className="bg-black/80 border border-emerald-400 rounded px-2 py-1 text-xs text-white w-full text-center focus:outline-none"
                      />
                    ) : (
                      <span className={`text-sm font-sans tracking-tight ${node.color || 'text-white/90'}`}>
                        {node.label}
                      </span>
                    )}
                  </div>

                  {/* 
                    SELECTED RECTANGLE RESIZE HANDLES & LIVE CURSOR "You" 
                    (Exact match to Reference Screenshot Vector Editor handles)
                  */}
                  {isSelected && node.id === 'node-1' && (
                    <>
                      <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-emerald-400 border border-black rounded-sm pointer-events-none" />
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-emerald-400 border border-black rounded-sm pointer-events-none" />
                      <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-emerald-400 border border-black rounded-sm pointer-events-none" />
                      <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-2.5 h-2.5 bg-emerald-400 border border-black rounded-sm pointer-events-none" />
                      <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-2.5 h-2.5 bg-emerald-400 border border-black rounded-sm pointer-events-none" />
                      <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-emerald-400 border border-black rounded-sm pointer-events-none" />
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-emerald-400 border border-black rounded-sm pointer-events-none" />
                      <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-emerald-400 border border-black rounded-sm pointer-events-none" />

                      {/* Live Cursor "You" */}
                      <div className="absolute -bottom-7 -right-6 flex items-center gap-1 pointer-events-none z-30 animate-pulse">
                        <svg className="w-3.5 h-3.5 text-emerald-400 fill-current -rotate-45" viewBox="0 0 24 24">
                          <path d="M3 3l7 18 3-7 7-3L3 3z" />
                        </svg>
                        <span className="bg-emerald-500 text-black font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow-lg">
                          You
                        </span>
                      </div>
                    </>
                  )}

                  {/* LIVE COLLABORATOR CURSOR "Aarav" ON STICKY NOTE */}
                  {node.id === 'node-6' && (
                    <div className="absolute -bottom-6 -right-8 flex items-center gap-1 pointer-events-none z-30">
                      <svg className="w-3.5 h-3.5 text-[#eab308] fill-current -rotate-45" viewBox="0 0 24 24">
                        <path d="M3 3l7 18 3-7 7-3L3 3z" />
                      </svg>
                      <span className="bg-[#eab308] text-black font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow-lg">
                        Aarav
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM FLOATING CHROME LAYER */}
        <div className="relative z-30 p-5 flex items-center justify-between pointer-events-none">
          {/* Bottom Left: Smoked Glass Zoom & History Controls */}
          <div className="flex items-center gap-2">
            <div className="pointer-events-auto bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-mono text-neutral-300 flex items-center gap-2.5 backdrop-blur-xl shadow-lg">
              <button onClick={() => setZoomLevel((z) => Math.max(50, z - 10))} className="hover:text-white font-bold">-</button>
              <span className="w-10 text-center text-[11px] font-semibold">{zoomLevel}%</span>
              <button onClick={() => setZoomLevel((z) => Math.min(150, z + 10))} className="hover:text-white font-bold">+</button>
            </div>
            <div className="pointer-events-auto bg-black/50 border border-white/10 rounded-xl p-1.5 flex items-center gap-1 backdrop-blur-xl shadow-lg text-neutral-400">
              <button onClick={handleReset} className="p-1 hover:text-white transition-colors" title="Reset / Undo">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </button>
              <button className="p-1 hover:text-white transition-colors" title="Redo">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Bottom Right: Smoked Glass Help & Settings Controls */}
          <div className="flex items-center gap-2">
            <button className="pointer-events-auto bg-black/50 border border-white/10 hover:border-white/25 text-neutral-400 hover:text-white w-8 h-8 rounded-xl backdrop-blur-xl shadow-lg flex items-center justify-center text-xs font-mono transition-colors">
              ?
            </button>
            <button className="pointer-events-auto bg-black/50 border border-white/10 hover:border-white/25 text-neutral-400 hover:text-white w-8 h-8 rounded-xl backdrop-blur-xl shadow-lg flex items-center justify-center transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default InteractiveLandingCanvas;
