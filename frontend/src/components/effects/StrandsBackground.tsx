import React, { useEffect, useRef } from 'react';

interface StrandsProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  className?: string;
  opacity?: number;
}

export const StrandsBackground: React.FC<StrandsProps> = ({
  color1 = '#13FF00', // Electric Emerald / Neon Green
  color2 = '#000000',
  color3 = '#FFFFFF', // Bright White Ribbon
  speed = 0.008,
  className = '',
  opacity = 0.85,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let tick = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Render exact floating glowing eye/ribbon strands matching reference image
    const drawFloatingRibbon = (
      centerX: number,
      centerY: number,
      width: number,
      heightAmplitude: number,
      phaseOffset: number
    ) => {
      const startX = centerX - width / 2;
      const endX = centerX + width / 2;
      const midX = centerX;

      // Vertical floating motion
      const floatY = Math.sin(tick * 0.8 + phaseOffset) * 18;
      const currentCenterY = centerY + floatY;

      // Breathing height amplitude
      const currentAmplitude = heightAmplitude + Math.sin(tick * 1.2 + phaseOffset) * 12;

      // -------------------------------------------------------------------
      // 1. TOP GREEN GLOWING STRAND
      // -------------------------------------------------------------------
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(startX, currentCenterY);
      ctx.quadraticCurveTo(
        midX,
        currentCenterY - currentAmplitude,
        endX,
        currentCenterY
      );

      const greenGrad = ctx.createLinearGradient(startX, 0, endX, 0);
      greenGrad.addColorStop(0, 'rgba(19, 255, 0, 0)');
      greenGrad.addColorStop(0.15, 'rgba(19, 255, 0, 0.4)');
      greenGrad.addColorStop(0.5, color1);
      greenGrad.addColorStop(0.85, 'rgba(19, 255, 0, 0.4)');
      greenGrad.addColorStop(1, 'rgba(19, 255, 0, 0)');

      ctx.strokeStyle = greenGrad;
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#13FF00';
      ctx.shadowBlur = 35;
      ctx.stroke();
      ctx.restore();

      // -------------------------------------------------------------------
      // 2. BOTTOM WHITE LUMINOUS STRAND
      // -------------------------------------------------------------------
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(startX, currentCenterY);
      ctx.quadraticCurveTo(
        midX,
        currentCenterY + currentAmplitude * 0.85,
        endX,
        currentCenterY
      );

      const whiteGrad = ctx.createLinearGradient(startX, 0, endX, 0);
      whiteGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      whiteGrad.addColorStop(0.2, 'rgba(255, 255, 255, 0.5)');
      whiteGrad.addColorStop(0.5, color3);
      whiteGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0.5)');
      whiteGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.strokeStyle = whiteGrad;
      ctx.lineWidth = 3;
      ctx.shadowColor = '#FFFFFF';
      ctx.shadowBlur = 30;
      ctx.stroke();
      ctx.restore();

      // -------------------------------------------------------------------
      // 3. INNER EMERALD AURA FILL (Diffused Soft Glow)
      // -------------------------------------------------------------------
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(startX, currentCenterY);
      ctx.quadraticCurveTo(midX, currentCenterY - currentAmplitude, endX, currentCenterY);
      ctx.quadraticCurveTo(midX, currentCenterY + currentAmplitude * 0.85, startX, currentCenterY);
      ctx.closePath();

      const auraGrad = ctx.createRadialGradient(
        midX,
        currentCenterY,
        5,
        midX,
        currentCenterY,
        currentAmplitude * 1.5
      );
      auraGrad.addColorStop(0, 'rgba(19, 255, 0, 0.25)');
      auraGrad.addColorStop(0.5, 'rgba(19, 255, 0, 0.08)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = auraGrad;
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      tick += speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Primary Center Floating Ribbon (Matching Screenshot Exactly)
      const primaryWidth = Math.min(canvas.width * 0.65, 750);
      drawFloatingRibbon(
        canvas.width / 2,
        canvas.height * 0.42,
        primaryWidth,
        55,
        0
      );

      // Secondary Background Floating Ribbon (Subtle depth layer)
      const secondaryWidth = Math.min(canvas.width * 0.45, 500);
      drawFloatingRibbon(
        canvas.width / 2,
        canvas.height * 0.72,
        secondaryWidth,
        35,
        Math.PI * 0.7
      );

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, [color1, color2, color3, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{ opacity }}
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${className}`}
    />
  );
};

export default StrandsBackground;
