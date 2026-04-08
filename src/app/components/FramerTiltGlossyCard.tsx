'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useState } from 'react';

type FramerTiltGlossyCardProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function FramerTiltGlossyCard({
  children,
  className = '',
  style,
}: FramerTiltGlossyCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [interactive, setInteractive] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const scale = useMotionValue(1);
  const shineOpacity = useMotionValue(0.18);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)');
    const update = () => setInteractive(media.matches && !prefersReducedMotion);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, [prefersReducedMotion]);

  const springRotateX = useSpring(rotateX, { stiffness: 180, damping: 18, mass: 0.7 });
  const springRotateY = useSpring(rotateY, { stiffness: 180, damping: 18, mass: 0.7 });
  const springScale = useSpring(scale, { stiffness: 220, damping: 20, mass: 0.6 });
  const springShineOpacity = useSpring(shineOpacity, { stiffness: 160, damping: 20, mass: 0.6 });

  const cardTransform = useMotionTemplate`
    perspective(1200px)
    rotateX(${springRotateX}deg)
    rotateY(${springRotateY}deg)
    scale(${springScale})
    translateZ(0)
  `;

  const glossyBackground = useMotionTemplate`
    radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.28), rgba(255,255,255,0.10) 18%, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0) 56%),
    linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.03) 38%, rgba(255,255,255,0.01) 60%, rgba(255,255,255,0.06) 100%)
  `;

  const edgeGlow = useMotionTemplate`
    0 20px 50px rgba(0,0,0,0.38),
    0 0 0 1px rgba(255,255,255,0.08),
    0 0 28px rgba(249,115,22,0.12)
  `;

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    const centerX = px - 0.5;
    const centerY = py - 0.5;

    rotateY.set(centerX * 14);
    rotateX.set(centerY * -12);
    glowX.set(px * 100);
    glowY.set(py * 100);
    scale.set(1.018);
    shineOpacity.set(0.82);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
    scale.set(1);
    shineOpacity.set(0.18);
  };

  return (
    <motion.div
      className={`group relative h-full w-full [transform-style:preserve-3d] ${className}`}
      style={{ ...style, transformStyle: 'preserve-3d' }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onPointerCancel={handleLeave}
    >
      <motion.div
        className="relative h-full overflow-hidden rounded-[24px] border border-white/10 backdrop-blur-xl [transform-style:preserve-3d]"
        style={{
          transform: interactive ? cardTransform : 'translateZ(0)',
          boxShadow: edgeGlow,
          willChange: interactive ? 'transform' : undefined,
          backfaceVisibility: 'hidden' as const,
          background:
            'linear-gradient(180deg, rgba(44,24,14,0.90) 0%, rgba(28,17,13,0.92) 38%, rgba(16,12,13,0.96) 100%)',
        }}
      >
        {interactive ? (
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[24px]" style={{ background: glossyBackground, opacity: springShineOpacity }} />
        ) : null}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-[1px] rounded-[23px] bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,235,220,0.026)_18%,rgba(249,115,22,0.032)_54%,rgba(255,255,255,0.015)_100%)]"
          style={{ transform: 'translateZ(18px)' }}
        />

        {interactive ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-[10%] top-0 h-24 rounded-full bg-white/20 blur-2xl"
            style={{ opacity: springShineOpacity, transform: 'translateZ(40px) translateY(-35%)' }}
          />
        ) : null}

        <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-[radial-gradient(circle_at_bottom,rgba(249,115,22,0.18),transparent_56%)] opacity-90" />
        <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.09),transparent_44%)]" />

        <div className="relative h-full [transform-style:preserve-3d]" style={{ transform: 'translateZ(30px)' }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
