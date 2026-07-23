import React, { useEffect, useRef } from 'react';

interface AuroraVideoProps {
  subdued?: boolean;
}

export const AuroraVideo: React.FC<AuroraVideoProps> = ({ subdued = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch((err) => {
      console.warn('Aurora video autoplay was restricted:', err);
    });

    const handleVisibilityChange = () => {
      if (!video) return;
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange, false);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      {/* 4K Aurora Video (Clear Northern Lights display matching reference design) */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={`w-full h-full object-cover transition-opacity duration-700 transform scale-105 ${
          subdued ? 'opacity-35' : 'opacity-100'
        }`}
        style={{
          objectPosition: 'center 20%', // Crops bottom watermark perfectly
          filter: 'brightness(0.9) contrast(1.2) saturate(1.15)',
        }}
      >
        <source src="/assets/videos/aurora.webm" type="video/webm" />
        <source src="/assets/videos/aurora.mp4" type="video/mp4" />
      </video>

      {/* Subtle Black Edge Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

      {/* Ultra-Soft Neutral Readability Mask */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </div>
  );
};

export default AuroraVideo;
