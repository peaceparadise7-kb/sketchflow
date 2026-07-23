import React from 'react';

interface EngineeringGridProps {
  opacityClass?: string;
  withNoise?: boolean;
}

export const EngineeringGrid: React.FC<EngineeringGridProps> = ({
  opacityClass = 'opacity-15',
  withNoise = true,
}) => {
  return (
    <>
      {/* Masked Radial Grid Fading Toward Edges */}
      <div
        className={`fixed inset-0 ${opacityClass} pointer-events-none z-0 mask-radial-grid`}
        style={{
          backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Subtle 2% Noise Texture Layer */}
      {withNoise && (
        <div
          className="fixed inset-0 opacity-[0.025] pointer-events-none z-0 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      )}
    </>
  );
};

export default EngineeringGrid;
