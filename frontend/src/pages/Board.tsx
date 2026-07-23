import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GlobalBackground, GlassBadge, GlassButton } from '@/components/ui';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';

interface AnchorPoint {
  x: number;
  y: number;
  side: 'top' | 'right' | 'bottom' | 'left';
}

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
  fromSide?: 'top' | 'right' | 'bottom' | 'left';
  toSide?: 'top' | 'right' | 'bottom' | 'left';
  label?: string;
  type?: 'arrow' | 'line';
}

interface HistoryState {
  nodes: CanvasNode[];
  connections: CanvasConnection[];
}

interface SnapLine {
  type: 'x' | 'y';
  pos: number;
}

export const Board: React.FC = () => {
  // ---------------------------------------------------------------------------
  // STATE MANAGEMENT
  // ---------------------------------------------------------------------------
  const [nodes, setNodes] = useState<CanvasNode[]>([
    { id: 'node-1', x: 140, y: 200, w: 200, h: 80, label: 'Input Block', shape: 'rectangle' },
    { id: 'node-2', x: 460, y: 120, w: 200, h: 80, label: 'Processing Core', shape: 'rectangle' },
    { id: 'node-3', x: 460, y: 280, w: 200, h: 80, label: 'Decision Logic', shape: 'diamond' },
    { id: 'node-4', x: 780, y: 200, w: 200, h: 80, label: 'Output Store', shape: 'ellipse' },
  ]);

  const [connections, setConnections] = useState<CanvasConnection[]>([
    { id: 'conn-1', fromId: 'node-1', toId: 'node-2', label: 'Flow 1', type: 'arrow' },
    { id: 'conn-2', fromId: 'node-1', toId: 'node-3', label: 'Flow 2', type: 'arrow' },
    { id: 'conn-3', fromId: 'node-2', toId: 'node-4', label: 'Sync', type: 'line' },
    { id: 'conn-4', fromId: 'node-3', toId: 'node-4', label: 'Data', type: 'arrow' },
  ]);

  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>(['node-1']);
  const [selectedConnIds, setSelectedConnIds] = useState<string[]>([]);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<'select' | 'rectangle' | 'ellipse' | 'diamond' | 'text' | 'arrow' | 'line'>('select');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [snapLines, setSnapLines] = useState<SnapLine[]>([]);

  // History Stack for Deterministic Undo/Redo
  const [historyStack, setHistoryStack] = useState<HistoryState[]>([]);
  const [redoStack, setRedoStack] = useState<HistoryState[]>([]);

  // Marquee Selection Box State
  const [marqueeBox, setMarqueeBox] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);

  // Interaction Refs
  const isPanningRef = useRef(false);
  const isMarqueeRef = useRef(false);
  const marqueeStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingNodeRef = useRef(false);
  const dragNodeStartPosRef = useRef<Record<string, { x: number; y: number }>>({});
  const mouseDragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Resizing Ref
  const isResizingRef = useRef(false);
  const resizingNodeIdRef = useRef<string | null>(null);
  const resizeHandleRef = useRef<'se' | 'sw' | 'ne' | 'nw' | null>(null);
  const resizeInitialRef = useRef<{ x: number; y: number; w: number; h: number }>({ x: 0, y: 0, w: 0, h: 0 });

  // Connecting Ref
  const isConnectingRef = useRef(false);
  const connectingSourceRef = useRef<{ nodeId: string; side: 'top' | 'right' | 'bottom' | 'left' } | null>(null);
  const [tempConnectionEnd, setTempConnectionEnd] = useState<{ x: number; y: number } | null>(null);

  // Push current state to undo history
  const pushHistory = useCallback(() => {
    setHistoryStack((prev) => [...prev, { nodes: [...nodes], connections: [...connections] }]);
    setRedoStack([]);
  }, [nodes, connections]);

  // ---------------------------------------------------------------------------
  // KEYBOARD SHORTCUTS & HISTORY HANDLERS
  // ---------------------------------------------------------------------------
  const handleUndo = useCallback(() => {
    if (historyStack.length === 0) return;
    const last = historyStack[historyStack.length - 1];
    setRedoStack((prev) => [...prev, { nodes: [...nodes], connections: [...connections] }]);
    setNodes(last.nodes);
    setConnections(last.connections);
    setHistoryStack((prev) => prev.slice(0, prev.length - 1));
  }, [historyStack, nodes, connections]);

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setHistoryStack((prev) => [...prev, { nodes: [...nodes], connections: [...connections] }]);
    setNodes(next.nodes);
    setConnections(next.connections);
    setRedoStack((prev) => prev.slice(0, prev.length - 1));
  }, [redoStack, nodes, connections]);

  const handleDuplicate = useCallback(() => {
    if (selectedNodeIds.length === 0) return;
    pushHistory();

    const idMap: Record<string, string> = {};
    const newNodes: CanvasNode[] = [];

    nodes.forEach((node) => {
      if (selectedNodeIds.includes(node.id)) {
        const newId = `node-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
        idMap[node.id] = newId;
        newNodes.push({
          ...node,
          id: newId,
          x: node.x + 30,
          y: node.y + 30,
        });
      }
    });

    const newConnections: CanvasConnection[] = [];
    connections.forEach((conn) => {
      if (idMap[conn.fromId] && idMap[conn.toId]) {
        newConnections.push({
          ...conn,
          id: `conn-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          fromId: idMap[conn.fromId],
          toId: idMap[conn.toId],
        });
      }
    });

    setNodes((prev) => [...prev, ...newNodes]);
    setConnections((prev) => [...prev, ...newConnections]);
    setSelectedNodeIds(Object.values(idMap));
  }, [selectedNodeIds, nodes, connections, pushHistory]);

  const handleDeleteSelected = useCallback(() => {
    if (selectedNodeIds.length === 0 && selectedConnIds.length === 0) return;
    pushHistory();

    if (selectedNodeIds.length > 0) {
      setNodes((prev) => prev.filter((n) => !selectedNodeIds.includes(n.id)));
      setConnections((prev) =>
        prev.filter((c) => !selectedNodeIds.includes(c.fromId) && !selectedNodeIds.includes(c.toId))
      );
      setSelectedNodeIds([]);
    }

    if (selectedConnIds.length > 0) {
      setConnections((prev) => prev.filter((c) => !selectedConnIds.includes(c.id)));
      setSelectedConnIds([]);
    }
  }, [selectedNodeIds, selectedConnIds, pushHistory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (editingNodeId) return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) handleRedo();
        else handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        handleRedo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        handleDuplicate();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        handleDeleteSelected();
      } else if (e.key === 'Escape') {
        setSelectedNodeIds([]);
        setSelectedConnIds([]);
        setActiveTool('select');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editingNodeId, handleUndo, handleRedo, handleDuplicate, handleDeleteSelected]);

  // ---------------------------------------------------------------------------
  // MATH & ANCHOR HELPER FUNCTIONS
  // ---------------------------------------------------------------------------
  const getAnchors = (node: CanvasNode): Record<'top' | 'right' | 'bottom' | 'left', AnchorPoint> => {
    return {
      top: { x: node.x + node.w / 2, y: node.y, side: 'top' },
      right: { x: node.x + node.w, y: node.y + node.h / 2, side: 'right' },
      bottom: { x: node.x + node.w / 2, y: node.y + node.h, side: 'bottom' },
      left: { x: node.x, y: node.y + node.h / 2, side: 'left' },
    };
  };

  const getBestAnchorPair = (
    fromNode: CanvasNode,
    toNode: CanvasNode
  ): { fromAnchor: AnchorPoint; toAnchor: AnchorPoint } => {
    const fromAnchors = Object.values(getAnchors(fromNode));
    const toAnchors = Object.values(getAnchors(toNode));

    let minDist = Infinity;
    let bestPair = { fromAnchor: fromAnchors[1], toAnchor: toAnchors[3] }; // Default right -> left

    for (const a of fromAnchors) {
      for (const b of toAnchors) {
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < minDist) {
          minDist = dist;
          bestPair = { fromAnchor: a, toAnchor: b };
        }
      }
    }

    return bestPair;
  };

  // ---------------------------------------------------------------------------
  // CANVAS TOOL HANDLERS
  // ---------------------------------------------------------------------------
  const handleAddShape = (shape: 'rectangle' | 'ellipse' | 'diamond' | 'text') => {
    pushHistory();
    const newNodeId = `node-${Date.now()}`;
    const defaultLabels = {
      rectangle: 'Rectangle',
      ellipse: 'Ellipse',
      diamond: 'Diamond',
      text: 'Text Label',
    };
    const newNode: CanvasNode = {
      id: newNodeId,
      x: 320 + Math.random() * 80,
      y: 200 + Math.random() * 60,
      w: shape === 'text' ? 160 : 200,
      h: shape === 'text' ? 45 : 80,
      label: defaultLabels[shape],
      shape,
    };

    setNodes((prev) => [...prev, newNode]);
    setSelectedNodeIds([newNodeId]);
    setSelectedConnIds([]);
    setActiveTool('select');
  };

  // ---------------------------------------------------------------------------
  // INTERACTIVE MOUSE / POINTER EVENT HANDLERS
  // ---------------------------------------------------------------------------
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (editingNodeId) setEditingNodeId(null);
    const scale = zoomLevel / 100;
    const canvasBounds = e.currentTarget.getBoundingClientRect();
    const canvasX = (e.clientX - canvasBounds.left - panOffset.x) / scale;
    const canvasY = (e.clientY - canvasBounds.top - panOffset.y) / scale;

    if (activeTool !== 'select') {
      handleAddShape(activeTool as 'rectangle' | 'ellipse' | 'diamond' | 'text');
      return;
    }

    if (!e.shiftKey) {
      setSelectedNodeIds([]);
      setSelectedConnIds([]);
    }

    // Start Marquee Drag Selection
    isMarqueeRef.current = true;
    marqueeStartRef.current = { x: canvasX, y: canvasY };
    setMarqueeBox({ x1: canvasX, y1: canvasY, x2: canvasX, y2: canvasY });

    isPanningRef.current = true;
    panStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleNodeMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedConnIds([]);

    if (e.shiftKey) {
      setSelectedNodeIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      if (!selectedNodeIds.includes(id)) {
        setSelectedNodeIds([id]);
      }
    }

    isDraggingNodeRef.current = true;
    mouseDragStartRef.current = { x: e.clientX, y: e.clientY };

    const initialPositions: Record<string, { x: number; y: number }> = {};
    nodes.forEach((n) => {
      if (selectedNodeIds.includes(n.id) || n.id === id) {
        initialPositions[n.id] = { x: n.x, y: n.y };
      }
    });
    dragNodeStartPosRef.current = initialPositions;
  };

  const handleConnMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedNodeIds([]);
    setSelectedConnIds([id]);
  };

  const handleResizeMouseDown = (
    e: React.MouseEvent,
    nodeId: string,
    handle: 'se' | 'sw' | 'ne' | 'nw'
  ) => {
    e.stopPropagation();
    pushHistory();
    const targetNode = nodes.find((n) => n.id === nodeId);
    if (!targetNode) return;

    isResizingRef.current = true;
    resizingNodeIdRef.current = nodeId;
    resizeHandleRef.current = handle;
    resizeInitialRef.current = {
      x: targetNode.x,
      y: targetNode.y,
      w: targetNode.w,
      h: targetNode.h,
    };
    mouseDragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleAnchorMouseDown = (
    e: React.MouseEvent,
    nodeId: string,
    side: 'top' | 'right' | 'bottom' | 'left'
  ) => {
    e.stopPropagation();
    pushHistory();
    isConnectingRef.current = true;
    connectingSourceRef.current = { nodeId, side };

    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      const anchor = getAnchors(node)[side];
      setTempConnectionEnd({ x: anchor.x, y: anchor.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const scale = zoomLevel / 100;

    // 1. Marquee Selection Box Update
    if (isMarqueeRef.current && marqueeStartRef.current) {
      const canvasBounds = e.currentTarget.getBoundingClientRect();
      const canvasX = (e.clientX - canvasBounds.left - panOffset.x) / scale;
      const canvasY = (e.clientY - canvasBounds.top - panOffset.y) / scale;
      setMarqueeBox({
        x1: marqueeStartRef.current.x,
        y1: marqueeStartRef.current.y,
        x2: canvasX,
        y2: canvasY,
      });
    }

    // 2. Resizing Active Node
    if (isResizingRef.current && resizingNodeIdRef.current && resizeHandleRef.current) {
      const dx = (e.clientX - mouseDragStartRef.current.x) / scale;
      const dy = (e.clientY - mouseDragStartRef.current.y) / scale;
      const initial = resizeInitialRef.current;
      const handle = resizeHandleRef.current;

      setNodes((prev) =>
        prev.map((node) => {
          if (node.id !== resizingNodeIdRef.current) return node;

          let newX = initial.x;
          let newY = initial.y;
          let newW = initial.w;
          let newH = initial.h;

          // Shift preserves aspect ratio (1:1)
          if (e.shiftKey) {
            const maxDelta = Math.max(Math.abs(dx), Math.abs(dy));
            if (handle === 'se') {
              newW = Math.max(120, initial.w + maxDelta);
              newH = Math.max(60, initial.h + maxDelta);
            }
          } else {
            if (handle === 'se') {
              newW = Math.max(120, initial.w + dx);
              newH = Math.max(60, initial.h + dy);
            } else if (handle === 'sw') {
              newW = Math.max(120, initial.w - dx);
              newX = initial.x + (initial.w - newW);
              newH = Math.max(60, initial.h + dy);
            } else if (handle === 'ne') {
              newW = Math.max(120, initial.w + dx);
              newH = Math.max(60, initial.h - dy);
              newY = initial.y + (initial.h - newH);
            } else if (handle === 'nw') {
              newW = Math.max(120, initial.w - dx);
              newX = initial.x + (initial.w - newW);
              newH = Math.max(60, initial.h - dy);
              newY = initial.y + (initial.h - newH);
            }
          }

          return { ...node, x: newX, y: newY, w: newW, h: newH };
        })
      );
      return;
    }

    // 3. Dragging Nodes (with Alignment Snapping Guidelines)
    if (isDraggingNodeRef.current) {
      const dx = (e.clientX - mouseDragStartRef.current.x) / scale;
      const dy = (e.clientY - mouseDragStartRef.current.y) / scale;

      const activeIds = Object.keys(dragNodeStartPosRef.current);
      const newSnapLines: SnapLine[] = [];

      setNodes((prev) => {
        return prev.map((node) => {
          if (!activeIds.includes(node.id)) return node;

          const startPos = dragNodeStartPosRef.current[node.id];
          let targetX = startPos.x + dx;
          let targetY = startPos.y + dy;

          // Alignment Snapping against other static nodes
          prev.forEach((other) => {
            if (activeIds.includes(other.id)) return;

            // X-Center Alignment
            const nodeCenterX = targetX + node.w / 2;
            const otherCenterX = other.x + other.w / 2;
            if (Math.abs(nodeCenterX - otherCenterX) < 6) {
              targetX = otherCenterX - node.w / 2;
              newSnapLines.push({ type: 'x', pos: otherCenterX });
            }

            // Y-Center Alignment
            const nodeCenterY = targetY + node.h / 2;
            const otherCenterY = other.y + other.h / 2;
            if (Math.abs(nodeCenterY - otherCenterY) < 6) {
              targetY = otherCenterY - node.h / 2;
              newSnapLines.push({ type: 'y', pos: otherCenterY });
            }
          });

          return { ...node, x: targetX, y: targetY };
        });
      });

      setSnapLines(newSnapLines);
      return;
    }

    // 4. Drawing Live Interactive Connector Line
    if (isConnectingRef.current) {
      const canvasBounds = e.currentTarget.getBoundingClientRect();
      const canvasX = (e.clientX - canvasBounds.left - panOffset.x) / scale;
      const canvasY = (e.clientY - canvasBounds.top - panOffset.y) / scale;
      setTempConnectionEnd({ x: canvasX, y: canvasY });
      return;
    }

    // 5. Panning Workspace
    if (isPanningRef.current && !isMarqueeRef.current) {
      setPanOffset({
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y,
      });
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    // 1. Finish Marquee Selection Intersection Calculation
    if (isMarqueeRef.current && marqueeBox) {
      const minX = Math.min(marqueeBox.x1, marqueeBox.x2);
      const maxX = Math.max(marqueeBox.x1, marqueeBox.x2);
      const minY = Math.min(marqueeBox.y1, marqueeBox.y2);
      const maxY = Math.max(marqueeBox.y1, marqueeBox.y2);

      const selected = nodes
        .filter((n) => n.x < maxX && n.x + n.w > minX && n.y < maxY && n.y + n.h > minY)
        .map((n) => n.id);

      if (selected.length > 0) {
        setSelectedNodeIds(selected);
      }
      setMarqueeBox(null);
      isMarqueeRef.current = false;
    }

    // 2. Finish Connecting Connector to Target Node
    if (isConnectingRef.current && connectingSourceRef.current && hoveredNodeId) {
      const source = connectingSourceRef.current;
      if (source.nodeId !== hoveredNodeId) {
        setConnections((prev) => [
          ...prev,
          {
            id: `conn-${Date.now()}`,
            fromId: source.nodeId,
            toId: hoveredNodeId,
            fromSide: source.side,
            type: 'arrow',
          },
        ]);
      }
    }

    isPanningRef.current = false;
    isDraggingNodeRef.current = false;
    isResizingRef.current = false;
    isConnectingRef.current = false;
    connectingSourceRef.current = null;
    setTempConnectionEnd(null);
    setSnapLines([]);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-neutral-100 font-sans overflow-hidden select-none">
      {/* Subdued Aurora Background */}
      <GlobalBackground subdued={true} />

      {/* Floating Optical Glass Header Bar */}
      <header className="absolute top-5 inset-x-0 z-30 w-full max-w-5xl mx-auto px-4">
        <div className="optical-glass-pill flex items-center justify-between px-6 py-3 shadow-2xl">
          <div className="flex items-center gap-3.5">
            <Link to={ROUTES.DASHBOARD} className="text-neutral-400 hover:text-white transition-colors" title="Back to Dashboard">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div className="h-4 w-[1px] bg-white/10" />
            <span className="text-sm font-extrabold text-white tracking-tight">SketchFlow Infinite Whiteboard</span>
            <GlassBadge variant="emerald">Canvas Engine</GlassBadge>
          </div>

          {/* Action Tools & History Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleUndo}
              disabled={historyStack.length === 0}
              className="p-1.5 rounded-lg bg-black/40 border border-white/10 text-neutral-300 hover:text-white disabled:opacity-40"
              title="Undo (Ctrl+Z)"
            >
              ↩️
            </button>
            <button
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              className="p-1.5 rounded-lg bg-black/40 border border-white/10 text-neutral-300 hover:text-white disabled:opacity-40"
              title="Redo (Ctrl+Y)"
            >
              ↪️
            </button>
            <div className="h-4 w-[1px] bg-white/10 mx-1" />
            <div className="hidden sm:flex items-center gap-1 bg-black/50 border border-white/10 rounded-lg px-2.5 py-1 text-xs font-mono text-neutral-300">
              <button onClick={() => setZoomLevel((z) => Math.max(50, z - 10))} className="px-1 hover:text-white">-</button>
              <span className="w-9 text-center">{zoomLevel}%</span>
              <button onClick={() => setZoomLevel((z) => Math.min(150, z + 10))} className="px-1 hover:text-white">+</button>
            </div>
            <Link to={ROUTES.DASHBOARD}>
              <GlassButton variant="secondary" className="py-2 px-4 text-xs">
                Exit Canvas
              </GlassButton>
            </Link>
          </div>
        </div>
      </header>

      {/* Simplified Minimal Toolbar (Select, Rectangle, Ellipse, Diamond, Text, Line, Arrow) */}
      <aside className="absolute left-6 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col gap-2 optical-glass-card p-2">
        <button
          onClick={() => setActiveTool('select')}
          className={`p-3 rounded-xl border transition-all ${
            activeTool === 'select' ? 'bg-emerald-950/80 border-emerald-400 text-emerald-400 font-bold' : 'bg-black/40 border-white/10 text-neutral-400 hover:text-white'
          }`}
          title="Select Tool (V)"
        >
          🖐️
        </button>
        <button
          onClick={() => handleAddShape('rectangle')}
          className="p-3 rounded-xl bg-black/40 hover:bg-black/80 border border-white/10 text-emerald-400 hover:text-white transition-all hover:scale-105"
          title="Rectangle"
        >
          🟩
        </button>
        <button
          onClick={() => handleAddShape('ellipse')}
          className="p-3 rounded-xl bg-black/40 hover:bg-black/80 border border-white/10 text-emerald-400 hover:text-white transition-all hover:scale-105"
          title="Ellipse"
        >
          ⭕
        </button>
        <button
          onClick={() => handleAddShape('diamond')}
          className="p-3 rounded-xl bg-black/40 hover:bg-black/80 border border-white/10 text-emerald-400 hover:text-white transition-all hover:scale-105"
          title="Diamond"
        >
          🔷
        </button>
        <button
          onClick={() => handleAddShape('text')}
          className="p-3 rounded-xl bg-black/40 hover:bg-black/80 border border-white/10 text-emerald-400 hover:text-white transition-all hover:scale-105"
          title="Text"
        >
          📝
        </button>
        {(selectedNodeIds.length > 0 || selectedConnIds.length > 0) && (
          <button
            onClick={handleDeleteSelected}
            className="p-3 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/40 transition-all hover:scale-105"
            title="Delete Selected (Del)"
          >
            🗑️
          </button>
        )}
      </aside>

      {/* Main Interactive Canvas Workspace Viewport */}
      <main
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="relative z-10 w-full h-screen bg-[#08080a] cursor-grab active:cursor-grabbing overflow-hidden"
      >
        {/* Engineering Grid Background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel / 100})`,
            transformOrigin: '0 0',
          }}
        />

        {/* Scalable & Pannable Objects Container */}
        <div
          className="absolute inset-0 pointer-events-auto"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel / 100})`,
            transformOrigin: '0 0',
          }}
        >
          {/* SVG Connector & Alignment Lines Layer */}
          <svg className="absolute inset-0 w-[4000px] h-[4000px] pointer-events-none z-0 overflow-visible">
            <defs>
              <marker
                id="arrow-emerald-pro"
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

            {/* 1. Render Active Connections (Clickable, Selectable & Deletable) */}
            {connections.map((conn) => {
              const fromNode = nodes.find((n) => n.id === conn.fromId);
              const toNode = nodes.find((n) => n.id === conn.toId);
              if (!fromNode || !toNode) return null;

              const isConnSelected = selectedConnIds.includes(conn.id);
              const { fromAnchor, toAnchor } = getBestAnchorPair(fromNode, toNode);
              const controlX = fromAnchor.x + (toAnchor.x - fromAnchor.x) / 2;
              const pathData = `M ${fromAnchor.x} ${fromAnchor.y} C ${controlX} ${fromAnchor.y}, ${controlX} ${toAnchor.y}, ${toAnchor.x} ${toAnchor.y}`;
              const midX = (fromAnchor.x + toAnchor.x) / 2;
              const midY = (fromAnchor.y + toAnchor.y) / 2;

              return (
                <g key={conn.id} className="group cursor-pointer pointer-events-auto" onClick={(e) => handleConnMouseDown(e, conn.id)}>
                  {/* Forgiving Click Hitbox Line */}
                  <path d={pathData} fill="none" stroke="transparent" strokeWidth="16" />
                  {/* Selection Highlight Glow */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={isConnSelected ? '#34d399' : 'rgba(52, 211, 153, 0.15)'}
                    strokeWidth={isConnSelected ? '7' : '5'}
                  />
                  {/* Primary Path */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={isConnSelected ? '#6ee7b7' : '#34d399'}
                    strokeWidth="2.5"
                    strokeDasharray={conn.type === 'line' ? undefined : '6,6'}
                    markerEnd={conn.type === 'line' ? undefined : 'url(#arrow-emerald-pro)'}
                  />
                  {/* Selected Endpoint Anchor Handles */}
                  {isConnSelected && (
                    <>
                      <circle cx={fromAnchor.x} cy={fromAnchor.y} r="4" fill="#34d399" stroke="#000" strokeWidth="1" />
                      <circle cx={toAnchor.x} cy={toAnchor.y} r="4" fill="#34d399" stroke="#000" strokeWidth="1" />
                    </>
                  )}
                  {/* Connection Label Pill */}
                  {conn.label && (
                    <foreignObject x={midX - 35} y={midY - 12} width="70" height="24">
                      <div className={`flex items-center justify-center border rounded-full px-2 py-0.5 text-[9px] font-mono shadow-md ${
                        isConnSelected ? 'bg-emerald-950 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/30' : 'bg-black/90 border-emerald-500/40 text-emerald-300'
                      }`}>
                        {conn.label}
                      </div>
                    </foreignObject>
                  )}
                </g>
              );
            })}

            {/* 2. Render Temporary Live Connector Endpoint Drag Line */}
            {isConnectingRef.current && connectingSourceRef.current && tempConnectionEnd && (
              <g>
                <line
                  x1={getAnchors(nodes.find((n) => n.id === connectingSourceRef.current?.nodeId)!).right.x}
                  y1={getAnchors(nodes.find((n) => n.id === connectingSourceRef.current?.nodeId)!).right.y}
                  x2={tempConnectionEnd.x}
                  y2={tempConnectionEnd.y}
                  stroke="#34d399"
                  strokeWidth="2.5"
                  strokeDasharray="4,4"
                />
              </g>
            )}

            {/* 3. Render Alignment Snapping Guidelines */}
            {snapLines.map((line, idx) =>
              line.type === 'x' ? (
                <line
                  key={idx}
                  x1={line.pos}
                  y1="0"
                  x2={line.pos}
                  y2="3000"
                  stroke="#34d399"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
              ) : (
                <line
                  key={idx}
                  x1="0"
                  y1={line.pos}
                  x2="3000"
                  y2={line.pos}
                  stroke="#34d399"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
              )
            )}
          </svg>

          {/* Render Marquee Drag Selection Rectangle */}
          {marqueeBox && (
            <div
              className="absolute border border-emerald-400/80 bg-emerald-500/10 pointer-events-none z-40 rounded"
              style={{
                left: Math.min(marqueeBox.x1, marqueeBox.x2),
                top: Math.min(marqueeBox.y1, marqueeBox.y2),
                width: Math.abs(marqueeBox.x2 - marqueeBox.x1),
                height: Math.abs(marqueeBox.y2 - marqueeBox.y1),
              }}
            />
          )}

          {/* Minimalist Geometric Shape Cards (Rectangle, Ellipse, Diamond, Text) */}
          {nodes.map((node) => {
            const isSelected = selectedNodeIds.includes(node.id);
            const isEditing = editingNodeId === node.id;
            const anchors = getAnchors(node);

            return (
              <div
                key={node.id}
                onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
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
                className={`absolute p-4 bg-black/85 backdrop-blur-2xl border transition-shadow duration-150 shadow-2xl cursor-move z-10 flex flex-col justify-center ${
                  isSelected
                    ? 'border-emerald-400 ring-2 ring-emerald-400/40 shadow-emerald-950/60'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                {/* Node Label / Text */}
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

                {/* Smart Anchor Connection Dots (Exposed on Hover / Selection) */}
                {(isSelected || hoveredNodeId === node.id) && (
                  <>
                    {(['top', 'right', 'bottom', 'left'] as const).map((side) => {
                      const pos = anchors[side];
                      const localX = pos.x - node.x;
                      const localY = pos.y - node.y;

                      return (
                        <div
                          key={side}
                          onMouseDown={(e) => handleAnchorMouseDown(e, node.id, side)}
                          style={{ left: localX - 6, top: localY - 6 }}
                          className="absolute w-3 h-3 rounded-full bg-emerald-400 border border-black shadow-lg cursor-crosshair hover:scale-125 transition-transform z-30"
                          title={`Drag line from ${side} anchor to connect to another shape`}
                        />
                      );
                    })}

                    {/* Corner Resize Handles */}
                    <div
                      onMouseDown={(e) => handleResizeMouseDown(e, node.id, 'nw')}
                      className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-sm bg-white border border-black cursor-nwse-resize z-30"
                    />
                    <div
                      onMouseDown={(e) => handleResizeMouseDown(e, node.id, 'ne')}
                      className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-sm bg-white border border-black cursor-nesw-resize z-30"
                    />
                    <div
                      onMouseDown={(e) => handleResizeMouseDown(e, node.id, 'sw')}
                      className="absolute -bottom-1.5 -left-1.5 w-3 h-3 rounded-sm bg-white border border-black cursor-nesw-resize z-30"
                    />
                    <div
                      onMouseDown={(e) => handleResizeMouseDown(e, node.id, 'se')}
                      className="absolute -bottom-1.5 -right-1.5 w-3 h-3 rounded-sm bg-white border border-black cursor-nwse-resize z-30"
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Board;
