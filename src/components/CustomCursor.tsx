import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorMode, setCursorMode] = useState<'normal' | 'hover' | 'view' | 'explore'>('normal');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: targetX, y: targetY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const viewEl = target.closest('[data-cursor="view"], [data-cursor="project"]');
        const exploreEl = target.closest('[data-cursor="explore"], [data-cursor="hobby"]');
        const interactiveEl = target.closest('button, a, input, textarea, select, [role="button"]');

        if (viewEl) {
          setCursorMode('view');
        } else if (exploreEl) {
          setCursorMode('explore');
        } else if (interactiveEl) {
          setCursorMode('hover');
        } else {
          setCursorMode('normal');
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const animateTrail = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      setTrailingPos({ x: currentX, y: currentY });
      animationId = requestAnimationFrame(animateTrail);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    animationId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer contextual cursor */}
      <div
        className="pointer-events-none fixed z-50 hidden md:block select-none"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        {cursorMode === 'view' ? (
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#E875A0] text-white text-[10px] tracking-widest uppercase font-semibold shadow-[0_0_25px_rgba(232,117,160,0.6)] animate-in zoom-in-75 duration-200">
            VIEW ↗
          </div>
        ) : cursorMode === 'explore' ? (
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#9D315C] text-[#FFF8FA] text-[10px] tracking-widest uppercase font-semibold shadow-[0_0_25px_rgba(157,49,92,0.6)] border border-[#F2A9C2]/40 animate-in zoom-in-75 duration-200">
            EXPLORE
          </div>
        ) : (
          <div
            className={`rounded-full border transition-all duration-200 ${
              cursorMode === 'hover'
                ? 'h-10 w-10 border-[#E875A0] bg-[#E875A0]/10 scale-110 shadow-[0_0_15px_rgba(232,117,160,0.3)]'
                : 'h-7 w-7 border-[#F2A9C2]/40 bg-transparent'
            }`}
          />
        )}
      </div>

      {/* Center pinpoint for precision */}
      {cursorMode !== 'view' && cursorMode !== 'explore' && (
        <div
          className="pointer-events-none fixed z-50 hidden md:block"
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          }}
        >
          <div
            className={`rounded-full transition-all duration-150 ${
              cursorMode === 'hover' ? 'h-1.5 w-1.5 bg-[#FFF8FA]' : 'h-1 w-1 bg-[#E875A0]'
            }`}
          />
        </div>
      )}
    </>
  );
};
