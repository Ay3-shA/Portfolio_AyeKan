import React, { useState } from 'react';
import { PORTFOLIO_DATA, MindNode } from '../data/portfolioData';

export const MindMap: React.FC = () => {
  const { mindNodes } = PORTFOLIO_DATA;
  const [activeNode, setActiveNode] = useState<MindNode | null>(mindNodes[0]);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const cx = 300;
  const cy = 300;

  const getNodeCoords = (node: MindNode) => {
    const rad = (node.angle * Math.PI) / 180;
    return {
      x: cx + Math.cos(rad) * node.distance,
      y: cy + Math.sin(rad) * node.distance,
    };
  };

  const currentNode = activeNode || mindNodes[0];

  return (
    <section id="mind" className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto z-10">
      {/* Chapter Index */}
      <div className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-[#E875A0] mb-8 font-medium">
        <span className="w-8 h-[1px] bg-[#E875A0]/40" />
        <span>Skills</span>
        <span className="w-8 h-[1px] bg-[#E875A0]/40" />
      </div>

      <div className="w-full max-w-none">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-[#FFF8FA] tracking-tight">
          How I Think & Build
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#F8DCE8]/75 font-light leading-relaxed">
          I work across software engineering, artificial intelligence, and frontend design. Select any area to see the tools and practices I use.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Desktop View: Constellation Canvas */}
        <div className="hidden sm:flex lg:col-span-7 flex-col items-center justify-center">
          <div className="relative w-full max-w-[560px] aspect-square flex items-center justify-center select-none">
            <svg
              viewBox="0 0 600 600"
              className="w-full h-full overflow-visible drop-shadow-[0_0_35px_rgba(232,117,160,0.12)]"
            >
              <defs>
                <radialGradient id="mindCenterGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#E875A0" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#9D315C" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#240D18" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Concentric faint orbital rings */}
              <circle cx={cx} cy={cy} r={120} fill="none" stroke="rgba(242, 169, 194, 0.08)" strokeDasharray="3 3" />
              <circle cx={cx} cy={cy} r={200} fill="none" stroke="rgba(242, 169, 194, 0.06)" />

              {/* Inter-node filaments */}
              {mindNodes.map((n1, i) => {
                const c1 = getNodeCoords(n1);
                const n2 = mindNodes[(i + 1) % mindNodes.length];
                const c2 = getNodeCoords(n2);
                const isN1Active = activeNode?.id === n1.id || hoveredNodeId === n1.id;
                const isN2Active = activeNode?.id === n2.id || hoveredNodeId === n2.id;
                const isHighlighted = isN1Active || isN2Active;

                return (
                  <path
                    key={`ring-${n1.id}`}
                    d={`M ${c1.x} ${c1.y} Q ${cx} ${cy} ${c2.x} ${c2.y}`}
                    fill="none"
                    stroke={isHighlighted ? '#E875A0' : 'rgba(242, 169, 194, 0.14)'}
                    strokeWidth={isHighlighted ? 1.5 : 0.75}
                    strokeOpacity={isHighlighted ? 0.8 : 0.3}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Radial Spokes from Center to Nodes */}
              {mindNodes.map((node) => {
                const coords = getNodeCoords(node);
                const isCurrent = activeNode?.id === node.id || hoveredNodeId === node.id;

                return (
                  <g key={`spoke-${node.id}`}>
                    <line
                      x1={cx}
                      y1={cy}
                      x2={coords.x}
                      y2={coords.y}
                      stroke={isCurrent ? '#E875A0' : 'rgba(232, 117, 160, 0.2)'}
                      strokeWidth={isCurrent ? 1.8 : 0.8}
                      className="transition-all duration-300"
                    />
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={isCurrent ? 22 : 14}
                      fill={isCurrent ? 'rgba(232, 117, 160, 0.25)' : 'rgba(58, 20, 37, 0.6)'}
                      stroke={isCurrent ? '#E875A0' : 'rgba(242, 169, 194, 0.35)'}
                      strokeWidth={isCurrent ? 1.5 : 1}
                      className="transition-all duration-300"
                    />
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={isCurrent ? 5 : 3}
                      fill={isCurrent ? '#FFF8FA' : '#F2A9C2'}
                      className="transition-all duration-300"
                    />
                  </g>
                );
              })}

              {/* Center AYEKAN Core */}
              <circle
                cx={cx}
                cy={cy}
                r={hoveredNodeId || activeNode ? 68 : 58}
                fill="url(#mindCenterGlow)"
                className="transition-all duration-500 animate-pulse"
              />
              <circle
                cx={cx}
                cy={cy}
                r={44}
                fill="#240D18"
                stroke={hoveredNodeId ? '#FFF8FA' : '#E875A0'}
                strokeWidth={1.5}
                className="transition-colors duration-300"
              />
              <text
                x={cx}
                y={cy + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-display font-light text-base tracking-[0.25em] fill-[#FFF8FA] select-none pointer-events-none"
              >
                AYEKAN
              </text>
            </svg>

            {/* Floating Labels */}
            {mindNodes.map((node) => {
              const coords = getNodeCoords(node);
              const leftPercent = (coords.x / 600) * 100;
              const topPercent = (coords.y / 600) * 100;
              const isSelected = activeNode?.id === node.id;
              const isHovered = hoveredNodeId === node.id;

              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className={`absolute z-20 group px-2.5 py-1 rounded-full text-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E875A0] ${
                    isSelected || isHovered
                      ? 'scale-110 text-white bg-[#651F3B]/95 border border-[#E875A0] shadow-[0_0_20px_rgba(232,117,160,0.5)]'
                      : 'text-[#F8DCE8]/80 hover:text-white bg-[#240D18]/85 border border-[#F2A9C2]/20 hover:border-[#E875A0]/60'
                  }`}
                >
                  <span className="text-[11px] sm:text-xs tracking-wider whitespace-nowrap block font-medium">
                    {node.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile View: Clean Vertical List */}
        <div className="sm:hidden space-y-2">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#E875A0] block font-medium mb-3">
            Select an Area
          </span>
          <div className="grid grid-cols-2 gap-2">
            {mindNodes.map((node) => (
              <button
                key={node.id}
                onClick={() => setActiveNode(node)}
                className={`p-3 rounded-lg text-left text-xs transition-colors border ${
                  activeNode?.id === node.id
                    ? 'bg-[#651F3B] text-white border-[#E875A0]'
                    : 'bg-[#3A1425]/40 text-[#F8DCE8]/80 border-white/5'
                }`}
              >
                <span className="font-medium block">{node.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Node Narrative Plate */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          <div className="border border-[#E875A0]/25 bg-[#3A1425]/30 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden transition-all duration-500">
            <div className="flex items-center justify-between text-xs tracking-[0.25em] uppercase text-[#E875A0] font-medium mb-3">
              <span>Engineering Area</span>
              <span className="font-mono text-[10px] text-[#F2A9C2]/60">{currentNode.category.toUpperCase()}</span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl text-[#FFF8FA] font-light mb-4">
              {currentNode.label}
            </h3>

            <p className="text-base text-[#F8DCE8]/90 font-light leading-relaxed mb-6">
              {currentNode.description}
            </p>

            {/* Unboxed Tools & Technologies */}
            <div className="pt-4 border-t border-[#F2A9C2]/15">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#E875A0]/90 block mb-2 font-medium">
                Tools & Technologies
              </span>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#FFF8FA]/90 font-light">
                {currentNode.tools.map((tool, i) => (
                  <React.Fragment key={tool}>
                    <span>{tool}</span>
                    {i < currentNode.tools.length - 1 && (
                      <span className="text-[#E875A0]/50" aria-hidden="true">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
