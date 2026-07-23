import React, { useState, useRef } from 'react';

interface CanvasNode {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  shape: 'rectangle' | 'ellipse' | 'diamond' | 'text';
}

interface CanvasConnection {
  id: string;
  fromId: string;
  toId: string;
  label?: string;
  type?: 'arrow' | 'line';
}

export const InteractiveLandingCanvas: React.FC = () => {
  const [nodes, setNodes] = useState<CanvasNode[]>([
    { id: 'node-1', x: 120, y: 190, w: 180, h: 70, label: 'Brainstorm Idea', shape: 'rectangle' },
    { id: 'node-2', x: 440, y: 190, w: 180, h: 70, label: 'Visual Workflow', shape: 'diamond' },
    { id: 'node-3', x: 760, y: 190, w: 180, h: 70, label: 'Final Output', shape: 'ellipse' },
  ]);

  const [connections, setConnections] = useState<CanvasConnection[]>([
    { id: 'conn-1', fromId: 'node-1', toId: 'node-2', label: 'Flow', type: 'arrow' },
    { id: 'conn-2', fromId: 'node-2', toId: 'node-3', label: 'Sync', type: 'arrow' },
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('node-1');
  const [selectedConnId, setSelectedConnId] = useState<string | null>(null);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const isDraggingNodeRef = useRef<boolean>(false);
  const activeDragNodeIdRef = useRef<string | null>(null);
  const nodeOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleAddShape = (shape: 'rectangle' | 'ellipse' | 'diamond' | 'text') => {
    const newNodeId = `node-${Date.now()}`;
    const defaultLabels = {
      rectangle: 'Rectangle',
      ellipse: 'Ellipse',
      diamond: 'Diamond',
      text: 'Text Note',
    };
    const newNode: CanvasNode = {
      id: newNodeId,
      x: 360 + Math.random() * 60,
      y: 190 + Math.random() * 50,
      w: shape === 'text' ? 140 : 180,
      h: shape === 'text' ? 40 : 70,
      label: defaultLabels[shape],
      shape,
    };
    setNodes((prev) => [...prev, newNode]);
    setSelectedNodeId(newNodeId);
    setSelectedConnId(null);
  };

  const handleDeleteSelected = () => {
    if (selectedNodeId) {
      setNodes((prev) => prev.filter((n) => n.id !== selectedNodeId));
      setConnections((prev) => prev.filter((c) => c.fromId !== selectedNodeId && c.toId !== selectedNodeId));
      setSelectedNodeId(null);
    }
    if (selectedConnId) {
      setConnections((prev) => prev.filter((c) => c.id !== selectedConnId));
      setSelectedConnId(null);
    }
  };

  const handleReset = () => {
    setNodes([
      { id: 'node-1', x: 120, y: 190, w: 180, h: 70, label: 'Brainstorm Idea', shape: 'rectangle' },
      { id: 'node-2', x: 440, y: 190, w: 180, h: 70, label: 'Visual Workflow', shape: 'diamond' },
      { id: 'node-3', x: 760, y: 190, w: 180, h: 70, label: 'Final Output', shape: 'ellipse' },
    ]);
    setConnections([
      { id: 'conn-1', fromId: 'node-1', toId: 'node-2', label: 'Flow', type: 'arrow' },
      { id: 'conn-2', fromId: 'node-2', toId: 'node-3', label: 'Sync', type: 'arrow' },
    ]);
    setSelectedNodeId('node-1');
    setSelectedConnId(null);
    setZoomLevel(100);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleNodeMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedNodeId(id);
    setSelectedConnId(null);
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

  const handleConnMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedNodeId(null);
    setSelectedConnId(id);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (editingNodeId) setEditingNodeId(null);
    setSelectedNodeId(null);
    setSelectedConnId(null);
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
    <section id="product-canvas" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative">
      {/* Seamless Interactive Canvas Window */}
      <div className="optical-glass-card p-0 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden relative">
        
        {/* Floating Minimal Palette Toolbar */}
        <div className="absolute top-4 left-6 z-30 flex items-center gap-1.5 bg-black/60 backdrop-blur-xl border border-white/10 p-1.5 rounded-xl">
          <button
            onClick={() => handleAddShape('rectangle')}
            className="p-2 rounded-lg hover:bg-white/10 text-emerald-400 text-xs transition-colors"
            title="Add Rectangle"
          >
            🟩
          </button>
          <button
            onClick={() => handleAddShape('ellipse')}
            className="p-2 rounded-lg hover:bg-white/10 text-emerald-400 text-xs transition-colors"
            title="Add Ellipse"
          >
            ⭕
          </button>
          <button
            onClick={() => handleAddShape('diamond')}
            className="p-2 rounded-lg hover:bg-white/10 text-emerald-400 text-xs transition-colors"
            title="Add Diamond"
          >
            🔷
          </button>
          <button
            onClick={() => handleAddShape('text')}
            className="p-2 rounded-lg hover:bg-white/10 text-emerald-400 text-xs transition-colors"
            title="Add Text"
          >
            📝
          </button>
          {(selectedNodeId || selectedConnId) && (
            <button
              onClick={handleDeleteSelected}
              className="p-2 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/40 text-xs transition-colors"
              title="Delete Selected"
            >
              🗑️
            </button>
          )}
        </div>

        {/* Floating Canvas Controls */}
        <div className="absolute top-4 right-6 z-30 flex items-center gap-2 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
              className="w-6 h-6 rounded hover:bg-white/10 text-white flex items-center justify-center font-bold"
            >
              -
            </button>
            <span className="w-10 text-center text-[11px]">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
              className="w-6 h-6 rounded hover:bg-white/10 text-white flex items-center justify-center font-bold"
            >
              +
            </button>
          </div>
          <button
            onClick={handleReset}
            className="px-2.5 py-1.5 rounded-xl bg-black/50 backdrop-blur-xl hover:bg-black/80 border border-white/10 text-neutral-300 hover:text-white transition-colors"
            title="Reset Canvas"
          >
            🔄
          </button>
        </div>

        {/* Live Interactive Infinite Canvas Viewport */}
        <div
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="relative h-[480px] sm:h-[540px] bg-[#08080a] cursor-grab active:cursor-grabbing overflow-hidden select-none"
        >
          {/* Engineering Grid Pattern Background */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel / 100})`,
              transformOrigin: '0 0',
            }}
          />

          {/* Canvas Objects Layer */}
          <div
            className="absolute inset-0 pointer-events-auto transition-transform duration-75"
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel / 100})`,
              transformOrigin: '0 0',
            }}
          >
            {/* SVG Connector Lines Layer */}
            <svg className="absolute inset-0 w-[3000px] h-[3000px] pointer-events-none z-0 overflow-visible">
              <defs>
                <marker
                  id="arrow-emerald-landing"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d399" />
                </marker>
              </defs>

              {connections.map((conn) => {
                const fromNode = nodes.find((n) => n.id === conn.fromId);
                const toNode = nodes.find((n) => n.id === conn.toId);
                if (!fromNode || !toNode) return null;

                const isSelected = selectedConnId === conn.id;
                const startX = fromNode.x + fromNode.w; // Right edge
                const startY = fromNode.y + fromNode.h / 2;
                const endX = toNode.x; // Left edge
                const endY = toNode.y + toNode.h / 2;

                const controlX = startX + (endX - startX) / 2;
                const pathData = `M ${startX} ${startY} C ${controlX} ${startY}, ${controlX} ${endY}, ${endX} ${endY}`;
                const midX = (startX + endX) / 2;
                const midY = (startY + endY) / 2;

                return (
                  <g key={conn.id} className="group cursor-pointer pointer-events-auto" onClick={(e) => handleConnMouseDown(e, conn.id)}>
                    {/* Forgiving Click Hitbox */}
                    <path d={pathData} fill="none" stroke="transparent" strokeWidth="16" />
                    {/* Glow Underlay */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={isSelected ? '#34d399' : 'rgba(52, 211, 153, 0.15)'}
                      strokeWidth={isSelected ? '7' : '5'}
                    />
                    {/* Primary Connector Line */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={isSelected ? '#6ee7b7' : '#34d399'}
                      strokeWidth="2.5"
                      strokeDasharray={conn.type === 'line' ? undefined : '6,6'}
                      markerEnd={conn.type === 'line' ? undefined : 'url(#arrow-emerald-landing)'}
                    />
                    {/* Label Pill */}
                    {conn.label && (
                      <foreignObject x={midX - 30} y={midY - 12} width="60" height="24">
                        <div className={`flex items-center justify-center border rounded-full px-2 py-0.5 text-[9px] font-mono shadow-md ${
                          isSelected ? 'bg-emerald-950 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/30' : 'bg-black/90 border-emerald-500/40 text-emerald-300'
                        }`}>
                          {conn.label}
                        </div>
                      </foreignObject>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Minimalist Geometric Shape Cards */}
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
                    borderRadius: node.shape === 'ellipse' ? '9999px' : node.shape === 'text' ? '8px' : '16px',
                  }}
                  className={`absolute p-4 bg-black/85 backdrop-blur-2xl border transition-all duration-150 shadow-2xl cursor-move z-10 flex flex-col justify-center ${
                    isSelected
                      ? 'border-emerald-400 ring-2 ring-emerald-400/40 shadow-emerald-950/60'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center justify-center text-center">
                    {isEditing ? (
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
                        className="bg-black/80 border border-emerald-400 rounded px-2 py-1 text-xs text-white w-full focus:outline-none"
                      />
                    ) : (
                      <span className="text-xs font-bold text-white tracking-tight leading-snug">
                        {node.label}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default InteractiveLandingCanvas;
