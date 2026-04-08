'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Shield, Ghost, Heart, Briefcase, Landmark, Radio } from 'lucide-react';
import { useState, useCallback, useMemo } from 'react';
import { GlitchTitle } from './GlitchTitle';

interface Faction {
  icon: React.ReactNode;
  category: string;
  categoryColor: string;
  label: string;
  title: string;
  gradient: string;
  borderColor: string;
  description: string;
  backgroundImage: string;
}

// Helper function to convert Tailwind border classes to RGBA
function getBorderStyle(borderColorClass: string): string {
  const colorMap: Record<string, string> = {
    'border-blue-500/20': 'rgba(59, 130, 246, 0.2)',
    'border-blue-500/40': 'rgba(59, 130, 246, 0.4)',
    'border-red-500/20': 'rgba(239, 68, 68, 0.2)',
    'border-red-500/40': 'rgba(239, 68, 68, 0.4)',
    'border-emerald-500/20': 'rgba(16, 185, 129, 0.2)',
    'border-emerald-500/40': 'rgba(16, 185, 129, 0.4)',
    'border-orange-500/20': 'rgba(249, 115, 22, 0.2)',
    'border-orange-500/40': 'rgba(249, 115, 22, 0.4)',
    'border-purple-500/20': 'rgba(168, 85, 247, 0.2)',
    'border-purple-500/40': 'rgba(168, 85, 247, 0.4)',
  };
  
  // Extract the base color from "border-color/opacity hover:border-color/opacity"
  const baseColor = borderColorClass.split(' ')[0];
  return colorMap[baseColor] || 'rgba(255, 255, 255, 0.1)';
}

function FactionCard({ faction, index }: { faction: Faction; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <motion.div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseEnter}
        onTouchEnd={handleMouseLeave}
      >
        <motion.div
          className={`relative h-80 bg-gradient-to-br ${faction.gradient} rounded-2xl overflow-hidden`}
          style={{
            border: `1px solid ${getBorderStyle(faction.borderColor)}`,
            willChange: 'transform',
          }}
          animate={{
            y: isHovered ? -6 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
        >
          {/* Background Image */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: `url(${faction.backgroundImage})`,
              transformOrigin: 'center center',
              willChange: 'transform, filter, opacity',
            }}
            animate={{
              opacity: isHovered ? 0.38 : 0.24,
              scale: isHovered ? 1.12 : 1,
              filter: isHovered ? 'blur(4px) saturate(1.05)' : 'blur(0px) saturate(0.95)',
            }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />

          {/* Dark Overlay - Base */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: isHovered
                ? 'linear-gradient(135deg, rgba(0,0,0,0.34), rgba(0,0,0,0.48), rgba(0,0,0,0.62))'
                : 'linear-gradient(135deg, rgba(0,0,0,0.44), rgba(0,0,0,0.56), rgba(0,0,0,0.68))',
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
          </div>

          {/* Category Badge */}
          <motion.div
            className="absolute top-6 left-6 right-6 z-20 pointer-events-none"
            animate={{
              opacity: isHovered ? 0 : 1,
            }}
            transition={{ duration: 0.15 }}
          >
            <span
              className={`text-xs ${faction.categoryColor} uppercase tracking-wider font-medium px-3 py-1.5 bg-black/30 backdrop-blur-sm rounded-full border border-current/20 inline-block`}
            >
              {faction.category}
            </span>
          </motion.div>

          {/* Content - Default State */}
          <AnimatePresence mode="wait">
            {!isHovered && (
              <motion.div
                key="default"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-6 left-6 right-6 z-10 pointer-events-none"
              >
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${faction.categoryColor.replace('text', 'bg').replace('400', '500')} mb-4 shadow-lg`}
                >
                  <div className="text-white">{faction.icon}</div>
                </motion.div>
                <p className="text-xs text-gray-400 mb-2">{faction.label}</p>
                <h3 className="text-2xl font-black text-white tracking-wide">{faction.title}</h3>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Description - Hover State */}
          <AnimatePresence mode="wait">
            {isHovered && (
              <motion.div
                key="hover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="absolute inset-0 p-6 flex flex-col justify-between z-10 pointer-events-none"
              >
                {/* Compact Header with Icon */}
                <div className="flex items-center gap-3">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${faction.categoryColor.replace('text', 'bg').replace('400', '500')} shadow-lg flex-shrink-0`}
                  >
                    <div className="text-white scale-75">{faction.icon}</div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">{faction.label}</p>
                    <h3 className="text-base sm:text-lg font-black text-white">{faction.title}</h3>
                  </div>
                </div>

                {/* Description Text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="flex-1 flex items-center"
                >
                  <p className="text-xs sm:text-sm text-gray-100 leading-relaxed drop-shadow-[0_1px_10px_rgba(0,0,0,0.35)]">
                    {faction.description}
                  </p>
                </motion.div>

                {/* Spacer for progress bar */}
                <div className="h-2" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Bar - Bottom (Only on Hover) */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute bottom-0 left-0 right-0 h-1.5 origin-left pointer-events-none"
                style={{
                  background: faction.categoryColor.includes('blue') ? 'rgb(59, 130, 246)' : 
                             faction.categoryColor.includes('red') ? 'rgb(239, 68, 68)' : 
                             faction.categoryColor.includes('emerald') ? 'rgb(16, 185, 129)' : 
                             faction.categoryColor.includes('orange') ? 'rgb(249, 115, 22)' : 
                             'rgb(168, 85, 247)',
                  boxShadow: `0 0 20px ${faction.categoryColor.includes('blue') ? 'rgba(59, 130, 246, 0.6)' : 
                             faction.categoryColor.includes('red') ? 'rgba(239, 68, 68, 0.6)' : 
                             faction.categoryColor.includes('emerald') ? 'rgba(16, 185, 129, 0.6)' : 
                             faction.categoryColor.includes('orange') ? 'rgba(249, 115, 22, 0.6)' : 
                             'rgba(168, 85, 247, 0.6)'}`
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Factions() {
  const factions: Faction[] = [
    {
      icon: <Shield className="w-10 h-10" />,
      category: 'FORZE DELL\'ORDINE',
      categoryColor: 'text-blue-400',
      label: 'Ordine pubblico',
      title: 'POLIZIA MRPD',
      gradient: 'from-blue-950/50 via-blue-900/30 to-blue-950/50',
      borderColor: 'border-blue-500/20 hover:border-blue-500/40',
      description: 'La Polizia MRPD è responsabile della sicurezza e dell\'ordine pubblico in tutta la città di Mirage. I poliziotti sono addestrati per gestire situazioni di emergenza e mantenere la pace.',
      backgroundImage: 'https://images.unsplash.com/photo-1771340589678-cb6c920e1b5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xpY2UlMjBvZmZpY2VyJTIwdW5pZm9ybSUyMGJhZGdlfGVufDF8fHx8MTc3NTE3MTEzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: <Ghost className="w-10 h-10" />,
      category: 'CRIMINE E SOTTOMONDO',
      categoryColor: 'text-red-400',
      label: 'Sottomondo',
      title: 'FAZIONE ILLEGALE',
      gradient: 'from-red-950/50 via-red-900/30 to-red-950/50',
      borderColor: 'border-red-500/20 hover:border-red-500/40',
      description: 'La Fazione Illegale è composta da criminali e mercenari che operano nel sottomondo di Mirage. Questa fazione è notata per le sue attività illegali e per il suo potere economico.',
      backgroundImage: 'https://images.unsplash.com/photo-1765513265796-3c21b92cb516?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWFwb25zJTIwZ3VucyUyMGFyc2VuYWwlMjBkYXJrfGVufDF8fHx8MTc3NTE3MjEwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: <Heart className="w-10 h-10" />,
      category: 'SERVIZIO MEDICO',
      categoryColor: 'text-emerald-400',
      label: 'Emergenze',
      title: 'MEDICI EMS',
      gradient: 'from-emerald-950/50 via-emerald-900/30 to-emerald-950/50',
      borderColor: 'border-emerald-500/20 hover:border-emerald-500/40',
      description: 'I Medici EMS sono responsabili delle emergenze mediche in tutta la città di Mirage. Questa fazione è addestrata per fornire cure immediate e salvare vite.',
      backgroundImage: 'https://images.unsplash.com/photo-1567622153803-4526f47899d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwZW1lcmdlbmN5JTIwaG9zcGl0YWx8ZW58MXx8fHwxNzc1MTcxMTM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: <Briefcase className="w-10 h-10" />,
      category: 'VITA CIVILE',
      categoryColor: 'text-orange-400',
      label: 'Vita quotidiana',
      title: 'CIVILI',
      gradient: 'from-orange-950/50 via-orange-900/30 to-orange-950/50',
      borderColor: 'border-orange-500/20 hover:border-orange-500/40',
      description: 'I Civili rappresentano la popolazione di Mirage. Questa fazione è composta da persone che vivono e lavorano nella città, cercando di mantenere la loro vita quotidiana.',
      backgroundImage: 'https://images.unsplash.com/photo-1599611991961-08546238ee0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYnVzaW5lc3MlMjBwZW9wbGUlMjB3b3JraW5nfGVufDF8fHx8MTc3NTE3MTEzOXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: <Landmark className="w-10 h-10" />,
      category: 'GOVERNO',
      categoryColor: 'text-purple-400',
      label: 'Potere istituzionale',
      title: 'POLITICA & LEGGE',
      gradient: 'from-purple-950/50 via-purple-900/30 to-purple-950/50',
      borderColor: 'border-purple-500/20 hover:border-purple-500/40',
      description: 'La Politica & Legge è responsabile della gestione del governo e della legge in tutta la città di Mirage. Questa fazione è composta da politici e giuristi che prendono decisioni importanti per la città.',
      backgroundImage: 'https://images.unsplash.com/photo-1627990316935-9c473904206e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBwb2xpdGljcyUyMGxhd3xlbnwxfHx8fDE3NzUxNzExMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: <Radio className="w-10 h-10" />,
      category: 'MEDIA',
      categoryColor: 'text-orange-400',
      label: 'Informazione',
      title: 'MIRAGE NEWS',
      gradient: 'from-orange-950/50 via-orange-900/30 to-orange-950/50',
      borderColor: 'border-orange-500/20 hover:border-orange-500/40',
      description: 'Mirage News è la principale fonte di informazione della città. Questa fazione è composta da giornalisti e fotografi che raccontano le notizie e le storie della città.',
      backgroundImage: 'https://images.unsplash.com/photo-1759659334772-c3a05b8178e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdzJTIwbWVkaWElMjBicm9hZGNhc3RpbmclMjBqb3VybmFsaXN0fGVufDF8fHx8MTc3NTE3MTE0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <section id="factions" className="relative py-20 overflow-hidden">
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
            <GlitchTitle first="SCEGLI IL TUO" second="DESTINO" className="leading-tight" firstClassName="text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.18)]" secondClassName="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(249,115,22,0.35)]" />
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Quale ruolo interpreterai nella caotica città di Mirage? Ogni fazione ha
            meccaniche uniche, gerarchie interne e obiettivi specifici. Passa il cursore per
            scoprire di più.
          </p>
        </motion.div>

        {/* Factions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {factions.map((faction, index) => (
            <FactionCard key={index} faction={faction} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
