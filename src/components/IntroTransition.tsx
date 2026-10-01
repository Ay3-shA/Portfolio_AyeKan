import React, { useEffect, useState } from 'react';

interface IntroTransitionProps {
  onComplete: () => void;
}

export const IntroTransition: React.FC<IntroTransitionProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'brand' | 'name' | 'fade' | 'done'>('brand');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const timer1 = setTimeout(() => setStage('name'), 400);
    const timer2 = setTimeout(() => setStage('fade'), 950);
    const timer3 = setTimeout(() => {
      setStage('done');
      onComplete();
    }, 1300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  if (stage === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#240D18] pointer-events-none transition-opacity duration-400 ease-out select-none ${
        stage === 'fade' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center px-6">
        <div
          className={`transition-all duration-400 transform ${
            stage === 'brand'
              ? 'opacity-100 scale-100'
              : 'opacity-0 -translate-y-3 scale-95 hidden'
          }`}
        >
          <span className="font-display text-4xl sm:text-5xl md:text-6xl tracking-[0.3em] font-light text-[#FFF8FA]">
            AYEKAN
          </span>
        </div>

        <div
          className={`transition-all duration-400 transform ${
            stage === 'name' || stage === 'fade'
              ? 'opacity-100 scale-100'
              : 'opacity-0 translate-y-3 scale-95 hidden'
          }`}
        >
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-[#FFF8FA] tracking-tight">
            <span className="block italic text-[#F8DCE8]">Ayesha</span>
            <span className="block font-normal">Kanwal</span>
          </h1>
          <p className="text-xs tracking-[0.3em] uppercase text-[#E875A0] mt-3 font-medium">
            Software & AI Engineer
          </p>
        </div>
      </div>
    </div>
  );
};
