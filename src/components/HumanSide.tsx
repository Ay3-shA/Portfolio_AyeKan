import { NeuralBloom } from './NeuralBloom';
import React, { useState } from 'react';
import { Headphones, Compass, Camera, Palette, Coffee, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA, HobbyStory } from '../data/portfolioData';
import { HobbyModal } from './HobbyModal';

export const HumanSide: React.FC = () => {
  const { hobbyStories } = PORTFOLIO_DATA;
  const [selectedHobby, setSelectedHobby] = useState<HobbyStory | null>(null);

  const getHobbyIcon = (id: string) => {
    switch (id) {
      case 'music':
        return <Headphones className="w-5 h-5 text-[#E875A0]" />;
      case 'travel':
        return <Compass className="w-5 h-5 text-[#E875A0]" />;
      case 'photography':
        return <Camera className="w-5 h-5 text-[#E875A0]" />;
      case 'design':
        return <Palette className="w-5 h-5 text-[#E875A0]" />;
      case 'coffee':
        return <Coffee className="w-5 h-5 text-[#E875A0]" />;
      default:
        return <Compass className="w-5 h-5 text-[#E875A0]" />;
    }
  };

  return (
    <section
      id="outside"
      className="relative py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto z-10"
    >
      {/* Chapter Index */}
      <div className="flex items-center gap-4 text-lg tracking-[0.3em] uppercase text-[#E875A0] mb-8 font-medium">
        <span className="w-12 h-[2px] bg-[#E875A0]/50" />
        <span>Outside</span>
        <span className="w-12 h-[2px] bg-[#E875A0]/50" />
      </div>

      {/* Clean, Simple Section Header */}
      <div className="w-full mb-14 md:mb-16">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-[#FFF8FA] tracking-tight">
          Outside the Code
        </h2>
        <p className="mt-3 text-2xl text-[#F2A9C2] font-display italic">
          "Things I enjoy when I'm not building software."
        </p>
        <p className="mt-2 text-base text-[#F8DCE8]/75 font-light leading-relaxed">
          Because there is more to any person than their terminal. Click on an interest to view a short note and photographs.
        </p>
      </div>

      {/* Clean, Elegant Hobbies Grid (NO giant photos directly on the page!) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {hobbyStories.map((hobby, idx) => (
          <button
            key={hobby.id}
            onClick={() => setSelectedHobby(hobby)}
            className="group relative p-6 rounded-2xl bg-[#3A1425]/30 hover:bg-[#3A1425]/60 border border-[#F2A9C2]/15 hover:border-[#E875A0]/50 text-left transition-all duration-300 flex flex-col justify-between h-48 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E875A0]"
          >
            {/* Top row: Icon */}
            <div className="flex items-center justify-between w-full">
              <div className="p-2.5 rounded-xl bg-[#240D18]/80 border border-white/5 group-hover:scale-105 transition-transform">
                {getHobbyIcon(hobby.id)}
              </div>
            </div>

            {/* Middle: Title & One-Liner */}
            <div className="my-auto">
              <h3 className="font-display text-2xl text-white font-normal group-hover:text-[#F8DCE8] transition-colors">
                {hobby.title}
              </h3>
              <p className="text-sm text-[#F8DCE8]/70 font-light mt-1.5 line-clamp-2 leading-relaxed">
                {hobby.oneLiner}
              </p>
            </div>

            {/* Bottom: Subtle "View Photos" prompt */}
            <div className="relative pt-3 text-[11px] tracking-wider uppercase text-[#E875A0] font-medium">
              <div className="absolute left-0 right-0 top-1 border-t border-white/5" />
              <div className="flex items-center justify-between">
                <span>View Photos & Note</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Full-Screen Overlay Modal for Selected Hobby */}
      <HobbyModal
        hobby={selectedHobby}
        onClose={() => setSelectedHobby(null)}
      />

      <NeuralBloom />
    </section>
  );
};
