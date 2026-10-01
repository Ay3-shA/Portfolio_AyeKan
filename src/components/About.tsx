import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const About: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;

  const focusAreas = [
    { title: 'Software Development', desc: 'Writing clean, maintainable code with TypeScript, Python, and modern engineering practices.' },
    { title: 'AI & Machine Learning', desc: 'Integrating LLM APIs, building retrieval systems (RAG), and exploring generative models.' },
    { title: 'Frontend Development', desc: 'Crafting responsive, accessible, and fast web experiences with React and Tailwind CSS.' },
    { title: 'Backend Systems & APIs', desc: 'Structuring RESTful services, server logic, and clean data contracts using FastAPI and Node.js.' },
    { title: 'Problem Solving', desc: 'Breaking down complex challenges into step-by-step, testable, and dependable solutions.' },
    { title: 'Experimentation & Tech', desc: 'Testing new developer tools, frameworks, and AI workflows to see what actually works best.' },
  ];

  return (
    <section id="about" className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto z-10">
      {/* Chapter Index */}
      <div className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-[#E875A0] mb-8 font-medium">
        <span>01</span>
        <span className="w-8 h-[1px] bg-[#E875A0]/40" />
        <span>About / Background</span>
      </div>

      {/* Large Statement */}
      <div className="max-w-4xl mb-14 md:mb-16">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light leading-[1.15] text-[#FFF8FA] text-balance">
          "I'm a software engineer interested in AI, modern web development, and building useful digital products."
        </h2>
      </div>

      {/* Primary Narrative with Small Tasteful Supporting Portrait */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Natural Bio & Focus Areas (9 cols - Primary Focus) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-4 text-[#F8DCE8]/85 text-base sm:text-lg font-light leading-relaxed">
            <p>
              Hi, I'm Ayesha. I work across software engineering, artificial intelligence, and modern web development. I enjoy the full journey of building products — from understanding a problem and designing an intuitive interface to structuring the backend APIs and shipping clean code.
            </p>
            <p>
              I like understanding how things work and then building them. To me, solid engineering and good user experience belong together. Whether I am developing a frontend with React and TypeScript, building backend endpoints in Python, or integrating modern AI models, my focus is always on building things that are reliable, well-crafted, and genuinely useful.
            </p>
          </div>

          {/* Areas I Work Across */}
          <div className="pt-6 border-t border-[#F2A9C2]/15">
            <h3 className="text-xs tracking-[0.25em] uppercase text-[#E875A0] mb-4 font-medium">
              Areas I Work Across
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {focusAreas.map((area) => (
                <div
                  key={area.title}
                  className="p-3.5 rounded-xl bg-[#3A1425]/30 border border-[#F2A9C2]/10"
                >
                  <h4 className="text-sm font-medium text-white mb-1">
                    {area.title}
                  </h4>
                  <p className="text-xs text-[#F8DCE8]/70 font-light leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Small, Tasteful Supporting Profile Photo (4 cols - Supporting Element) */}
        <div className="lg:col-span-4 flex flex-col items-start lg:items-center">
          <div className="w-44 sm:w-48 overflow-hidden rounded-xl border border-[#E875A0]/25 bg-[#3A1425]/40 shadow-lg">
            <img
              src="/src/assets/images/ayesha_portrait_1790880976619.jpg"
              alt="Ayesha Kanwal"
              className="w-full aspect-[4/5] object-cover object-center grayscale-[15%] hover:grayscale-0 transition-all duration-500"
            />
          </div>

          <div className="mt-3 text-left lg:text-center">
            <p className="text-xs font-medium text-white tracking-wide">
              Ayesha Kanwal
            </p>
            <p className="text-[11px] text-[#E875A0] tracking-wider uppercase mt-0.5">
              Software & AI Engineer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
