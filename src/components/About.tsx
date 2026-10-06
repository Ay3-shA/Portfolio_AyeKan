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
    <section id="about" className="relative py-28 md:py-36 px-6 md:px-12 w-full z-10">
      {/* Chapter Index */}
      <div className="flex items-center gap-4 text-lg tracking-[0.3em] uppercase text-[#E875A0] mb-8 font-medium">
        <span className="w-12 h-[2px] bg-[#E875A0]/50" />
        <span>About</span>
        <span className="w-12 h-[2px] bg-[#E875A0]/50" />
      </div>
      
      {/* Primary Narrative */}
      <div className="w-full">
        <div className="space-y-4 text-[#F8DCE8]/85 text-base sm:text-lg font-light leading-relaxed">
          <p>
            I work across software engineering, artificial intelligence, and modern web development. I enjoy the full journey of building products — from understanding a problem and designing an intuitive interface to structuring the backend APIs and shipping clean code.
          </p>

          <p>
            I like understanding how things work and then building them. To me, solid engineering and good user experience belong together. Whether I am developing a frontend with React and TypeScript, building backend endpoints in Python, or integrating modern AI models, my focus is always on building things that are reliable, well-crafted, and genuinely useful.
          </p>
        </div>
      </div>

      {/* Areas I Work Across — Full Width */}
      <div className="mt-14 pt-8 border-t border-[#F2A9C2]/15">
        <h3 className="text-base tracking-[0.25em] uppercase text-[#E875A0] mb-8 font-medium leading-none">
          Areas I Work Across
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {focusAreas.map((area) => (
            <div
              key={area.title}
              className="p-6 rounded-xl bg-[#3A1425]/30 border border-[#F2A9C2]/10"
            >
              <h4 className="text-xl sm:text-2xl font-medium text-white mb-3">
                {area.title}
              </h4>

              <p className="text-sm sm:text-base text-[#F8DCE8]/70 font-light leading-relaxed">
                {area.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
