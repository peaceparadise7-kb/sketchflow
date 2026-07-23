import React from 'react';

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const GlassModal: React.FC<GlassModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#0f172a]/80 backdrop-blur-2xl border border-white/[0.08] rounded-3xl shadow-2xl p-6 sm:p-8 animate-card-entrance z-10">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
          {title && <h3 className="text-lg font-bold text-white">{title}</h3>}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/[0.06] transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default GlassModal;
