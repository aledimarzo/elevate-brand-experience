'use client';

import { motion } from 'motion/react';
import { GlitchTitle } from './GlitchTitle';
import { DollarSign, Car, Shield, Zap, Users, TrendingUp } from 'lucide-react';
import { useState, useRef, useCallback, useMemo } from 'react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  backgroundImage: string;
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  // Detect if device is mobile/tablet for performance
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 1024 || ('ontouchstart' in window);
  }, []);


  const getSpotlightColor = useCallback(() => {
    if (feature.color.includes('orange')) return 'rgba(249, 115, 22, 0.3)';
    if (feature.color.includes('emerald')) return 'rgba(16, 185, 129, 0.3)';
    if (feature.color.includes('pink')) return 'rgba(236, 72, 153, 0.3)';
    if (feature.color.includes('red')) return 'rgba(239, 68, 68, 0.3)';
    return 'rgba(168, 85, 247, 0.3)';
  }, [feature.color]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Skip heavy effects on mobile
    if (isMobile) return;
    
    if (!cardRef.current) return;

    // Cancel previous animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Use RAF for smooth 60fps updates
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      
      const glowXPos = ((e.clientX - rect.left) / rect.width) * 100;
      const glowYPos = ((e.clientY - rect.top) / rect.height) * 100;
      const rotY = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const rotX = -((e.clientY - rect.top) / rect.height - 0.5) * 20;
      setRotateX(rotX);
      setRotateY(rotY);
      
      setGlowX(glowXPos);
      setGlowY(glowYPos);
    });
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setGlowX(50);
    setGlowY(50);
    setRotateX(0);
    setRotateY(0);
    
    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ perspective: isMobile ? "none" : "1200px" }}
    >
      <motion.div
        className="relative h-full bg-gradient-to-br from-white/5 to-white/0 rounded-2xl p-8 overflow-hidden"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.1)',
          willChange: 'transform',
          backfaceVisibility: 'hidden' as const,
        }}
        animate={{
          y: isHovered ? -8 : 0,
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      >
        {/* Simplified Shine Effect - Only on desktop */}
        {!isMobile && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle 200px at ${glowX}% ${glowY}%, rgba(255, 255, 255, 0.15), transparent)`,
              opacity: isHovered ? 1 : 0,
            }}
          />
        )}

        {/* Background Image - Simplified */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{
            backgroundImage: `url(${feature.backgroundImage})`,
            opacity: isHovered ? 0.2 : 0.08,
            filter: 'blur(0px)',
            willChange: 'opacity',
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/70 to-black/80" />

        {/* Simplified Glow Effect */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl transition-opacity duration-300`}
          style={{
            opacity: isHovered ? 0.15 : 0,
          }}
        />
        
        {/* Spotlight Effect - Desktop only, simplified */}
        {!isMobile && isHovered && (
          <div
            className="absolute rounded-2xl pointer-events-none transition-opacity duration-200"
            style={{
              width: '250px',
              height: '250px',
              left: `${glowX}%`,
              top: `${glowY}%`,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, ${getSpotlightColor()}, transparent 70%)`,
              opacity: 1,
            }}
          />
        )}

        {/* Icon - Simplified animation */}
        <div 
          className="relative mb-6"
          style={{
            willChange: 'transform',
          backfaceVisibility: 'hidden' as const,
          }}
        >
          <motion.div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg relative z-10`}
            animate={{
              rotate: isHovered ? [0, -8, 8, -8, 0] : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <div className="text-white">{feature.icon}</div>
          </motion.div>
          <div 
            className={`absolute inset-0 w-16 h-16 ${feature.bgColor} blur-xl transition-all duration-300`}
            style={{
              opacity: isHovered ? 1 : 0.5,
              transform: isHovered ? 'scale(1.5)' : 'scale(1)',
            }}
          />
        </div>

        {/* Content - No parallax on mobile for performance */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3 relative z-10">
            {feature.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed relative z-10">
            {feature.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Features() {
  const features: Feature[] = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Economia Realistica',
      description: 'Sistema economico bilanciato e dinamico. Ogni lavoro, illegale o legale, ha un impatto reale sull\'economia della città.',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500',
      backgroundImage: 'https://images.unsplash.com/photo-1601877728032-626bf53f05a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25leSUyMGNhc2glMjBlY29ub215JTIwYnVzaW5lc3N8ZW58MXx8fHwxNzc1MTcwNTAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: 'Veicoli Custom',
      description: 'Centinaia di veicoli ottimizzati e personalizzabili. Handling realistico per garantire inseguimenti e corse mozzafiato.',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500',
      backgroundImage: 'https://images.unsplash.com/photo-1658058765281-0833dce61996?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXIlMjByYWNpbmd8ZW58MXx8fHwxNzc1MDc5MDQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Roleplay Serio',
      description: 'Regolamento rigoroso applicato da uno staff attivo h24 per garantire un\'esperienza immersiva e priva di tossicità.',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-500',
      backgroundImage: 'https://images.unsplash.com/photo-1734209648349-f316c5d5c2e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xpY2UlMjBiYWRnZSUyMHNoaWVsZCUyMHNlY3VyaXR5fGVufDF8fHx8MTc3NTE3MDUwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Script Esclusivi',
      description: 'Sistemi unici sviluppati internamente. Rapine complesse, sistemi medici avanzati e interazioni ambientali profonde.',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-500',
      backgroundImage: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwcHJvZ3JhbW1pbmclMjBjb21wdXRlciUyMHNjcmVlbnxlbnwxfHx8fDE3NzUxNzA1MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Italiana',
      description: 'Unisciti a migliaia di giocatori italiani. Eventi costanti, lotte di potere e storie intrecciate che cambiano ogni giorno.',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500',
      backgroundImage: 'https://images.unsplash.com/photo-1580849279061-0179c4ebf14e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBjb21tdW5pdHklMjBncm91cCUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3NTE3MDUwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Aggiornamenti Costanti',
      description: 'Il server evolve continuamente basandosi sul feedback della community. Nuove features introdotte settimanalmente.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500',
      backgroundImage: 'https://images.unsplash.com/photo-1589829068083-7cbcc8f6eed4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwdGVjaG5vbG9neSUyMGZ1dHVyZSUyMHVwZGF0ZXN8ZW58MXx8fHwxNzc1MTcwNTA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <section id="features" className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
            <span className="inline-flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 leading-tight" aria-label="L'ESPERIENZA DEFINITIVA">
              <GlitchTitle
                first="L'"
                className="leading-tight"
                firstClassName="text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.18)]"
                ariaLabel="L'"
              />
              <GlitchTitle first="ESPERIENZA" second="DEFINITIVA" className="leading-tight" firstClassName="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(249,115,22,0.4)]" secondClassName="text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.18)]" ariaLabel="ESPERIENZA DEFINITIVA" />
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Abbiamo costruito Mirage RP da zero per offrire la simulazione di vita urbana più profonda
            e coinvolgente sul panorama FiveM italiano.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
