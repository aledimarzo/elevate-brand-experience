'use client';

import { motion } from 'motion/react';
import { GlitchTitle } from './GlitchTitle';
import { FramerTiltGlossyCard } from './FramerTiltGlossyCard';
import { Download, MessageSquare, BookOpen, UserCheck, Play, ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface Step {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
  href?: string;
}

function StepCard({ step, index, total }: { step: Step; index: number; total: number }) {
  const content = (
    <div className="group relative h-full min-h-[320px] [perspective:1200px]">
      <FramerTiltGlossyCard className="h-full w-full">
        <div className="relative h-full overflow-hidden rounded-[24px] p-6 [transform-style:preserve-3d]">
          <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/8 group-hover:ring-orange-400/30 transition-colors duration-300" />

          <div className="absolute top-6 right-6 text-6xl font-black text-white/10 transition-all duration-300 group-hover:text-orange-300/45 group-hover:drop-shadow-[0_0_20px_rgba(251,146,60,0.7)]" style={{ transform: 'translateZ(52px)' }}>
            {step.number}
          </div>

          <div className="relative z-10 flex h-full flex-col" style={{ transform: 'translateZ(46px)' }}>
            <div className="relative mb-6">
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} relative z-10 shadow-[0_0_24px_rgba(249,115,22,0.28)]`}>
                <div className="text-white">{step.icon}</div>
              </div>
              <div className="absolute inset-0 w-14 h-14 bg-orange-500 blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
            </div>

            <h3 className="text-lg font-bold text-white mb-3 pr-12">{step.title}</h3>
            <p className="text-gray-300/90 text-sm leading-relaxed">{step.description}</p>
          </div>
        </div>
      </FramerTiltGlossyCard>

      {index < total - 1 && (
        <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-50">
          <motion.div
            animate={{ x: [0, 3, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowRight className="w-5 h-5 text-orange-500/60 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
          </motion.div>
        </div>
      )}
    </div>
  );

  if (step.href) {
    return (
      <a href={step.href} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
        {content}
      </a>
    );
  }

  return content;
}

export function HowToStart() {
  const steps: Step[] = [
    {
      number: '01',
      icon: <Download className="w-8 h-8" />,
      title: 'Scarica FiveM',
      description: 'Assicurati di avere una copia legittima di GTA V e installa il client FiveM dal sito ufficiale.',
      color: 'from-orange-500 to-orange-600',
      href: 'https://fivem.net',
    },
    {
      number: '02',
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Entra nel Discord',
      description: 'Unisciti al nostro server Discord, il cuore della community. Collega i tuoi account per sbloccare i canali.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      number: '03',
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Leggi il Regolamento',
      description: 'Il nostro server è strict-RP. Conoscere le regole è fondamentale per garantire una buona esperienza a tutti.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      number: '04',
      icon: <UserCheck className="w-8 h-8" />,
      title: 'Completa la Whitelist',
      description: 'Sostieni un breve colloquio vocale con un membro dello staff per dimostrare le tue capacità di Roleplay.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      number: '05',
      icon: <Play className="w-8 h-8" />,
      title: 'Crea il Personaggio',
      description: 'Collegati al server, crea il tuo personaggio, scegli i suoi tratti e inizia la tua avventura a Los Santos.',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <section id="howtostart" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
            <GlitchTitle first="COME" second="INIZIARE" className="leading-tight" />
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Entrare in Mirage RP è un processo progettato per filtrare i troll e garantire che solo veri giocatori Roleplay abbiano accesso alla città.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex items-stretch"
            >
              <StepCard step={step} index={index} total={steps.length} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center"
        >
          <motion.button
            className="group relative px-10 py-5 bg-gradient-to-r from-orange-600 to-orange-500 text-white text-lg font-bold rounded-xl overflow-hidden shadow-lg shadow-orange-500/30"
            whileHover={{ scale: 1.05, y: [0, -10, 0] }}
            whileTap={{ scale: 0.95 }}
            transition={{ y: { duration: 0.5, ease: 'easeInOut' } }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-orange-400/0 group-hover:bg-orange-400/30 blur-xl transition-all duration-300" />
            <span className="relative z-10 flex items-center gap-3">
              RICHIEDI LA WHITELIST
              <MessageSquare className="w-6 h-6" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
