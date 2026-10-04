import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#mind', id: 'mind' },
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Outside', href: '#outside', id: 'outside' },
    { label: 'Values', href: '#philosophy', id: 'philosophy' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home','about', 'mind', 'work', 'journey', 'outside', 'philosophy', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#240D18]/85 backdrop-blur-md border-b border-[#F2A9C2]/10 py-3.5 shadow-[0_4px_30px_rgba(36,13,24,0.6)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="font-display text-2xl tracking-[0.25em] text-[#FFF8FA] hover:text-[#E875A0] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E875A0]"
        >
          AYEKAN
        </a>

        {/* Zone 2: Navigation Links with Active Dot */}
        <nav className="hidden lg:flex items-center gap-7 text-xs tracking-[0.2em] uppercase font-light text-[#F8DCE8]/75">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E875A0] ${
                  isActive ? 'text-white font-normal' : 'hover:text-[#FFF8FA]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E875A0] shadow-[0_0_8px_#E875A0] transition-all" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Say Hello Action */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs tracking-[0.18em] uppercase font-medium text-[#FFF8FA] bg-[#651F3B]/60 hover:bg-[#9D315C] border border-[#E875A0]/30 hover:border-[#E875A0]/80 rounded transition-all duration-300 shadow-[0_0_15px_rgba(232,117,160,0.15)] hover:shadow-[0_0_20px_rgba(232,117,160,0.35)] whitespace-nowrap active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E875A0]"
          >
            Say Hello
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#F8DCE8] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E875A0]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Editorial Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-[#240D18]/98 backdrop-blur-2xl px-8 py-10 flex flex-col justify-between z-50 animate-in fade-in duration-300">
          <div className="space-y-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#E875A0] block">
              Navigation
            </span>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-baseline justify-between py-2 text-2xl font-display font-light text-[#F8DCE8] hover:text-[#E875A0] border-b border-white/5 transition-colors"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-[#E875A0]/60">0{idx + 1}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-[#F2A9C2]/15">
            <p className="font-display text-lg text-[#F2A9C2] italic mb-4">
              Software & AI Engineer
            </p>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3.5 text-xs tracking-[0.2em] uppercase font-medium text-white bg-gradient-to-r from-[#651F3B] to-[#9D315C] rounded border border-[#E875A0]/40"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
