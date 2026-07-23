import React from 'react';

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  endElement?: React.ReactNode;
}

export const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  ({ label, error, endElement, id, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={id}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error && id ? `${id}-error` : undefined}
            className={`block w-full px-3.5 py-2.5 bg-black/60 border ${
              error
                ? 'border-rose-500/80 focus:ring-rose-500/20'
                : 'border-white/10 hover:border-white/20 focus:border-white/30 focus:ring-white/10'
            } text-white rounded-xl placeholder-neutral-500 focus:outline-none focus:ring-2 sm:text-sm transition-all duration-200 ${
              endElement ? 'pr-11' : ''
            } ${className}`}
            {...props}
          />
          {endElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
              {endElement}
            </div>
          )}
        </div>
        {error && (
          <p id={id ? `${id}-error` : undefined} className="mt-1.5 text-xs text-rose-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

GlassInput.displayName = 'GlassInput';

export default GlassInput;
