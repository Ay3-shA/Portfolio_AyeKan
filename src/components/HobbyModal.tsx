import React, { useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { HobbyStory } from '../data/portfolioData';

interface HobbyModalProps {
  hobby: HobbyStory | null;
  onClose: () => void;
}

export const HobbyModal: React.FC<HobbyModalProps> = ({ hobby, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (hobby) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hobby, onClose]);

  if (!hobby) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#240D18]/92 backdrop-blur-xl animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hobby-modal-title"
    >
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Overlay Window */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#2C0E1E] border border-[#E875A0]/25 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] z-10 text-[#FFF8FA] p-6 sm:p-10 md:p-12 animate-in zoom-in-95 duration-300">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-[#F2A9C2]/15">
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#E875A0] font-medium">
            <span>Outside the Code</span>
            <span aria-hidden="true">·</span>
            <span>{hobby.title}</span>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs uppercase tracking-wider text-[#F8DCE8]/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E875A0]"
            aria-label="Close hobby overlay"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title & Personal Note */}
        <div className="my-8 space-y-4">
          <h2
            id="hobby-modal-title"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight"
          >
            {hobby.title}
          </h2>

          <div className="max-w-2xl pl-4 border-l-2 border-[#E875A0]/60">
            <p className="text-base sm:text-lg text-[#F8DCE8]/90 font-light leading-relaxed">
              "{hobby.note}"
            </p>
          </div>
        </div>

        {/* 3 Related Photographs Layout */}
        <div className="my-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-stretch">
            {/* Primary Large Image (7 cols) */}
            <div className="md:col-span-7 overflow-hidden rounded-xl border border-white/10 bg-black/30 shadow-md">
              <img
                src={hobby.images[0].src}
                alt={hobby.images[0].alt}
                className="w-full h-64 sm:h-80 md:h-[380px] object-cover object-center hover:scale-103 transition-transform duration-500 ease-out"
              />
            </div>

            {/* Secondary Pair of Images (5 cols) */}
            <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-4 sm:gap-6">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-black/30 shadow-md">
                <img
                  src={hobby.images[1].src}
                  alt={hobby.images[1].alt}
                  className="w-full h-32 sm:h-36 md:h-[178px] object-cover object-center hover:scale-103 transition-transform duration-500 ease-out"
                />
              </div>

              <div className="overflow-hidden rounded-xl border border-white/10 bg-black/30 shadow-md">
                <img
                  src={hobby.images[2].src}
                  alt={hobby.images[2].alt}
                  className="w-full h-32 sm:h-36 md:h-[178px] object-cover object-center hover:scale-103 transition-transform duration-500 ease-out"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Close Action */}
        <div className="pt-6 border-t border-[#F2A9C2]/15 flex items-center justify-between">
          <span className="text-xs text-[#F2A9C2]/60 font-light">
            3 Photographs · {hobby.title}
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-xs tracking-[0.2em] uppercase font-medium text-white bg-[#651F3B] hover:bg-[#9D315C] transition-colors"
          >
            Close ×
          </button>
        </div>
      </div>
    </div>
  );
};
