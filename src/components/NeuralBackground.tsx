import React, { useEffect, useRef } from 'react';

interface BotanicalParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  type: 'petal' | 'dust' | 'synapse' | 'light';
  angle: number;
  rotSpeed: number;
  driftPhase: number;
}

export const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 26 : 48;
    const maxConnectionDistance = isMobile ? 100 : 150;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const palette = [
      { r: 232, g: 117, b: 160 }, // Pink
      { r: 242, g: 169, b: 194 }, // Soft Pink
      { r: 248, g: 220, b: 232 }, // Blush
      { r: 157, g: 49, b: 92 },   // Rose
    ];

    const particles: BotanicalParticle[] = [];
    const types: ('petal' | 'dust' | 'synapse' | 'light')[] = ['petal', 'dust', 'synapse', 'light'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.35,
        vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2.2 + 0.8,
        baseAlpha: Math.random() * 0.35 + 0.15,
        alpha: Math.random() * 0.35 + 0.15,
        type: types[i % types.length],
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.006,
        driftPhase: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Living organic ambient bloom in background
      const grad = ctx.createRadialGradient(
        width * 0.5 + Math.sin(time * 0.2) * 50,
        height * 0.4 + Math.cos(time * 0.25) * 40,
        20,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.7
      );
      grad.addColorStop(0, 'rgba(101, 31, 59, 0.16)');
      grad.addColorStop(0.6, 'rgba(58, 20, 37, 0.08)');
      grad.addColorStop(1, 'rgba(36, 13, 24, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Connecting synaptic vines / botanical filaments
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDistance) {
            const filamentAlpha = (1 - dist / maxConnectionDistance) * 0.18;
            const color = palette[(i + j) % palette.length];

            ctx.beginPath();
            // Subtle botanical curvature
            const midX = (p1.x + p2.x) / 2 + Math.sin(time + i) * 5;
            const midY = (p1.y + p2.y) / 2 + Math.cos(time + j) * 5;

            ctx.moveTo(p1.x, p1.y);
            ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
            ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${filamentAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw individual points of intelligence / petals / dust
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx + Math.sin(p.driftPhase + time) * 0.15;
          p.y += p.vy + Math.cos(p.driftPhase + time) * 0.15;
          p.angle += p.rotSpeed;

          // Screen wrapping
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;

          // Mouse reactivity
          if (mouseRef.current.active) {
            const mdx = mouseRef.current.x - p.x;
            const mdy = mouseRef.current.y - p.y;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < 160 && mdist > 0) {
              const pull = (1 - mdist / 160) * 0.05;
              p.vx += (mdx / mdist) * pull;
              p.vy += (mdy / mdist) * pull;
              p.alpha = Math.min(0.8, p.baseAlpha + 0.3);
            } else {
              p.alpha += (p.baseAlpha - p.alpha) * 0.04;
            }
          }
        }

        p.vx *= 0.988;
        p.vy *= 0.988;

        const color = palette[i % palette.length];

        if (p.type === 'petal') {
          // Delicate organic petal shape
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 2.2, p.radius * 0.9, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${p.alpha * 0.7})`;
          ctx.fill();
          ctx.restore();
        } else if (p.type === 'light') {
          // Soft glowing diffuse light point
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${p.alpha * 0.15})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 248, 250, ${p.alpha})`;
          ctx.fill();
        } else {
          // Tiny synapse / stardust grain
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${p.alpha})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-80"
    />
  );
};
