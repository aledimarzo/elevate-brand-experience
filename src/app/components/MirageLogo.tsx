'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import mirageLogo from '../../assets/mirage-logo-cropped.webp';

interface MirageLogoProps {
  className?: string;
  imageClassName?: string;
  glowClassName?: string;
  logoRingClassName?: string;
  enableFlip?: boolean;
  ambientMotion?: boolean;
  pauseAndResetOnHover?: boolean;
}

const FLIP_SPEED_DEG_PER_SEC = 58;
const HOVER_RETURN_SPEED = 7.2;

export function MirageLogo({
  className = '',
  imageClassName = '',
  glowClassName = '',
  logoRingClassName = '',
  enableFlip = false,
  ambientMotion = false,
  pauseAndResetOnHover = false,
}: MirageLogoProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const rotationRef = useRef(0);
  const shellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanAnimate(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  const shouldAnimate = canAnimate && !prefersReducedMotion && (ambientMotion || enableFlip);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    if (!shouldAnimate) {
      rotationRef.current = 0;
      shell.style.transform = 'perspective(1800px) rotateY(0deg)';
      return;
    }

    const tick = (time: number) => {
      const previous = lastTimeRef.current ?? time;
      const delta = Math.min((time - previous) / 1000, 0.05);
      lastTimeRef.current = time;

      let nextRotation = rotationRef.current;
      if (pauseAndResetOnHover && isHovered) {
        const target = Math.round(nextRotation / 360) * 360;
        const blend = 1 - Math.exp(-HOVER_RETURN_SPEED * delta);
        nextRotation += (target - nextRotation) * blend;
        if (Math.abs(target - nextRotation) < 0.05) nextRotation = target;
      } else {
        nextRotation += FLIP_SPEED_DEG_PER_SEC * delta;
      }

      rotationRef.current = nextRotation;
      shell.style.transform = `perspective(1800px) rotateY(${nextRotation}deg)`;
      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      lastTimeRef.current = null;
    };
  }, [ambientMotion, enableFlip, isHovered, pauseAndResetOnHover, shouldAnimate]);

  const interactive = canAnimate && !prefersReducedMotion;
  const imageFilter = isHovered && pauseAndResetOnHover
    ? 'drop-shadow(0 0 6px rgba(255, 194, 57, 0.20))'
    : 'drop-shadow(0 0 8px rgba(255, 194, 57, 0.16))';

  return (
    <div
      className={`group relative overflow-visible ${className}`}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      onFocus={() => interactive && setIsHovered(true)}
      onBlur={() => interactive && setIsHovered(false)}
    >
      {glowClassName ? (
        <div
          className={`pointer-events-none absolute inset-[24%] rounded-full transition-all duration-500 ${glowClassName}`}
          style={{
            opacity: isHovered && pauseAndResetOnHover ? 0.08 : 0.11,
            transform: `scale(${isHovered && pauseAndResetOnHover ? 0.96 : 1})`,
            filter: 'blur(18px) saturate(1.04)',
          }}
        />
      ) : null}
      {logoRingClassName ? (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-[10%] rounded-[32%] transition-all duration-300 ${logoRingClassName}`}
        />
      ) : null}

      <div
        ref={shellRef}
        className="hero-logo-shell relative z-10 h-full w-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'perspective(1800px) rotateY(0deg)',
          willChange: shouldAnimate ? 'transform' : undefined,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: 'rotateY(0deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <img
            src={mirageLogo}
            alt="Mirage Roleplay logo"
            className={`h-full w-full select-none object-contain ${imageClassName}`}
            draggable={false}
            decoding="async"
            fetchPriority="high"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              willChange: shouldAnimate ? 'filter' : undefined,
              filter: imageFilter,
              transform: 'translateZ(0)',
            }}
          />
        </div>

        <div
          className="absolute inset-0"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <img
            src={mirageLogo}
            alt=""
            aria-hidden="true"
            className={`h-full w-full select-none object-contain ${imageClassName}`}
            draggable={false}
            decoding="async"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              willChange: shouldAnimate ? 'filter' : undefined,
              filter: imageFilter,
              transform: 'translateZ(0) scaleX(-1)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
