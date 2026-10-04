import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Philosophy: React.FC = () => {
  const { philosophy } = PORTFOLIO_DATA;

  return (
    <section
      id="philosophy"
      className="relative py-36 md:py-48 px-6 md:px-12 z-10"
    >
      <div className="max-w-4xl mx-auto">
        {/* Chapter Index */}
        <div className="flex items-center justify-center gap-3 text-xs tracking-[0.35em] uppercase text-[#E875A0] mb-14 font-medium">
          <span className="w-8 h-[1px] bg-[#E875A0]/40" />
          <span>Values</span>
          <span className="w-8 h-[1px] bg-[#E875A0]/40" />
        </div>

        {/* Primary Statement */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-[#FFF8FA] tracking-tight leading-[1.05] text-balance">
            "{philosophy.primaryStatement}"
          </h2>
        </div>

        {/* Supporting Statements */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-24 md:mb-32">
          <p className="font-display text-2xl sm:text-3xl text-[#F2A9C2] font-light italic leading-snug">
            "{philosophy.expandedStatement[0]}"
          </p>
          <p className="font-display text-2xl sm:text-3xl text-[#FFF8FA] font-light italic leading-snug">
            "{philosophy.expandedStatement[1]}"
          </p>
        </div>

        {/* 3 Grounded Principles */}

        <div className="max-w-3xl mx-auto space-y-12 border-t border-[#F2A9C2]/15 pt-12">
          {philosophy.principles.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-baseline"
            >
              <div className="md:col-span-4">
                <span className="text-[11px] font-mono tracking-[0.25em] text-[#E875A0] block mb-1">
                  0{idx + 1}
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-white font-normal">
                  {pillar.title}
                </h3>
              </div>
              <div className="md:col-span-8">
                <p className="text-sm sm:text-base text-[#F8DCE8]/80 font-light leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
