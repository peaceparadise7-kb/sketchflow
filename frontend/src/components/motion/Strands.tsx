import React, { useEffect, useRef } from 'react';

interface StrandsProps {
  className?: string;
  color?: string;
  speed?: number;
  opacity?: number;
}

export const Strands: React.FC<StrandsProps> = ({
  className = '',
  color = 'rgba(52, 211, 153, 0.15)', // Aurora Green
  speed = 0.005,
  opacity = 0.25,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const render = () => {
      time += speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const numStrands = 3;
      for (let i = 0; i < numStrands; i++) {
        ctx.beginPath();
        const startY = canvas.height * (0.3 + i * 0.2);
        ctx.moveTo(0, startY);

        for (let x = 0; x < canvas.width; x += 20) {
          const y =
            startY +
            Math.sin(x * 0.002 + time + i * 1.5) * 40 +
            Math.cos(x * 0.001 - time * 0.8) * 20;
          ctx.lineTo(x, y);
        }

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(0.3, color);
        gradient.addColorStop(0.7, 'rgba(16, 185, 129, 0.12)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{ opacity }}
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${className}`}
    />
  );
};

export default Strands;
