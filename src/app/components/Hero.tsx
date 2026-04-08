'use client';

import { motion } from 'motion/react';
import { HardDrive, MessageSquare, ArrowRight, ChevronDown } from 'lucide-react';
import { useCallback } from 'react';
import { MirageLogo } from './MirageLogo';

export function Hero() {
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const openServerConnect = useCallback(() => {
    window.open('https://cfx.re/join/g6md4x', '_blank', 'noopener,noreferrer');
  }, []);
  const openDiscord = useCallback(() => {
    window.open('https://discord.gg/EjYhPcG7Va', '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mb-8 flex flex-col items-center"
        >
          <MirageLogo
            className="h-64 w-64 sm:h-80 sm:w-80 md:h-[21rem] md:w-[21rem] lg:h-[23rem] lg:w-[23rem] xl:h-[24rem] xl:w-[24rem]"
            imageClassName="drop-shadow-none"
            glowClassName=""
            enableFlip
            ambientMotion
            pauseAndResetOnHover
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mb-10 max-w-2xl"
        >
          <p className="mb-4 text-xl font-bold text-white sm:text-2xl md:text-3xl">Dove i sogni prendono vita</p>
          <p className="text-base text-gray-400 sm:text-lg md:text-xl">
            Vivi un'esperienza di Roleplay senza precedenti. Costruisci il tuo impero, forgia alleanze e scrivi la tua leggenda.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.button
            onClick={() => scrollToSection('howtostart')}
            className="group relative flex w-full touch-manipulation overflow-hidden rounded-lg bg-orange-500 px-8 py-4 font-medium text-white sm:w-auto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          >
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600" />
            <span className="pointer-events-none absolute inset-0 bg-orange-400/0 blur-xl transition-all duration-300 group-hover:bg-orange-400/20" />
            <span className="relative z-10 flex w-full items-center justify-center gap-2">
              UNISCITI ORA
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight className="h-5 w-5" />
              </motion.span>
            </span>
          </motion.button>

          <motion.button
            onClick={openServerConnect}
            className="group relative flex w-full touch-manipulation overflow-hidden rounded-lg border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm sm:w-auto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          >
            <span className="connect-shimmer pointer-events-none absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0" />
            <span className="pointer-events-none absolute inset-0 bg-orange-500/0 transition-all duration-500 group-hover:bg-orange-500/10" />
            <span className="relative z-10 flex w-full items-center justify-center gap-3">
              <HardDrive className="h-5 w-5 text-orange-400" />
              <span className="break-all font-mono text-xs text-gray-300 sm:text-sm">connect 45.14.184.155</span>
            </span>
          </motion.button>

          <motion.button
            onClick={openDiscord}
            className="group relative flex w-full touch-manipulation overflow-hidden rounded-lg border border-[rgba(88,101,242,0.2)] bg-[#5865F2]/10 px-6 py-4 sm:w-auto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          >
            <span className="connect-shimmer pointer-events-none absolute inset-0 bg-gradient-to-r from-[#5865F2]/0 via-[#5865F2]/20 to-[#5865F2]/0" />
            <span className="pointer-events-none absolute inset-0 bg-[#5865F2]/0 transition-all duration-500 group-hover:bg-[#5865F2]/16" />
            <span className="relative z-10 flex w-full items-center justify-center gap-3">
              <MessageSquare className="h-5 w-5 text-[#5865F2]" />
              <span className="text-sm font-medium text-[#5865F2]">Discord</span>
            </span>
          </motion.button>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          onClick={() => scrollToSection('stats')}
          className="mx-auto flex flex-col items-center gap-2 text-xs uppercase tracking-[0.32em] text-gray-500 transition-colors hover:text-orange-300 sm:text-sm"
        >
          <span>Scorri in basso</span>
          <motion.span
            aria-hidden
            animate={{ y: [0, 7, 0], opacity: [0.72, 1, 0.72] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-orange-300 shadow-[0_0_18px_rgba(249,115,22,0.12)] backdrop-blur-sm"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.button>

        <div className="pointer-events-none absolute inset-x-0 bottom-[-6rem] z-0 h-40 bg-gradient-to-b from-transparent via-[#09080d]/28 to-[#050509]/82 blur-2xl" />
      </div>
    </section>
  );
}
