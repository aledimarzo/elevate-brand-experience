'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

export function IntroReveal() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), reduceMotion ? 700 : 1650);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div className="pointer-events-none fixed inset-0 z-[90]" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0.2 : 0.38, ease: [0.22, 1, 0.36, 1] }} aria-hidden="true">
          <motion.div className="absolute inset-0 bg-[#040409]" initial={{ '--reveal-size': '0vmax' } as any} animate={{ '--reveal-size': reduceMotion ? '180vmax' : '160vmax' } as any} transition={{ duration: reduceMotion ? 0.6 : 1.32, ease: [0.2, 1, 0.22, 1], delay: 0.04 }} style={{ WebkitMaskImage: 'radial-gradient(circle at 50% 48%, transparent 0, transparent calc(var(--reveal-size) * 0.17), rgba(0,0,0,0.12) calc(var(--reveal-size) * 0.21), rgba(0,0,0,0.96) calc(var(--reveal-size) * 0.27), rgba(0,0,0,1) var(--reveal-size))', maskImage: 'radial-gradient(circle at 50% 48%, transparent 0, transparent calc(var(--reveal-size) * 0.17), rgba(0,0,0,0.12) calc(var(--reveal-size) * 0.21), rgba(0,0,0,0.96) calc(var(--reveal-size) * 0.27), rgba(0,0,0,1) var(--reveal-size))', backdropFilter: reduceMotion ? 'blur(6px)' : 'blur(11px)', WebkitBackdropFilter: reduceMotion ? 'blur(6px)' : 'blur(11px)' }} />
          <motion.div className="absolute left-1/2 top-[48%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full" initial={{ scale: 0.18, opacity: 0.9 }} animate={{ scale: reduceMotion ? 14 : 18, opacity: 0 }} transition={{ duration: reduceMotion ? 0.58 : 1.28, ease: [0.19, 1, 0.22, 1] }} style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(249,115,22,0.16) 22%, rgba(249,115,22,0.06) 42%, rgba(255,255,255,0.02) 60%, transparent 72%)', boxShadow: '0 0 120px rgba(249,115,22,0.14)', filter: 'blur(1px)' }} />
          <motion.div className="absolute inset-0" initial={{ opacity: 0.22 }} animate={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0.5 : 1.05, ease: 'easeOut' }} style={{ background: 'radial-gradient(circle at 50% 48%, rgba(255,255,255,0.09), transparent 18%)' }} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
