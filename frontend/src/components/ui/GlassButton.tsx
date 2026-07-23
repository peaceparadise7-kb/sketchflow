import React from 'react';

export type GlassButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'icon';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GlassButtonVariant;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium text-sm transition-all duration-[160ms] ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none disabled:border-white/5 select-none relative overflow-hidden backdrop-blur-2xl active:translate-y-0 active:scale-[0.985] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]';

  const variantClasses: Record<GlassButtonVariant, string> = {
    primary:
      'bg-gradient-to-b from-white/12 via-black/45 to-black/70 hover:from-white/18 hover:via-black/55 hover:to-black/80 text-white font-semibold border-t border-t-white/40 border-l border-l-white/25 border-r border-r-white/15 border-b border-b-white/10 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.4),0_12px_28px_rgba(0,0,0,0.85)] hover:-translate-y-[1.5px] hover:shadow-[inset_0_2px_1px_rgba(255,255,255,0.5),0_16px_35px_rgba(0,0,0,0.9)] py-3.5 px-6 rounded-full',
    secondary:
      'bg-gradient-to-b from-white/[0.08] via-black/25 to-black/50 hover:from-white/[0.14] hover:via-black/35 hover:to-black/60 text-neutral-300 hover:text-white font-medium border-t border-t-white/25 border-l border-l-white/15 border-r border-r-white/10 border-b border-b-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_8px_20px_rgba(0,0,0,0.75)] hover:-translate-y-[1.5px] hover:shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.35),0_12px_25px_rgba(0,0,0,0.8)] py-3.5 px-6 rounded-xl',
    tertiary:
      'bg-transparent hover:bg-white/[0.05] text-neutral-400 hover:text-white border border-transparent hover:border-white/10 py-2.5 px-4 rounded-xl',
    danger:
      'bg-gradient-to-b from-rose-950/40 via-rose-950/70 to-black/90 hover:from-rose-950/60 hover:via-rose-900/80 hover:to-black text-rose-200 border-t border-t-rose-500/40 border-l border-l-rose-700/30 border-r border-r-rose-900/20 border-b border-b-rose-950/10 shadow-[inset_0_1px_1px_rgba(244,63,94,0.3),0_8px_20px_rgba(0,0,0,0.8)] hover:-translate-y-[1.5px] py-3.5 px-6 rounded-xl',
    icon:
      'p-2.5 bg-gradient-to-b from-white/[0.08] via-black/30 to-black/50 hover:from-white/[0.14] hover:via-black/45 hover:to-black/65 text-neutral-400 hover:text-white border-t border-t-white/25 border-l border-l-white/15 border-r border-r-white/10 border-b border-b-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_6px_16px_rgba(0,0,0,0.7)] hover:-translate-y-[1px] rounded-xl flex items-center justify-center',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Specular Top-Left Reflection Streak */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-white/30 via-white/15 to-transparent pointer-events-none" />
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {children}
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          {leftIcon}
          {children}
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default GlassButton;
