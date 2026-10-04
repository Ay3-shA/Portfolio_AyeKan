
import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw, Terminal } from 'lucide-react';

type BloomParams = {
  petals: number;
  resonance: number;
  dispersion: number;
};

type ChangedParameter = 'Petals' | 'Resonance' | 'Dispersion';

const drawBloom = (
  canvas: HTMLCanvasElement,
  params: BloomParams,
  phase: number
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = 360;
  const height = 360;

  canvas.width = width;
  canvas.height = height;

  const centerX = width / 2;
  const centerY = height / 2;

  ctx.clearRect(0, 0, width, height);

  ctx.save();
  ctx.translate(centerX, centerY);

  // Dark radial background
  const bgGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 170);
  bgGrad.addColorStop(0, 'rgba(101, 31, 59, 0.35)');
  bgGrad.addColorStop(1, 'rgba(36, 13, 24, 0)');

  ctx.fillStyle = bgGrad;
  ctx.fillRect(-180, -180, 360, 360);

  const maxR = 120 * (params.resonance / 100);

  // Multi-layered parametric petals
  const layers = 3;

  for (let l = 1; l <= layers; l++) {
    const layerR = (maxR / layers) * l;
    const layerAlpha = 0.3 + (l / layers) * 0.4;

    ctx.beginPath();

    for (
      let theta = 0;
      theta <= Math.PI * 2;
      theta += 0.015
    ) {
      const k = params.petals;

      const r =
        layerR *
        (Math.cos(k * theta + phase) *
          (params.dispersion / 60) +
          0.6);

      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);

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

    ctx.fillStyle = `rgba(157, 49, 92, ${
      0.08 * (l / layers)
    })`;
    ctx.fill();
  }

  // Center synaptic pulse
  const pulseRadius = 4 + Math.sin(phase * 3) * 2;

  ctx.beginPath();
  ctx.arc(0, 0, pulseRadius, 0, Math.PI * 2);

  ctx.fillStyle = '#FFF8FA';
  ctx.shadowColor = '#E875A0';
  ctx.shadowBlur = 12;

  ctx.fill();

  ctx.shadowBlur = 0;

  ctx.restore();
};

const randomBloomParams = (): BloomParams => ({
  petals: Math.floor(Math.random() * 12) + 4,
  resonance: Math.floor(Math.random() * 50) + 40,
  dispersion: Math.floor(Math.random() * 60) + 20,
});

const createChallenge = () => {
  const original = randomBloomParams();

  const changedParameterIndex = Math.floor(
    Math.random() * 3
  );

  const mutated = { ...original };

  if (changedParameterIndex === 0) {
    let nextPetals =
      Math.floor(Math.random() * 12) + 4;

    while (nextPetals === original.petals) {
      nextPetals =
        Math.floor(Math.random() * 12) + 4;
    }

    mutated.petals = nextPetals;
  }

  if (changedParameterIndex === 1) {
    let nextResonance =
      Math.floor(Math.random() * 50) + 40;

    while (nextResonance === original.resonance) {
      nextResonance =
        Math.floor(Math.random() * 50) + 40;
    }

    mutated.resonance = nextResonance;
  }

  if (changedParameterIndex === 2) {
    let nextDispersion =
      Math.floor(Math.random() * 60) + 20;

    while (nextDispersion === original.dispersion) {
      nextDispersion =
        Math.floor(Math.random() * 60) + 20;
    }

    mutated.dispersion = nextDispersion;
  }

  const changedParameter: ChangedParameter =
    changedParameterIndex === 0
      ? 'Petals'
      : changedParameterIndex === 1
        ? 'Resonance'
        : 'Dispersion';

  return {
    original,
    mutated,
    changedParameter,
  };
};

export const NeuralBloom: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalCanvasRef =
    useRef<HTMLCanvasElement>(null);
  const mutatedCanvasRef =
    useRef<HTMLCanvasElement>(null);

  const [petals, setPetals] = useState(7);
  const [resonance, setResonance] = useState(65);
  const [dispersion, setDispersion] = useState(45);

  const [original, setOriginal] =
    useState<BloomParams>({
      petals: 7,
      resonance: 65,
      dispersion: 45,
    });

  const [mutated, setMutated] =
    useState<BloomParams>({
      petals: 7,
      resonance: 65,
      dispersion: 45,
    });

  const [changedParameter, setChangedParameter] =
    useState<ChangedParameter>('Petals');

  const [selectedAnswer, setSelectedAnswer] =
    useState<ChangedParameter | null>(null);

  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);

  const [phase, setPhase] = useState(0);

  /*
   * LIVE PARAMETRIC BLOOM
   *
   * This keeps the exact bloom behavior from
   * the original Neural Bloom component.
   */
  useEffect(() => {
    let animationFrame: number;
    let localPhase = 0;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const animate = () => {
      localPhase += 0.008;

      setPhase(localPhase);

      drawBloom(
        canvas,
        {
          petals,
          resonance,
          dispersion,
        },
        localPhase
      );

      animationFrame =
        requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [petals, resonance, dispersion]);

  /*
   * ORIGINAL + MUTATED BLOOMS
   *
   * Both challenge canvases use the exact
   * same renderer as the main bloom.
   */
  useEffect(() => {
    if (originalCanvasRef.current) {
      drawBloom(
        originalCanvasRef.current,
        original,
        phase
      );
    }

    if (mutatedCanvasRef.current) {
      drawBloom(
        mutatedCanvasRef.current,
        mutated,
        phase
      );
    }
  }, [original, mutated, phase]);

  const randomizeBloom = () => {
    setPetals(Math.floor(Math.random() * 12) + 4);
    setResonance(Math.floor(Math.random() * 50) + 40);
    setDispersion(Math.floor(Math.random() * 60) + 20);
  };

  const startChallenge = () => {
    const challenge = createChallenge();

    setOriginal(challenge.original);
    setMutated(challenge.mutated);
    setChangedParameter(
      challenge.changedParameter
    );

    setSelectedAnswer(null);
    setRound((current) => current + 1);
  };

  const handleAnswer = (
    answer: ChangedParameter
  ) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    if (answer === changedParameter) {
      setScore((current) => current + 1);
    }
  };

  return (
    <section
      id="game"
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto z-10"
    >
      {/* =========================
          CHAPTER HEADER
      ========================== */}

      <div className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-[#E875A0] mb-8 font-medium">
        <span>04</span>

        <span className="w-8 h-[1px] bg-[#E875A0]/40" />

        <span>
          04 / AYEKAN / FOR FUN · Interactive
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#F2A9C2]/15 gap-6">
        <div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-[#FFF8FA] tracking-tight">
            The Odd Corner
          </h2>

          <p className="mt-3 text-3xl text-[#F2A9C2] font-display italic">
            A little game of patterns, intuition, and curiosity.
          </p>

        </div>
      </div>

      {/* =========================
          MAIN GAME GRID
      ========================== */}

      <div className="grid lg:grid-cols-12 gap-8 items-stretch h-full">

        {/* =========================
            LEFT:
            PARAMETRIC SANDBOX
        ========================== */}

        <div className="lg:col-span-6 h-full bg-[#2B0E1E] border border-[#E875A0]/25 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.5)]">

          {/* Card Header */}

          <div className="flex items-center justify-between pb-4 border-b border-[#F2A9C2]/15 relative z-10">
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#E875A0] font-medium">
              <Terminal className="w-3.5 h-3.5" />

              <span>
                Canvas Demo // Parametric Bloom
              </span>
            </div>

            <button
              onClick={randomizeBloom}
              className="flex items-center gap-1.5 text-[11px] text-[#F8DCE8]/70 hover:text-white transition-colors"
              title="Randomize parameters"
            >
              <RefreshCw className="w-3 h-3" />

              <span>Randomize</span>
            </button>
          </div>

          {/* Canvas Visualization */}

          <div className="flex justify-center my-6 relative z-10">
            <div className="relative rounded-2xl border border-white/5 bg-[#240D18]/90 p-2 shadow-inner">

              <canvas
                ref={canvasRef}
                width={360}
                height={360}
                className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] max-w-full"
              />

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#2B0E1E]/80 border border-white/10 text-[10px] uppercase tracking-widest text-[#F2A9C2]/70 font-mono whitespace-nowrap">
                {petals} Petals · {resonance}% Resonance
              </div>

            </div>
          </div>

          {/* Sliders */}

          <div className="space-y-4 pt-4 border-t border-[#F2A9C2]/15 relative z-10">

            {/* Petals */}

            <div>
              <div className="flex justify-between text-xs text-[#F8DCE8] mb-1 font-light">
                <span>Petal Count</span>

                <span className="font-mono text-[#E875A0]">
                  {petals}
                </span>
              </div>

              <input
                type="range"
                min={3}
                max={18}
                value={petals}
                onChange={(e) =>
                  setPetals(
                    Number(e.target.value)
                  )
                }
                className="w-full accent-[#E875A0] bg-[#3A1425] h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Resonance */}

            <div>
              <div className="flex justify-between text-xs text-[#F8DCE8] mb-1 font-light">
                <span>Resonance</span>

                <span className="font-mono text-[#E875A0]">
                  {resonance}%
                </span>
              </div>

              <input
                type="range"
                min={20}
                max={100}
                value={resonance}
                onChange={(e) =>
                  setResonance(
                    Number(e.target.value)
                  )
                }
                className="w-full accent-[#E875A0] bg-[#3A1425] h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Dispersion */}

            <div>
              <div className="flex justify-between text-xs text-[#F8DCE8] mb-1 font-light">
                <span>Dispersion</span>

                <span className="font-mono text-[#E875A0]">
                  {dispersion}°
                </span>
              </div>

              <input
                type="range"
                min={10}
                max={90}
                value={dispersion}
                onChange={(e) =>
                  setDispersion(
                    Number(e.target.value)
                  )
                }
                className="w-full accent-[#E875A0] bg-[#3A1425] h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

          </div>
        </div>

        
        {/* =========================
            RIGHT:
            PATTERN FORENSICS GAME
        ========================== */}

        <div className="lg:col-span-6 h-fullbg-[#2B0E1E] border border-[#E875A0]/25 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.5)]">

        {/* Game Header */}

        <div className="flex items-center justify-between pb-4 border-b border-[#F2A9C2]/15">

            <div>
                <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#E875A0] font-medium">
                    <Terminal className="w-3.5 h-3.5" />

                    <span>
                    Pattern Forensics
                    </span>
                </div>

                <div className="text-[10px] text-[#F8DCE8]/50 uppercase tracking-wider mt-2">
                    Round {round} · Score {score}
                </div>
                </div>

                <button
                onClick={startChallenge}
                className="px-4 py-2 rounded-lg border border-[#E875A0]/20 text-xs text-[#F8DCE8]/80 hover:bg-[#E875A0]/10 hover:border-[#E875A0]/40 transition-all"
                >
                New Challenge
                </button>

            </div>

            {/* Game Explanation */}

            <div className="mt-6 mb-5">
                <h3 className="text-xl sm:text-2xl font-light text-white">
                Find the hidden change.
                </h3>

                <p className="mt-2 text-sm text-[#F8DCE8]/60 font-light leading-relaxed">
                Two blooms follow the same underlying
                system. One parameter has been altered.
                Can you identify which one?
                </p>
            </div>

            {/* FORENSIC COMPARISON */}

            <div className="rounded-2xl border border-[#F2A9C2]/10 bg-[#240D18]/40 p-4">

                <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#F2A9C2]/40">
                    Spot The Difference
                </span>

                <span className="w-8 h-px bg-[#E875A0]/20" />

                <span className="text-[9px] uppercase tracking-[0.25em] text-[#E875A0]/60">
                    Find The Change
                </span>
                </div>

                <div className="grid grid-cols-2 gap-4">

                {/* Original */}

                <div>
                    <div className="flex items-center justify-between mb-2 px-1">
                    <div className="text-[10px] uppercase tracking-wider text-[#F8DCE8]/50">
                        Original
                    </div>

                    <div className="w-1.5 h-1.5 rounded-full bg-[#F8DCE8]/20" />
                    </div>

                    <div className="relative rounded-xl border border-white/5 bg-[#240D18]/90 p-2 shadow-inner">

                    <canvas
                        ref={originalCanvasRef}
                        width={360}
                        height={360}
                        className="w-full aspect-square block"
                    />

                    </div>
                </div>

                {/* Mutated */}

                <div>
                    <div className="flex items-center justify-between mb-2 px-1">
                    <div className="text-[10px] uppercase tracking-wider text-[#E875A0]/70">
                        Mutated
                    </div>

                    <div className="w-1.5 h-1.5 rounded-full bg-[#E875A0]/70 shadow-[0_0_8px_rgba(232,117,160,0.6)]" />
                    </div>

                    <div className="relative rounded-xl border border-[#E875A0]/10 bg-[#240D18]/90 p-2 shadow-inner">

                    <canvas
                        ref={mutatedCanvasRef}
                        width={360}
                        height={360}
                        className="w-full aspect-square block"
                    />

                    </div>
                </div>

            </div>

        </div>

        {/* Question */}

        <div className="mt-7">

            <div className="text-sm text-white mb-4">
            Which parameter changed?
            </div>

            {/* Answers */}

            <div className="grid grid-cols-3 gap-3">

            {(
                [
                'Petals',
                'Resonance',
                'Dispersion',
                ] as ChangedParameter[]
            ).map((option) => {

                const isSelected =
                selectedAnswer === option;

                const isCorrect =
                selectedAnswer &&
                option === changedParameter;

                return (
                <button
                    key={option}
                    onClick={() =>
                    handleAnswer(option)
                    }
                    disabled={!!selectedAnswer}
                    className={`px-3 py-3 rounded-lg border text-xs transition-all ${
                    isCorrect
                        ? 'border-[#E875A0] bg-[#E875A0]/10 text-white shadow-[0_0_15px_rgba(232,117,160,0.12)]'
                        : isSelected
                        ? 'border-white/20 bg-white/5 text-[#F8DCE8]/60'
                        : 'border-white/10 text-[#F8DCE8]/70 hover:border-[#E875A0]/40 hover:bg-[#E875A0]/5'
                    }`}
                >
                    {option}
                </button>
                );
            })}

            </div>

            {/* Result */}

            {selectedAnswer && (
            <div
                className={`mt-5 p-4 rounded-xl border text-xs leading-relaxed ${
                selectedAnswer === changedParameter
                    ? 'border-[#E875A0]/30 bg-[#E875A0]/5 text-[#F8DCE8]/80'
                    : 'border-white/10 bg-white/[0.02] text-[#F8DCE8]/60'
                }`}
            >
                <div className="font-medium text-white mb-1">
                {selectedAnswer === changedParameter
                    ? 'Correct detection.'
                    : 'Not quite.'}
                </div>

                <div>
                {selectedAnswer === changedParameter
                    ? 'You detected the parameter that changed between the two patterns.'
                    : `The changed parameter was ${changedParameter}. Compare the shape, scale, and spread of the blooms more carefully.`}
                </div>
            </div>
            )}

            {/* Initial instruction */}

            {round === 0 && (
            <div className="mt-5 p-4 rounded-xl border border-white/5 bg-white/[0.02] text-xs text-[#F8DCE8]/50 leading-relaxed">
                Start a challenge and compare the two
                blooms carefully. The difference may be
                subtle.
            </div>
            )}

        </div>

        </div>
      </div>

      {/* =========================
          SMALL FOOTER NOTE
      ========================== */}

      <div className="mt-8 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#F2A9C2]/40">
        <span>
          Pattern spotting · Visual intuition
        </span>

        <span>
          Neural Bloom / 04
        </span>
      </div>

    </section>
  );
};