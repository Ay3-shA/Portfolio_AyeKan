import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Journey: React.FC = () => {
  const { journeyStages } = PORTFOLIO_DATA;

  return (
    <section id="journey" className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto z-10">
      {/* Chapter Index */}
      <div className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-[#E875A0] mb-8 font-medium">
        <span>05</span>
        <span className="w-8 h-[1px] bg-[#E875A0]/40" />
        <span>Journey / Evolution</span>
      </div>

      <div className="max-w-3xl mb-16">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-[#FFF8FA] tracking-tight">
          How I've Grown
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#F8DCE8]/75 font-light leading-relaxed">
          A roadmap of what I have learned, built, and continue to explore as a software and AI engineer.
        </p>
      </div>

      {/* Vertical Timeline Structure */}
      <div className="relative border-l border-[#E875A0]/20 ml-4 md:ml-10 pl-8 md:pl-14 space-y-16">
        {journeyStages.map((stage) => {
          return (
            <div key={stage.stage} className="relative group">
              {/* Timeline Node */}
              <div className="absolute -left-[41px] md:-left-[65px] top-1.5 w-5 h-5 rounded-full bg-[#240D18] border border-[#E875A0] flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-[0_0_15px_rgba(232,117,160,0.4)]">
                <div className="w-2 h-2 rounded-full bg-[#E875A0] group-hover:bg-white transition-colors" />
              </div>

              {/* Stage Block */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-medium">
                  <span className="text-[#E875A0] font-mono">{stage.stage}</span>
                  <span className="text-[#F2A9C2]/40" aria-hidden="true">·</span>
                  <span className="text-[#F2A9C2]/70 font-light">{stage.period}</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-light text-white leading-tight">
                  {stage.headline}
                </h3>

                <p className="text-sm sm:text-base text-[#F8DCE8]/80 font-light leading-relaxed max-w-2xl">
                  {stage.narrative}
                </p>

                {/* Focus Points */}
                <div className="pt-2">
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#F8DCE8]/70 font-light max-w-xl">
                    {stage.focusAreas.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E875A0]/70 mt-1.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
