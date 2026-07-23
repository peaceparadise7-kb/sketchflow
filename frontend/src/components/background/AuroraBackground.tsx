import React from 'react';
import { AuroraVideo } from './AuroraVideo';
import { EngineeringGrid } from './EngineeringGrid';

interface AuroraBackgroundProps {
  subdued?: boolean;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ subdued = false }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      {/* Layer 1: Fixed 4K Aurora Video (Color Graded & Watermark Masked) */}
      <AuroraVideo subdued={subdued} />

      {/* Layer 2: Faint Radial Masked Engineering Grid */}
      <EngineeringGrid opacityClass="opacity-10" />
    </div>
  );
};

export default AuroraBackground;
