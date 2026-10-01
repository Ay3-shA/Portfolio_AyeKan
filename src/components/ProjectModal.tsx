import React, { useEffect } from 'react';
import { X, ExternalLink, Github } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#240D18]/90 backdrop-blur-xl animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#2E0F1F] border border-[#E875A0]/25 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] z-10 text-[#FFF8FA] p-6 sm:p-10">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-[#F2A9C2]/15">
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#E875A0] font-medium">
            <span>Project {project.number}</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#F8DCE8]/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E875A0]"
            aria-label="Close project modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Hero Area */}
        <div className="mt-8 space-y-3">
          <h2 id="modal-project-title" className="font-display text-4xl sm:text-5xl font-light text-white leading-tight">
            {project.title}
          </h2>
          <p className="font-display text-xl sm:text-2xl italic text-[#F2A9C2] font-light">
            {project.subtitle}
          </p>
        </div>

        {/* Visual Media */}
        <div className="my-8 rounded-xl overflow-hidden border border-[#E875A0]/20 bg-black/40 shadow-2xl relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full aspect-[16/9] object-cover object-center"
          />
          <div className="absolute bottom-4 right-4 bg-[#240D18]/85 backdrop-blur-md px-3 py-1.5 rounded text-[11px] tracking-wider uppercase text-[#F8DCE8] border border-white/10">
            {project.year} · Project Overview
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
          {/* Main Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="text-xs tracking-[0.25em] uppercase text-[#E875A0] mb-2 font-medium">
                About the Project
              </h3>
              <p className="text-base text-[#F8DCE8]/90 font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            <div>
              <h3 className="text-xs tracking-[0.25em] uppercase text-[#E875A0] mb-2 font-medium">
                What I Built
              </h3>
              <p className="text-sm text-[#F8DCE8]/80 font-light leading-relaxed">
                {project.whatIBuilt}
              </p>
            </div>

            <div>
              <h3 className="text-xs tracking-[0.25em] uppercase text-[#E875A0] mb-2 font-medium">
                Key Details
              </h3>
              <ul className="space-y-2 text-sm text-[#F8DCE8]/80 font-light">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E875A0] mt-2 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Meta */}
          <div className="lg:col-span-5 space-y-6 lg:pl-6 lg:border-l lg:border-[#F2A9C2]/15">
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-[#E875A0] block mb-1 font-medium">
                My Role
              </span>
              <p className="text-sm text-white font-light">{project.role}</p>
            </div>

            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-[#E875A0] block mb-2 font-medium">
                Technologies Used
              </span>
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-[#F8DCE8]/90 font-light">
                {project.technologies.map((tech, i) => (
                  <React.Fragment key={tech}>
                    <span>{tech}</span>
                    {i < project.technologies.length - 1 && (
                      <span className="text-[#E875A0]/60" aria-hidden="true">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href={project.demoUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 text-xs tracking-[0.2em] uppercase font-medium text-white bg-[#9D315C] hover:bg-[#E875A0] rounded text-center transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Live Preview</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={project.githubUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 text-xs tracking-[0.2em] uppercase font-medium text-[#F8DCE8] hover:text-white border border-[#F2A9C2]/20 hover:border-[#E875A0] rounded text-center transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>View Source Code</span>
                <Github className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
