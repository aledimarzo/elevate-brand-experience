'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useServerStatus } from '../hooks/useServerStatus';
import { MirageLogo } from './MirageLogo';


function NavbarGlitchWord({ text, accent = false }: { text: string; accent?: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span
      className={`relative inline-grid place-items-center ${accent ? 'text-orange-400' : 'text-white'}`}
      style={{ fontFamily: 'ModernCyber', letterSpacing: '0.08em' }}
      aria-label={text}
    >
      <motion.span
        className={`relative z-10 inline-block ${accent ? 'drop-shadow-[0_0_14px_rgba(249,115,22,0.26)]' : 'drop-shadow-[0_0_12px_rgba(255,255,255,0.18)]'}`}
        animate={shouldReduceMotion ? undefined : { filter: ['brightness(1)', 'brightness(1.04)', 'brightness(1)'] }}
        transition={shouldReduceMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {text}
      </motion.span>
      {!shouldReduceMotion && (
        <>
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 mix-blend-screen text-[#ff6b6b]"
            animate={{
              x: [0, -1, 0.5, 0],
              opacity: [0, 0.42, 0.18, 0],
              clipPath: [
                'inset(0 0 100% 0)',
                'inset(18% 0 52% 0)',
                'inset(56% 0 18% 0)',
                'inset(0 0 100% 0)',
              ],
            }}
            transition={{ duration: 2.1, repeat: Infinity, repeatDelay: 2.8, times: [0, 0.22, 0.6, 1], ease: 'easeInOut' }}
          >
            {text}
          </motion.span>
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 mix-blend-screen text-[#62f5ff]"
            animate={{
              x: [0, 1, -0.5, 0],
              opacity: [0, 0.46, 0.2, 0],
              clipPath: [
                'inset(100% 0 0 0)',
                'inset(58% 0 12% 0)',
                'inset(22% 0 50% 0)',
                'inset(100% 0 0 0)',
              ],
            }}
            transition={{ duration: 1.95, repeat: Infinity, repeatDelay: 2.8, delay: 0.08, times: [0, 0.24, 0.62, 1], ease: 'easeInOut' }}
          >
            {text}
          </motion.span>
        </>
      )}
    </span>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const serverStatus = useServerStatus('g6md4x');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  }, []);

  const navLinks = useMemo(
    () => [
      { name: 'Home', id: 'hero' },
      { name: 'Server', id: 'stats' },
      { name: 'Fazioni', id: 'factions' },
      { name: 'Come Unirsi', id: 'howtostart' },
      { name: 'Staff', id: 'staff' },
    ],
    [],
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'border-b border-white/10 bg-black/45 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button onClick={() => scrollToSection('hero')} className="group navbar-brand-glow flex items-center gap-3 text-left transition-all duration-300" aria-label="Vai alla home">
            <MirageLogo className="h-10 w-10 transition-transform duration-300 group-hover:scale-[1.03]" imageClassName="drop-shadow-none" logoRingClassName="navbar-logo-ring" />
            <span className="inline-flex items-baseline text-xl sm:text-2xl [filter:drop-shadow(0_0_0_rgba(0,0,0,0))] transition-all duration-300 group-hover:[filter:drop-shadow(0_0_10px_rgba(255,210,120,0.24))]">
              <NavbarGlitchWord text="MIRAGE" />
              <span className="ml-2">
                <NavbarGlitchWord text="RP" accent />
              </span>
            </span>
          </button>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-gray-300 transition-colors hover:text-orange-400"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <div
              className={`rounded-full border px-4 py-2 text-sm font-semibold shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition-colors ${
                serverStatus.loading
                  ? 'border-white/12 bg-white/6 text-gray-200'
                  : serverStatus.online
                    ? 'border-emerald-400/35 bg-emerald-500/14 text-emerald-300'
                    : 'border-red-400/35 bg-red-500/14 text-red-300'
              }`}
            >
              {serverStatus.loading
                ? 'Server online: ...'
                : `Server online: ${serverStatus.online ? `${serverStatus.players}/${serverStatus.maxPlayers}` : 'Offline'}`}
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
            aria-label="Apri menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed left-4 right-4 top-[84px] z-40 rounded-2xl border border-white/10 bg-[#090910]/95 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-200 transition-colors hover:bg-white/5 hover:text-orange-400"
                >
                  {link.name}
                </button>
              ))}
              <div
                className={`mt-2 rounded-xl border px-4 py-3 text-sm font-semibold ${
                  serverStatus.loading
                    ? 'border-white/8 bg-white/5 text-gray-300'
                    : serverStatus.online
                      ? 'border-emerald-400/25 bg-emerald-500/10 text-emerald-300'
                      : 'border-red-400/25 bg-red-500/10 text-red-300'
                }`}
              >
                {serverStatus.loading
                  ? 'Server online: ...'
                  : `Server online: ${serverStatus.online ? `${serverStatus.players}/${serverStatus.maxPlayers}` : 'Offline'}`}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
