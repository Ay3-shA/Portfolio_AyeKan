import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Lab: React.FC = () => {
  const { labExperiments } = PORTFOLIO_DATA;
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Interactive Sandbox state: Latent Bloom Parametric Synthesizer
  const [petals, setPetals] = useState<number>(7);
  const [resonance, setResonance] = useState<number>(65);
  const [dispersion, setDispersion] = useState<number>(45);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const categories = [
    'All',
    'AI experiments',
    'UI experiments',
    'Creative coding',
    'Interaction experiments',
  ];

  const filteredExperiments =
    activeCategory === 'All'
      ? labExperiments
      : labExperiments.filter((exp) => exp.category === activeCategory);

  // Live Canvas render for the Latent Bloom parametric sandbox
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let localPhase = 0;

    const renderBloom = () => {
      localPhase += 0.008;
      const w = (canvas.width = 360);
      const h = (canvas.height = 360);
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Dark background radial
      const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 170);
      bgGrad.addColorStop(0, 'rgba(101, 31, 59, 0.35)');
      bgGrad.addColorStop(1, 'rgba(36, 13, 24, 0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      const maxR = 120 * (resonance / 100);

      // Draw multi-layered parametric petals
      const layers = 3;
      for (let l = 1; l <= layers; l++) {
        const layerR = (maxR / layers) * l;
        const layerAlpha = 0.3 + (l / layers) * 0.4;

        ctx.beginPath();
        for (let theta = 0; theta <= Math.PI * 2; theta += 0.015) {
          const k = petals;
          const r =
            layerR *
            (Math.cos(k * theta + localPhase) * (dispersion / 60) + 0.6);
          const x = cx + r * Math.cos(theta);
          const y = cy + r * Math.sin(theta);

          if (theta === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(232, 117, 160, ${layerAlpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.fillStyle = `rgba(157, 49, 92, ${0.08 * (l / layers)})`;
        ctx.fill();
      }

      // Draw center synaptic pulse
      ctx.beginPath();
      ctx.arc(cx, cy, 4 + Math.sin(localPhase * 3) * 2, 0, Math.PI * 2);
      ctx.fillStyle = '#FFF8FA';
      ctx.shadowColor = '#E875A0';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(renderBloom);
    };

    renderBloom();

    return () => cancelAnimationFrame(animId);
  }, [petals, resonance, dispersion]);

  return (
    <section id="lab" className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto z-10">
      {/* Chapter Index */}
      <div className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-[#E875A0] mb-8 font-medium">
        <span>04</span>
        <span className="w-8 h-[1px] bg-[#E875A0]/40" />
        <span>AYEKAN / LAB · Experiments & Prototypes</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#F2A9C2]/15 gap-6">
        <div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-[#FFF8FA] tracking-tight">
            AYEKAN / LAB
          </h2>
          <p className="mt-3 text-base text-[#F2A9C2] font-display italic">
            Small interactive experiments, code sketches, and ideas I'm exploring.
          </p>
        </div>

        {/* Category selector */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-[#3A1425]/60 rounded-xl border border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#9D315C] text-white shadow-sm'
                  : 'text-[#F8DCE8]/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Lab Sandbox & Experiments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Parametric Sandbox */}
        <div className="lg:col-span-6 bg-[#2B0E1E] border border-[#E875A0]/25 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between pb-4 border-b border-[#F2A9C2]/15 relative z-10">
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#E875A0] font-medium">
              <Terminal className="w-3.5 h-3.5" />
              <span>Canvas Demo // Parametric Bloom</span>
            </div>
            <button
              onClick={() => {
                setPetals(Math.floor(Math.random() * 12) + 4);
                setResonance(Math.floor(Math.random() * 50) + 40);
                setDispersion(Math.floor(Math.random() * 60) + 20);
              }}
              className="flex items-center gap-1.5 text-[11px] text-[#F8DCE8]/70 hover:text-white transition-colors"
              title="Randomize parameters"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Randomize</span>
            </button>
          </div>

          {/* Canvas visualization */}
          <div className="flex justify-center my-6 relative z-10">
            <div className="relative rounded-2xl border border-white/5 bg-[#240D18]/90 p-2 shadow-inner">
              <canvas
                ref={canvasRef}
                width={360}
                height={360}
                className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] max-w-full"
              />
              <div className="absolute bottom-3 left-4 text-[10px] uppercase tracking-widest text-[#F2A9C2]/50 font-mono">
                {petals} Petals · {resonance}% Resonance
              </div>
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="space-y-4 pt-4 border-t border-[#F2A9C2]/15 relative z-10">
            <div>
              <div className="flex justify-between text-xs text-[#F8DCE8] mb-1 font-light">
                <span>Petal Count</span>
                <span className="font-mono text-[#E875A0]">{petals}</span>
              </div>
              <input
                type="range"
                min={3}
                max={18}
                value={petals}
                onChange={(e) => setPetals(Number(e.target.value))}
                className="w-full accent-[#E875A0] bg-[#3A1425] h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#F8DCE8] mb-1 font-light">
                <span>Resonance</span>
                <span className="font-mono text-[#E875A0]">{resonance}%</span>
              </div>
              <input
                type="range"
                min={20}
                max={100}
                value={resonance}
                onChange={(e) => setResonance(Number(e.target.value))}
                className="w-full accent-[#E875A0] bg-[#3A1425] h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#F8DCE8] mb-1 font-light">
                <span>Dispersion</span>
                <span className="font-mono text-[#E875A0]">{dispersion}°</span>
              </div>
              <input
                type="range"
                min={10}
                max={90}
                value={dispersion}
                onChange={(e) => setDispersion(Number(e.target.value))}
                className="w-full accent-[#E875A0] bg-[#3A1425] h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Lab Directory */}
        <div className="lg:col-span-6 space-y-4">
          {filteredExperiments.map((exp) => (
            <div
              key={exp.id}
              className="p-6 rounded-2xl bg-[#3A1425]/30 hover:bg-[#3A1425]/60 border border-[#F2A9C2]/15 hover:border-[#E875A0]/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between text-xs text-[#E875A0] mb-2 font-medium">
                <span className="tracking-[0.2em] uppercase">{exp.category}</span>
                <div className="flex items-center gap-2 text-[#F2A9C2]/70 font-light">
                  <span>{exp.year}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-[10px]">{exp.status}</span>
                </div>
              </div>

              <h3 className="font-display text-2xl text-white font-light mb-2">
                {exp.title}
              </h3>

              <p className="text-sm text-[#F8DCE8]/80 font-light leading-relaxed">
                {exp.summary}
              </p>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-[#F2A9C2]/60 font-light">Personal Experiment</span>
                <span className="text-[#E875A0] font-medium tracking-wider">Active Sandbox</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
