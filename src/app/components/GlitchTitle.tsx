import { motion, useReducedMotion } from 'motion/react';
import type { CSSProperties } from 'react';

interface GlitchTitleProps {
  className?: string;
  first: string;
  second?: string;
  firstClassName?: string;
  secondClassName?: string;
  ariaLabel?: string;
}

interface LayerContentProps {
  first: string;
  second?: string;
  firstClassName?: string;
  secondClassName?: string;
  style?: CSSProperties;
}

function LayerContent({ first, second, firstClassName = '', secondClassName = '', style }: LayerContentProps) {
  return (
    <span
      className="inline-flex flex-wrap items-baseline justify-center gap-x-2 sm:gap-x-4 leading-none"
      style={{ fontFamily: 'ModernCyber', letterSpacing: '0.08em', ...style }}
    >
      <span className={firstClassName}>{first}</span>
      {second ? <span className={secondClassName}>{second}</span> : null}
    </span>
  );
}

export function GlitchTitle({
  className = '',
  first,
  second,
  firstClassName,
  secondClassName,
  ariaLabel,
}: GlitchTitleProps) {
  const shouldReduceMotion = useReducedMotion();

  const baseFirstClass =
    firstClassName ??
    'bg-gradient-to-r from-orange-400 via-orange-500 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(249,115,22,0.4)]';
  const baseSecondClass =
    secondClassName ?? 'text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.2)]';

  return (
    <span className={`relative inline-grid place-items-center max-w-full ${className}`} aria-label={ariaLabel ?? [first, second].filter(Boolean).join(' ')}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-[10%] -bottom-[10%] h-[34%] rounded-full bg-[radial-gradient(circle,rgba(255,190,80,0.30)_0%,rgba(249,115,22,0.16)_38%,rgba(249,115,22,0.07)_58%,transparent_80%)] blur-2xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-[18%] bottom-[2%] h-px bg-gradient-to-r from-transparent via-orange-300/40 to-transparent"
      />

      <motion.span
        className="relative z-10"
        animate={shouldReduceMotion ? undefined : {
          filter: ['brightness(1)', 'brightness(1.06)', 'brightness(1)'],
          y: [0, -1, 0],
        }}
        transition={shouldReduceMotion ? undefined : {
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <LayerContent first={first} second={second} firstClassName={baseFirstClass} secondClassName={baseSecondClass} />
      </motion.span>

      {!shouldReduceMotion && (
        <>
          <motion.span
            aria-hidden
            className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
            animate={{
              x: [0, -4, 3, -2, 0],
              opacity: [0, 0.85, 0.2, 0.65, 0],
              clipPath: [
                'inset(0 0 84% 0)',
                'inset(16% 0 52% 0)',
                'inset(44% 0 28% 0)',
                'inset(68% 0 8% 0)',
                'inset(0 0 84% 0)',
              ],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatDelay: 3.8,
              times: [0, 0.16, 0.42, 0.7, 1],
              ease: 'easeInOut',
            }}
          >
            <LayerContent
              first={first}
              second={second}
              firstClassName="text-[#ff6b6b]"
              secondClassName="text-[#ffdfdf]"
              style={{ textShadow: '2px 0 12px rgba(255, 80, 80, 0.55)' }}
            />
          </motion.span>

          <motion.span
            aria-hidden
            className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
            animate={{
              x: [0, 4, -3, 1, 0],
              opacity: [0, 0.9, 0.25, 0.7, 0],
              clipPath: [
                'inset(78% 0 0 0)',
                'inset(54% 0 16% 0)',
                'inset(24% 0 46% 0)',
                'inset(6% 0 72% 0)',
                'inset(78% 0 0 0)',
              ],
            }}
            transition={{
              duration: 2.05,
              repeat: Infinity,
              repeatDelay: 3.8,
              delay: 0.12,
              times: [0, 0.18, 0.46, 0.72, 1],
              ease: 'easeInOut',
            }}
          >
            <LayerContent
              first={first}
              second={second}
              firstClassName="text-[#62f5ff]"
              secondClassName="text-[#d8ffff]"
              style={{ textShadow: '-2px 0 12px rgba(98, 245, 255, 0.55)' }}
            />
          </motion.span>

          <motion.span
            aria-hidden
            className="absolute inset-x-[8%] top-1/2 z-30 h-[10%] -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent blur-md pointer-events-none"
            animate={{
              opacity: [0, 0.3, 0, 0.18, 0],
              x: ['-4%', '2%', '-1%', '3%', '-4%'],
              scaleX: [0.96, 1.02, 0.98, 1.01, 0.96],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              repeatDelay: 3.6,
              ease: 'easeInOut',
            }}
          />
        </>
      )}
    </span>
  );
}
