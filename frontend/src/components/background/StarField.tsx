import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
}

export const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let stars: Star[] = [];

    const initStars = (width: number, height: number) => {
      stars = [];
      const starCount = Math.floor((width * height) / 7000); // Scaled to viewport resolution

      for (let i = 0; i < starCount; i++) {
        const baseAlpha = Math.random() * 0.5 + 0.15; // Subtle brightness (0.15 - 0.65)
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.85, // Upper 85% sky
          radius: Math.random() * 0.9 + 0.4, // Small crisp points (0.4px - 1.3px)
          alpha: baseAlpha,
          baseAlpha,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    let isTabActive = true;
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange, false);

    let time = 0;
    const render = () => {
      animFrameId = requestAnimationFrame(render);

      if (!isTabActive || !ctx || !canvas) return;

      time += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        // Twinkle sinusoid
        star.alpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed * 50 + i) * 0.2;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 232, 240, ${Math.max(0.05, star.alpha)})`;
        ctx.fill();
      }
    };

    render();

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default StarField;
