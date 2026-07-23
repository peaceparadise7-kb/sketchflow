import React from 'react';
import { AuroraBackground } from '../background/AuroraBackground';

interface GlobalBackgroundProps {
  subdued?: boolean;
}

export const GlobalBackground: React.FC<GlobalBackgroundProps> = ({ subdued = false }) => {
  return <AuroraBackground subdued={subdued} />;
};

export default GlobalBackground;
