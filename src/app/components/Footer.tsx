'use client';

import { motion } from 'motion/react';
import { MirageLogo } from './MirageLogo';
import { useCallback } from 'react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export function Footer({ onOpenPrivacy, onOpenTerms }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const navigationLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Server', id: 'stats' },
    { label: 'Fazioni', id: 'factions' },
    { label: 'Come unirsi', id: 'howtostart' },
    { label: 'Staff', id: 'staff' },
  ];

  return (
    <footer className="relative mt-8 overflow-hidden border-t border-white/10 bg-[linear-gradient(180deg,rgba(4,4,8,0.18),rgba(3,3,7,0.78))]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(249,115,22,0.55),rgba(168,85,247,0.35),transparent)]" />
      <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.12),transparent_65%)] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <button
              onClick={() => scrollToSection('hero')}
              className="group footer-brand-glow flex items-center gap-3 mb-4 text-left transition-all duration-300"
              aria-label="Vai alla home"
            >
              <MirageLogo className="w-11 h-11 transition-transform duration-300 group-hover:scale-[1.03]" imageClassName="drop-shadow-none" logoRingClassName="footer-logo-ring" />
              <span className="inline-flex items-baseline text-xl sm:text-2xl">
                <span className="footer-brand-text footer-brand-text--light">MIRAGE</span>
                <span className="ml-2 footer-brand-text footer-brand-text--accent">RP</span>
              </span>
            </button>
            <p className="text-gray-400 text-sm leading-relaxed">
              Vivi un'esperienza roleplay immersiva tra fazioni, economia, eventi e una community attiva costruita per chi cerca qualità, continuità e identità.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="xl:text-right"
          >
            <h3 className="text-white font-bold mb-4">Navigazione</h3>
            <div className="flex flex-wrap xl:justify-end gap-x-6 gap-y-3">
              {navigationLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-gray-400 text-sm hover:text-orange-400 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-6 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {currentYear} Mirage RP. Tutti i diritti riservati.
          </p>
          <div className="flex items-center gap-5 text-sm">
            <button onClick={onOpenPrivacy} className="text-gray-500 hover:text-orange-400 transition-colors">Privacy Policy</button>
            <button onClick={onOpenTerms} className="text-gray-500 hover:text-orange-400 transition-colors">Termini di Servizio</button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
