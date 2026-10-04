import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Send, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { profile } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const subject = encodeURIComponent(`Message from ${senderName || 'Collaborator'}`);
    const body = encodeURIComponent(
      `From: ${senderName} (${senderEmail})\n\nMessage:\n${message}\n\n-- Sent via AYEKAN Portfolio`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      onClose();
    }, 2800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#240D18]/90 backdrop-blur-xl animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#2D0F1F] border border-[#E875A0]/30 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] z-10 text-[#FFF8FA] p-6 sm:p-10">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#F2A9C2]/15">
          <div>
            <span className="text-xs tracking-[0.25em] uppercase text-[#E875A0] font-medium block">
              Contact
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-white font-light mt-1">
              Say Hello
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#F8DCE8]/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Direct Email Display with Copy Action */}
        <div className="my-6 p-4 rounded-xl bg-[#3A1425]/60 border border-[#F2A9C2]/20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <Mail className="w-4 h-4 text-[#E875A0] shrink-0" />
            <span className="font-mono text-sm sm:text-base text-white truncate selection:bg-[#E875A0]">
              {profile.email}
            </span>
          </div>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#651F3B] hover:bg-[#9D315C] text-xs uppercase tracking-wider font-medium text-white transition-colors shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Message Form */}
        <form onSubmit={handleSendMessage} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F2A9C2]/70 mb-1 font-light">
                Your Name
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Who’s Behind the Screen?"
                className="w-full px-4 py-2.5 rounded-lg bg-[#240D18] border border-[#F2A9C2]/20 focus:border-[#E875A0] text-sm text-white placeholder-[#F8DCE8]/30 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F2A9C2]/70 mb-1 font-light">
                Your Email
              </label>
              <input
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="yourdigitaladdress@gmail.com"
                className="w-full px-4 py-2.5 rounded-lg bg-[#240D18] border border-[#F2A9C2]/20 focus:border-[#E875A0] text-sm text-white placeholder-[#F8DCE8]/30 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#F2A9C2]/70 mb-1 font-light">
              Message
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about what you are looking to build or collaborate on..."
              className="w-full px-4 py-2.5 rounded-lg bg-[#240D18] border border-[#F2A9C2]/20 focus:border-[#E875A0] text-sm text-white placeholder-[#F8DCE8]/30 outline-none transition-colors resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end">

            <button
              type="submit"
              className="px-6 py-3 rounded text-xs tracking-[0.2em] uppercase font-medium text-white bg-gradient-to-r from-[#9D315C] to-[#E875A0] hover:from-[#E875A0] hover:to-[#F2A9C2] hover:text-[#240D18] transition-all duration-300 shadow-[0_0_20px_rgba(232,117,160,0.4)] flex items-center gap-2"
            >
              <span>{sentSuccess ? 'Opening Mail...' : 'Send Message'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
