import React from 'react';
import { ArrowDown, Code2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroProps {
  onExploreWork: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenContact }) => {
  const { profile } = PORTFOLIO_DATA;

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 max-w-7xl mx-auto z-10 select-none">
      {/* Top subtle status kicker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs tracking-[0.25em] uppercase text-[#F2A9C2]/70 pt-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E875A0] animate-pulse" />
          <span>Software Engineering · Artificial Intelligence</span>
        </div>
        <div className="mt-2 sm:mt-0 font-light text-[#F8DCE8]/50">
          <span>{profile.location}</span>
          <span className="mx-2">·</span>
          <span>Portfolio {profile.year}</span>
        </div>
      </div>

      {/* Main Dramatic Typographic Display */}
      <div className="my-auto py-10 md:py-14 relative">
        {/* Subtle glowing ambient bloom behind typography */}
        <div className="absolute -top-12 -left-12 w-96 h-96 bg-[#9D315C]/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Brand Mark */}
        <div className="mb-4">
          <span className="text-xs sm:text-sm tracking-[0.4em] uppercase text-[#E875A0] font-medium block">
            {profile.brand}
          </span>
        </div>

        {/* Dominant Headline: AYESHA KANWAL */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] font-light leading-[0.9] tracking-tight text-[#FFF8FA] text-balance">
          <span className="block italic font-light text-[#F8DCE8]">Ayesha</span>
          <span className="block font-normal tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8FA] via-[#F8DCE8] to-[#E875A0]/80">
            Kanwal
          </span>
        </h1>

        {/* Clear Professional Title */}
        <div className="mt-4 flex items-center gap-3">
          <span className="w-8 h-[1px] bg-[#E875A0]/40" />
          <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#FFF8FA] font-medium">
            {profile.role}
          </span>
        </div>

        {/* Concise, Natural Tagline */}
        <div className="mt-6 md:mt-8 max-w-2xl border-l border-[#E875A0]/30 pl-6">
          <p className="font-display text-2xl sm:text-3xl md:text-4xl text-[#F2A9C2] font-light leading-snug">
            "{profile.heroTagline}"
          </p>
        </div>

        {/* Action Triggers */}
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <button
            onClick={onExploreWork}
            className="px-6 py-3.5 text-xs tracking-[0.2em] uppercase font-medium text-white bg-gradient-to-r from-[#651F3B] to-[#9D315C] hover:from-[#9D315C] hover:to-[#E875A0] border border-[#E875A0]/40 rounded transition-all duration-300 shadow-[0_4px_25px_rgba(232,117,160,0.25)] hover:shadow-[0_4px_35px_rgba(232,117,160,0.45)] active:scale-95 flex items-center gap-3"
          >
            <span>Explore Work</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenContact}
            className="px-6 py-3.5 text-xs tracking-[0.2em] uppercase font-medium text-[#F8DCE8] hover:text-white border border-[#F2A9C2]/20 hover:border-[#E875A0]/60 rounded bg-[#240D18]/50 hover:bg-[#3A1425]/70 transition-all duration-300"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Bottom Bar with Scroll Indicator */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between pt-6 border-t border-[#F2A9C2]/10 gap-4">
        <div className="flex items-center gap-2.5 text-xs tracking-[0.2em] uppercase text-[#F8DCE8]/60">
          <Code2 className="w-3.5 h-3.5 text-[#E875A0]" />
          <span>Full-Stack Development & AI Systems</span>
        </div>

        {/* Scroll indicator */}
        <a
          href="#about"
          className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#F2A9C2]/70 hover:text-[#FFF8FA] transition-colors group cursor-pointer"
        >
          <span>Scroll to explore</span>
          <div className="w-7 h-11 rounded-full border border-[#E875A0]/40 flex items-start justify-center p-1.5 group-hover:border-[#E875A0]">
            <div className="w-1 h-2 rounded-full bg-[#E875A0] animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
};
