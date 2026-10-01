import React from 'react';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface FinalCTAProps {
  onOpenContact: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenContact }) => {
  const { profile } = PORTFOLIO_DATA;

  return (
    <footer id="contact" className="relative pt-28 pb-16 px-6 md:px-12 max-w-7xl mx-auto z-10 select-none">
      {/* Top Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#E875A0]/40 to-transparent mb-20" />

      {/* Main Closing Section */}
      <div className="text-center max-w-3xl mx-auto mb-24">
        <div className="mb-3">
          <span className="text-xs tracking-[0.4em] uppercase text-[#E875A0] font-medium block">
            {profile.brand}
          </span>
        </div>

        <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-[#FFF8FA] tracking-tight leading-tight mb-4">
          Let's build something.
        </h2>

        <p className="font-display text-2xl sm:text-3xl text-[#F2A9C2] font-light italic mb-10">
          "Software, AI, or something we haven't imagined yet."
        </p>

        {/* Large CTA Button */}
        <div>
          <button
            onClick={onOpenContact}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-12 sm:py-5 rounded-full text-sm tracking-[0.25em] uppercase font-semibold text-white bg-gradient-to-r from-[#651F3B] via-[#9D315C] to-[#E875A0] hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(232,117,160,0.35)] hover:shadow-[0_0_60px_rgba(232,117,160,0.6)] border border-white/20"
          >
            <span>SAY HELLO</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Minimal Clean Footer */}
      <div className="pt-12 border-t border-[#F2A9C2]/15 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#F8DCE8]/70 font-light">
        {/* Left: Brand & Title */}
        <div className="flex items-center gap-3 tracking-[0.15em] uppercase">
          <span className="font-display text-lg text-white font-normal tracking-[0.2em]">AYEKAN</span>
          <span className="text-[#E875A0]" aria-hidden="true">·</span>
          <span>Ayesha Kanwal</span>
          <span className="text-[#E875A0]" aria-hidden="true">·</span>
          <span className="text-[#F2A9C2]/80">Software & AI Engineer</span>
        </div>

        {/* Center: Social links */}
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#E875A0]" />
            <span>{profile.email}</span>
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Github className="w-3.5 h-3.5 text-[#E875A0]" />
            <span>GitHub</span>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5 text-[#E875A0]" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Right: Copyright */}
        <div className="tracking-wider uppercase text-[#F2A9C2]/60 text-[11px]">
          © 2026 Ayesha Kanwal
        </div>
      </div>
    </footer>
  );
};
