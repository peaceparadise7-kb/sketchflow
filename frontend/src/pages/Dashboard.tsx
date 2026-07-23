import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalBackground, GlassBadge, GlassButton, GlassCard, GlassHeader, GlassInput } from '@/components/ui';
import { ROUTES } from '@/constants';

interface BoardItem {
  id: string;
  title: string;
  updatedAt: string;
  members: number;
  thumbnailColor: string;
}

export const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const boards: BoardItem[] = [
    {
      id: 'board-1',
      title: 'System Architecture Whiteboard',
      updatedAt: '2 hours ago',
      members: 4,
      thumbnailColor: 'from-emerald-950/80 to-black',
    },
    {
      id: 'board-2',
      title: 'Microservices Event Pipeline',
      updatedAt: 'Yesterday',
      members: 2,
      thumbnailColor: 'from-neutral-900 to-black',
    },
    {
      id: 'board-3',
      title: 'Database Sharding Schema',
      updatedAt: '3 days ago',
      members: 5,
      thumbnailColor: 'from-neutral-900 to-black',
    },
  ];

  const filteredBoards = boards.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-[#050505] text-neutral-100 font-sans selection:bg-neutral-800 selection:text-white">
      {/* Shared Global Aurora & Engineering Grid Background */}
      <GlobalBackground />

      {/* Reusable Glass Header */}
      <GlassHeader
        leftContent={
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-white/15 flex items-center justify-center shadow-lg shadow-black/40">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2V4zm-6 8a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zm12 0a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zM4 18a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zm12 0a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1z" />
              </svg>
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">SketchFlow Workspace</span>
            <GlassBadge variant="emerald">Pro Tier</GlassBadge>
          </div>
        }
        rightContent={
          <div className="flex items-center gap-4">
            <Link to={ROUTES.BOARD_DETAIL('new')}>
              <GlassButton variant="primary" className="py-2 px-4 text-xs font-bold">
                + New Whiteboard
              </GlassButton>
            </Link>
            <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/20 flex items-center justify-center text-xs font-bold text-white shadow-md">
              AV
            </div>
          </div>
        }
      />

      {/* Main Desktop Productivity Workspace Viewport */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Workspace Greeting & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Architecture Workspaces</h1>
            <p className="text-sm text-neutral-400 mt-1">Manage and collaborate on active whiteboard canvases.</p>
          </div>

          <div className="w-full md:w-80">
            <GlassInput
              id="dashboard-search"
              type="text"
              placeholder="Search whiteboards... (⌘K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Center Architecture Boards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBoards.map((board) => (
            <Link key={board.id} to={ROUTES.BOARD_DETAIL(board.id)}>
              <GlassCard className="group p-5 hover:border-white/40 transition-all duration-200 cursor-pointer h-full flex flex-col justify-between">
                <div>
                  <div className={`h-36 rounded-2xl bg-gradient-to-br ${board.thumbnailColor} border border-white/10 p-4 mb-4 flex flex-col justify-between overflow-hidden relative group-hover:scale-[1.01] transition-transform`}>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                        Active Canvas
                      </span>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                    {board.title}
                  </h3>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>Updated {board.updatedAt}</span>
                  <span>{board.members} Collaborators</span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
