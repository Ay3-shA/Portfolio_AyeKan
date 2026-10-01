import React, { useState } from 'react';
import { NeuralBackground } from './components/NeuralBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { MindMap } from './components/MindMap';
import { Projects } from './components/Projects';
import { Lab } from './components/Lab';
import { Journey } from './components/Journey';
import { HumanSide } from './components/HumanSide';
import { Philosophy } from './components/Philosophy';
import { FinalCTA } from './components/FinalCTA';
import { ContactModal } from './components/ContactModal';
import { IntroTransition } from './components/IntroTransition';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  const handleExploreWork = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#240D18] text-[#FFF8FA] selection:bg-[#E875A0]/30 selection:text-white overflow-x-hidden font-sans">
      {/* Micro-Intro Sequence (0.8–1.3s on initial page load) */}
      {!isIntroComplete && (
        <IntroTransition onComplete={() => setIsIntroComplete(true)} />
      )}

      {/* Organic Botanical Neural Network Canvas Layer */}
      <NeuralBackground />

      {/* Desktop Contextual Refined Cursor */}
      <CustomCursor />

      {/* Top Floating Navigation */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Structural Flow with Alternating Environments */}
      <main className="relative z-10">
        {/* 1. Cinematic Intro / Hero (Deep Burgundy) */}
        <Hero
          onExploreWork={handleExploreWork}
          onOpenContact={handleOpenContact}
        />

        {/* 2. About / Who Section */}
        <About />

        {/* 3. Interactive "The Mind" Constellation */}
        <MindMap />

        {/* 4. Selected Work (Cinematic Exhibition Panels) */}
        <Projects />

        {/* 5. AYEKAN / LAB (Notebook Research Space) */}
        <Lab />

        {/* 6. Journey (Conceptual Trajectory with Honest Placeholders) */}
        <Journey />

        {/* 7. Outside the Code (Visual Hobby Gallery — Warm Cream/Blush Environment B) */}
        <HumanSide />

        {/* 8. Philosophy (Deep Burgundy / Plum transition) */}
        <Philosophy />

        {/* 9. Final CTA & Closing Synthesis Scene */}
        <FinalCTA onOpenContact={handleOpenContact} />
      </main>

      {/* Interactive Dialogue / Message Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={handleCloseContact}
      />
    </div>
  );
}
