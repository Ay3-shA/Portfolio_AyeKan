
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
  depth: number;
  pulsePhase: number;
  pulseSpeed: number;
}

export const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const mouseRef = useRef<{
    x: number;
    y: number;
    active: boolean;
  }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = window.innerWidth < 768;

    const particleCount = isMobile ? 30 : 58;
    const maxConnectionDistance = isMobile ? 105 : 165;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    /*
     * Richer cinematic palette:
     * deep rose → pink → blush → almost-white highlights
     */
    const palette = [
      { r: 232, g: 117, b: 160 },
      { r: 242, g: 169, b: 194 },
      { r: 248, g: 220, b: 232 },
      { r: 157, g: 49, b: 92 },
      { r: 255, g: 205, b: 225 },
    ];

    const particles: BotanicalParticle[] = [];

    const types: (
      | 'petal'
      | 'dust'
      | 'synapse'
      | 'light'
    )[] = ['petal', 'dust', 'synapse', 'light'];

    /*
     * Create particles with different "depths".
     * Larger depth = closer to the viewer = brighter/slightly faster.
     */
    for (let i = 0; i < particleCount; i++) {
      const depth = Math.random();

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,

        vx: prefersReducedMotion
          ? 0
          : (Math.random() - 0.5) * (0.22 + depth * 0.28),

        vy: prefersReducedMotion
          ? 0
          : (Math.random() - 0.5) * (0.22 + depth * 0.28),

        radius: Math.random() * 2.1 + 0.65 + depth * 0.8,

        baseAlpha:
          Math.random() * 0.28 + 0.12 + depth * 0.18,

        alpha:
          Math.random() * 0.28 + 0.12 + depth * 0.18,

        type: types[i % types.length],

        angle: Math.random() * Math.PI * 2,

        rotSpeed: (Math.random() - 0.5) * 0.006,

        driftPhase: Math.random() * Math.PI * 2,

        depth,

        pulsePhase: Math.random() * Math.PI * 2,

        pulseSpeed: 0.8 + Math.random() * 1.2,
      });
    }

    const handleResize = () => {
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
      time += 0.009;

      ctx.clearRect(0, 0, width, height);

      /*
       * =========================================================
       * CINEMATIC ATMOSPHERE
       * =========================================================
       */

      // Slow-moving central atmospheric bloom
      const bloomX =
        width * 0.5 +
        Math.sin(time * 0.28) * width * 0.12;

      const bloomY =
        height * 0.42 +
        Math.cos(time * 0.22) * height * 0.1;

      const bloomRadius =
        Math.max(width, height) * 0.72;

      const grad = ctx.createRadialGradient(
        bloomX,
        bloomY,
        10,
        width * 0.5,
        height * 0.5,
        bloomRadius
      );

      grad.addColorStop(
        0,
        'rgba(125, 34, 70, 0.20)'
      );

      grad.addColorStop(
        0.32,
        'rgba(101, 31, 59, 0.13)'
      );

      grad.addColorStop(
        0.68,
        'rgba(58, 20, 37, 0.07)'
      );

      grad.addColorStop(
        1,
        'rgba(20, 6, 14, 0)'
      );

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      /*
       * Secondary drifting light field.
       * This gives the background a subtle "breathing" quality.
       */
      const secondaryX =
        width * 0.2 +
        Math.cos(time * 0.17) * width * 0.16;

      const secondaryY =
        height * 0.72 +
        Math.sin(time * 0.14) * height * 0.12;

      const secondaryGlow = ctx.createRadialGradient(
        secondaryX,
        secondaryY,
        0,
        secondaryX,
        secondaryY,
        Math.max(width, height) * 0.45
      );

      secondaryGlow.addColorStop(
        0,
        'rgba(232, 117, 160, 0.055)'
      );

      secondaryGlow.addColorStop(
        1,
        'rgba(232, 117, 160, 0)'
      );

      ctx.fillStyle = secondaryGlow;
      ctx.fillRect(0, 0, width, height);

      /*
       * =========================================================
       * NEURAL / BOTANICAL CONNECTIONS
       * =========================================================
       */

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;

          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDistance) {
            const proximity =
              1 - dist / maxConnectionDistance;

            /*
             * Connections become slightly stronger
             * when both particles are closer to the viewer.
             */
            const depthBoost =
              0.65 + (p1.depth + p2.depth) * 0.25;

            let filamentAlpha =
              proximity * 0.13 * depthBoost;

            /*
             * Gentle traveling pulse.
             * This creates the feeling that information
             * is moving through the neural network.
             */
            const pulse =
              (Math.sin(
                time * 2.2 +
                  i * 0.7 +
                  j * 0.35 -
                  dist * 0.025
              ) +
                1) /
              2;

            filamentAlpha +=
              proximity * pulse * 0.065;

            const color =
              palette[(i + j) % palette.length];

            ctx.beginPath();

            const midX =
              (p1.x + p2.x) / 2 +
              Math.sin(time * 1.1 + i) * 7;

            const midY =
              (p1.y + p2.y) / 2 +
              Math.cos(time * 1.05 + j) * 7;

            ctx.moveTo(p1.x, p1.y);

            ctx.quadraticCurveTo(
              midX,
              midY,
              p2.x,
              p2.y
            );

            ctx.strokeStyle = `rgba(
              ${color.r},
              ${color.g},
              ${color.b},
              ${filamentAlpha}
            )`;

            ctx.lineWidth =
              0.55 + proximity * 0.45;

            ctx.stroke();

            /*
             * Occasional luminous pulse travelling
             * along a connection.
             */
            if (
              !prefersReducedMotion &&
              pulse > 0.92 &&
              proximity > 0.35
            ) {
              const travel =
                (time * 0.35 + i * 0.17 + j * 0.09) % 1;

              const pulseX =
                p1.x +
                (p2.x - p1.x) * travel;

              const pulseY =
                p1.y +
                (p2.y - p1.y) * travel;

              ctx.beginPath();

              ctx.arc(
                pulseX,
                pulseY,
                1.2 + proximity,
                0,
                Math.PI * 2
              );

              ctx.fillStyle = `rgba(
                255,
                225,
                238,
                ${0.25 + proximity * 0.35}
              )`;

              ctx.fill();
            }
          }
        }
      }

      /*
       * =========================================================
       * PARTICLES
       * =========================================================
       */

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const pulse =
          (Math.sin(
            time * p.pulseSpeed +
              p.pulsePhase
          ) +
            1) /
          2;

        if (!prefersReducedMotion) {
          /*
           * Organic floating motion.
           */
          p.x +=
            p.vx +
            Math.sin(
              p.driftPhase + time * 0.8
            ) *
              (0.10 + p.depth * 0.08);

          p.y +=
            p.vy +
            Math.cos(
              p.driftPhase + time * 0.75
            ) *
              (0.10 + p.depth * 0.08);

          p.angle += p.rotSpeed;

          /*
           * Very subtle attraction toward mouse.
           */
          if (mouseRef.current.active) {
            const mdx =
              mouseRef.current.x - p.x;

            const mdy =
              mouseRef.current.y - p.y;

            const mdist =
              Math.sqrt(
                mdx * mdx + mdy * mdy
              );

            if (mdist < 190 && mdist > 0) {
              const influence =
                (1 - mdist / 190) *
                0.035 *
                (0.5 + p.depth);

              p.vx +=
                (mdx / mdist) * influence;

              p.vy +=
                (mdy / mdist) * influence;

              p.alpha = Math.min(
                0.92,
                p.baseAlpha +
                  0.24 *
                    (1 - mdist / 190)
              );
            } else {
              p.alpha +=
                (p.baseAlpha - p.alpha) *
                0.025;
            }
          } else {
            p.alpha +=
              (p.baseAlpha - p.alpha) *
              0.025;
          }
        }

        /*
         * Natural velocity damping.
         */
        p.vx *= 0.989;
        p.vy *= 0.989;

        /*
         * Screen wrapping.
         */
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;

        const color =
          palette[i % palette.length];

        /*
         * =====================================================
         * PETALS
         * =====================================================
         */

        if (p.type === 'petal') {
          ctx.save();

          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);

          const petalScale =
            1 + pulse * 0.08;

          ctx.scale(
            petalScale,
            petalScale
          );

          ctx.beginPath();

          ctx.ellipse(
            0,
            0,
            p.radius * 2.3,
            p.radius * 0.9,
            0,
            0,
            Math.PI * 2
          );

          ctx.fillStyle = `rgba(
            ${color.r},
            ${color.g},
            ${color.b},
            ${p.alpha * (0.55 + pulse * 0.2)}
          )`;

          ctx.fill();

          ctx.restore();

        /*
         * =====================================================
         * LIGHT PARTICLES
         * =====================================================
         */

        } else if (p.type === 'light') {
          /*
           * Outer atmospheric halo.
           */
          const glowRadius =
            p.radius *
            (3.2 + pulse * 2.2);

          const glow =
            ctx.createRadialGradient(
              p.x,
              p.y,
              0,
              p.x,
              p.y,
              glowRadius
            );

          glow.addColorStop(
            0,
            `rgba(
              ${color.r},
              ${color.g},
              ${color.b},
              ${p.alpha * (0.18 + pulse * 0.16)}
            )`
          );

          glow.addColorStop(
            1,
            `rgba(
              ${color.r},
              ${color.g},
              ${color.b},
              0
            )`
          );

          ctx.fillStyle = glow;

          ctx.beginPath();

          ctx.arc(
            p.x,
            p.y,
            glowRadius,
            0,
            Math.PI * 2
          );

          ctx.fill();

          /*
           * Bright core.
           */
          ctx.beginPath();

          ctx.arc(
            p.x,
            p.y,
            p.radius *
              (0.85 + pulse * 0.3),
            0,
            Math.PI * 2
          );

          ctx.fillStyle = `rgba(
            255,
            248,
            251,
            ${p.alpha * (0.75 + pulse * 0.25)}
          )`;

          ctx.fill();

        /*
         * =====================================================
         * SYNAPSES / DUST
         * =====================================================
         */

        } else {
          ctx.beginPath();

          ctx.arc(
            p.x,
            p.y,
            p.radius *
              (0.72 + pulse * 0.18),
            0,
            Math.PI * 2
          );

          ctx.fillStyle = `rgba(
            ${color.r},
            ${color.g},
            ${color.b},
            ${p.alpha * (0.85 + pulse * 0.15)}
          )`;

          ctx.fill();
        }
      }

      /*
       * =========================================================
       * CINEMATIC VIGNETTE
       * =========================================================
       *
       * Keeps the center readable and gives the edges depth.
       */
      const vignette =
        ctx.createRadialGradient(
          width * 0.5,
          height * 0.5,
          Math.min(width, height) * 0.18,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.78
        );

      vignette.addColorStop(
        0,
        'rgba(0, 0, 0, 0)'
      );

      vignette.addColorStop(
        0.72,
        'rgba(12, 3, 8, 0.035)'
      );

      vignette.addColorStop(
        1,
        'rgba(12, 3, 8, 0.20)'
      );

      ctx.fillStyle = vignette;
      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      animationFrameId =
        requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);

      window.removeEventListener(
        'resize',
        handleResize
      );

      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      window.removeEventListener(
        'mouseleave',
        handleMouseLeave
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-90"
    />
  );
};
