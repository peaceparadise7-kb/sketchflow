import React from 'react';
import { Link } from 'react-router-dom';
import { GlassButton, GlassBadge } from '../ui';
import { ROUTES } from '@/constants';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 overflow-hidden text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Product Badge */}
        <div className="inline-flex items-center gap-2 mb-6">
          <GlassBadge variant="emerald" className="px-3.5 py-1.5 text-xs font-semibold shadow-lg">
            <span>✨</span> Infinite Collaborative Whiteboard
          </GlassBadge>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
          Think. Sketch. <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-emerald-400">
            Collaborate in real time.
          </span>
        </h1>

        {/* Subtitle emphasizing infinite canvas, multiplayer, smooth drawing */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-400 font-normal leading-relaxed mb-10">
          An infinite canvas for visual thinking, wireframing, and brainstorming with your team. 
          Enjoy smooth drawing, smart shape connectors, and multiplayer collaboration.
        </p>

        {/* Decision Point CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link to={ROUTES.BOARD_DETAIL('new')} className="w-full sm:w-auto">
            <GlassButton variant="primary" className="w-full sm:w-auto py-3.5 px-8 text-sm font-bold shadow-2xl">
              Start Drawing →
            </GlassButton>
          </Link>
          <a
            href="https://github.com/peaceparadise7-kb/sketchflow"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
            aria-label="GitHub Repository"
            title="GitHub Repository"
          >
            <GlassButton variant="secondary" className="w-full sm:w-auto py-3.5 px-6 text-sm font-semibold flex items-center justify-center gap-2">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </GlassButton>
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;
