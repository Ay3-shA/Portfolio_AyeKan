import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto z-10">
      {/* Chapter Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-28 pb-8 border-b border-[#F2A9C2]/15 gap-6">
        <div>
          <div className="flex items-center gap-4 text-lg tracking-[0.3em] uppercase text-[#E875A0] mb-8 font-medium">
            <span className="w-12 h-[2px] bg-[#E875A0]/50" />
            <span>WORK</span>
            <span className="w-12 h-[2px] bg-[#E875A0]/50" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-[#FFF8FA] tracking-tight">
            Featured Projects
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#F8DCE8]/75 font-light leading-relaxed">
            A selection of projects exploring web development, conversational AI, and interactive frontend interfaces.
          </p>
        </div>
        
      </div>

      {/* Cinematic Showcase Panels */}
      <div className="space-y-32 md:space-y-44">
        {projects.map((project, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <React.Fragment key={project.id}>
              <article className="relative group transition-all duration-700">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-14 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Visual Area */}
                  <div
                    className={`lg:col-span-7 relative ${
                      isEven ? 'order-1' : 'order-1 lg:order-2'
                    }`}
                  >
                    <div
                      data-cursor="view"
                      onClick={() => setSelectedProject(project)}
                      className="cursor-pointer relative overflow-hidden rounded-2xl border border-[#E875A0]/20 bg-[#3A1425]/40 shadow-[0_20px_60px_rgba(36,13,24,0.7)] group-hover:border-[#E875A0]/60 transition-all duration-700"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full aspect-[16/10] sm:aspect-[16/9] object-cover object-center grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#240D18]/90 via-[#240D18]/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500" />

                      <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#240D18]/85 backdrop-blur-md border border-white/10 text-[11px] tracking-widest uppercase text-[#F8DCE8]">
                        <span>{project.year}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.category}</span>
                      </div>

                      <div className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full bg-[#E875A0] text-white text-xs tracking-widest uppercase font-medium shadow-[0_4px_20px_rgba(232,117,160,0.5)] opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span>VIEW PROJECT</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Narrative Column */}
                  <div
                    className={`lg:col-span-5 flex flex-col justify-center space-y-6 ${
                      isEven ? 'order-2 lg:pl-4' : 'order-2 lg:order-1 lg:pr-4'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-display text-4xl sm:text-5xl font-light text-[#E875A0]/80">
                        {project.number}
                      </span>
                      <span className="w-12 h-[1px] bg-[#E875A0]/30" />
                      <span className="text-xs tracking-[0.25em] uppercase text-[#F2A9C2]/80 font-medium">
                        Project Overview
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-[#FFF8FA] leading-tight group-hover:text-[#F8DCE8] transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-2 font-display text-2xl italic text-[#F2A9C2] font-light">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-[#F8DCE8]/80 font-light leading-relaxed">
                      {project.description}
                    </p>

                    {/* Realistic Technologies */}
                    <div className="pt-2">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#F2A9C2]/90 font-light">
                        {project.technologies.map((tech, i) => (
                          <React.Fragment key={tech}>
                            <span className="hover:text-white transition-colors">{tech}</span>
                            {i < project.technologies.length - 1 && (
                              <span className="text-[#E875A0]/40" aria-hidden="true">
                                ·
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-medium text-white hover:text-[#E875A0] py-2 group/btn transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E875A0]"
                      >
                        <span className="border-b border-[#E875A0]/50 pb-0.5 group-hover/btn:border-[#E875A0]">
                          Read Project Details
                        </span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>

            </React.Fragment>
          );
        })}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
