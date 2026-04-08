'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Shield, Crown, Users, Gavel, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { GlitchTitle } from './GlitchTitle';

interface TeamMember {
  name: string;
  role: string;
  discord: string;
}

interface StaffTeam {
  name: string;
  role: string;
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
  description: string;
  members: TeamMember[];
}

function MemberCard({ member, index, gradient }: { member: TeamMember; index: number; gradient: string }) {
  const [isHovered, setIsHovered] = useState(false);

  // Detect if device supports hover (desktop) vs touch (mobile)
  const handleInteraction = () => {
    // On touch devices, don't set hover state
    if (window.matchMedia('(hover: none)').matches) {
      return;
    }
    setIsHovered(true);
  };

  const handleInteractionEnd = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={handleInteraction}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={(e) => {
        // Prevent hover state on touch devices
        e.currentTarget.style.pointerEvents = 'auto';
      }}
    >
      <div className="relative h-full bg-gradient-to-br from-white/5 to-white/0 rounded-xl p-6 backdrop-blur-sm overflow-hidden transition-all duration-500"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Background Glow */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0`}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Animated Orb */}
        <motion.div
          className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${gradient} opacity-20 blur-2xl`}
          animate={{
            opacity: isHovered ? 0.4 : 0.2,
            scale: isHovered ? 1.3 : 1,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Avatar Circle */}
        <motion.div
          className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${gradient} mb-4 flex items-center justify-center`}
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-2xl font-black text-white">
            {member.name.charAt(0)}
          </span>

          {/* Pulse Ring */}
          <motion.div
            className={`absolute inset-0 rounded-full`}
            style={{
              border: '2px solid rgba(255, 255, 255, 0.5)',
            }}
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              opacity: isHovered ? [0.5, 0, 0.5] : 0,
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
            }}
          />
        </motion.div>

        {/* Name */}
        <h4 className="text-xl font-bold text-white mb-1 relative z-10">
          {member.name}
        </h4>

        {/* Role */}
        <p className="text-sm text-gray-400 mb-2 relative z-10">{member.role}</p>

        {/* Discord */}
        <motion.div
          className="inline-block px-3 py-1 rounded-full bg-white/5 relative z-10"
          style={{
            border: isHovered ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <span className="text-xs text-gray-400">{member.discord}</span>
        </motion.div>

        {/* Bottom Line Effect */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradient}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </motion.div>
  );
}

function StaffCard({ team, index, onClick }: { team: StaffTeam; index: number; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  // Detect if device supports hover (desktop) vs touch (mobile)
  const handleInteraction = () => {
    // On touch devices, don't set hover state
    if (window.matchMedia('(hover: none)').matches) {
      return;
    }
    setIsHovered(true);
  };

  const handleInteractionEnd = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative cursor-pointer"
      onMouseEnter={handleInteraction}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={(e) => {
        // Prevent hover state on touch devices
        e.currentTarget.style.pointerEvents = 'auto';
      }}
      onClick={onClick}
    >
      <div className={`relative h-full bg-gradient-to-br from-white/5 to-white/0 border ${team.borderColor} rounded-2xl p-8 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-opacity-80 hover:shadow-2xl flex flex-col`}>
        {/* Background Glow Effect */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${team.gradient} opacity-0`}
          animate={{ opacity: isHovered ? 0.15 : 0 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Animated Glow Orb */}
        <motion.div
          className={`absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br ${team.gradient} opacity-20 blur-3xl`}
          animate={{
            opacity: isHovered ? 0.4 : 0.2,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Icon Container */}
        <motion.div
          className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${team.gradient} mb-6 flex-shrink-0`}
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotateY: isHovered ? 360 : 0,
          }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
        >
          <div className="text-white">{team.icon}</div>
          
          {/* LED Ring Effect */}
          <motion.div
            className={`absolute inset-0 rounded-2xl border-2 ${team.borderColor}`}
            animate={{
              opacity: isHovered ? [0.5, 1, 0.5] : 0,
              scale: isHovered ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Role Badge */}
        <motion.div
          className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${team.gradient} mb-4 relative z-10 self-start flex-shrink-0`}
          animate={{
            y: isHovered ? -5 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            {team.role}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h3
          className="text-2xl font-black text-white mb-3 relative z-10 flex-shrink-0"
          animate={{
            x: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {team.name}
        </motion.h3>

        {/* Description */}

        {/* Member Count */}
        <div className="flex items-center gap-2 relative z-10 mb-3 flex-shrink-0">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">
            {team.members.length} {team.members.length === 1 ? 'Membro' : 'Membri'}
          </span>
        </div>

        {/* Click Indicator */}
        <motion.div
          className="text-xs text-gray-500 relative z-10 flex-shrink-0"
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : -10,
          }}
          transition={{ duration: 0.3 }}
        >
          👉 Clicca per vedere i membri
        </motion.div>

        {/* Bottom Glow Line */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${team.gradient}`}
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          style={{ transformOrigin: 'left' }}
        />

        {/* Corner Accent */}
        <motion.div
          className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${team.gradient} opacity-0 blur-2xl`}
          animate={{
            opacity: isHovered ? 0.6 : 0,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}

export function Staff() {
  const [selectedTeam, setSelectedTeam] = useState<StaffTeam | null>(null);

  const staffTeams: StaffTeam[] = [
    {
      name: 'Admin Team',
      role: 'Amministratori',
      icon: <Crown className="w-10 h-10" />,
      gradient: 'from-yellow-500 to-orange-600',
      borderColor: 'border-yellow-500/30',
      description: 'Gestione completa del server, decisioni strategiche e supervisione di tutte le operazioni.',
      members: [
        { name: 'Marco Rossi', role: 'Head Admin', discord: '@MarcoR#1234' },
        { name: 'Luca Bianchi', role: 'Senior Admin', discord: '@LucaB#5678' },
        { name: 'Sofia Verdi', role: 'Admin', discord: '@SofiaV#9012' },
        { name: 'Alessandro Neri', role: 'Admin', discord: '@AlessN#3456' },
        { name: 'Giulia Romano', role: 'Admin', discord: '@GiuliaR#7890' },
      ],
    },
    {
      name: 'Moderator Team',
      role: 'Moderatori',
      icon: <Shield className="w-10 h-10" />,
      gradient: 'from-blue-500 to-purple-600',
      borderColor: 'border-blue-500/30',
      description: 'Supporto ai giocatori, gestione ticket e mantenimento delle regole del roleplay.',
      members: [
        { name: 'Matteo Ferrari', role: 'Head Moderator', discord: '@MatteoF#2345' },
        { name: 'Chiara Ricci', role: 'Senior Moderator', discord: '@ChiaraR#6789' },
        { name: 'Andrea Marino', role: 'Moderator', discord: '@AndreaM#0123' },
        { name: 'Francesca Gallo', role: 'Moderator', discord: '@FrancG#4567' },
      ],
    },
    {
      name: 'Support Team',
      role: 'Supporto',
      icon: <Users className="w-10 h-10" />,
      gradient: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-500/30',
      description: 'Assistenza tecnica, guida ai nuovi giocatori e risoluzione problemi.',
      members: [
        { name: 'Lorenzo Conti', role: 'Support Lead', discord: '@LorenzoC#8901' },
        { name: 'Elena Greco', role: 'Support Specialist', discord: '@ElenaG#2345' },
        { name: 'Davide Lombardi', role: 'Support Helper', discord: '@DavideL#6789' },
      ],
    },
    {
      name: 'Management Team',
      role: 'Gestione',
      icon: <Gavel className="w-10 h-10" />,
      gradient: 'from-orange-500 to-red-600',
      borderColor: 'border-orange-500/30',
      description: 'Coordinamento eventi, aggiornamenti server e sviluppo contenuti.',
      members: [
        { name: 'Simone Costa', role: 'Project Manager', discord: '@SimoneC#0123' },
        { name: 'Valentina Mancini', role: 'Event Manager', discord: '@ValenM#4567' },
      ],
    },
  ];

  return (
    <section id="staff" className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >

          <div className="relative mb-6 inline-flex max-w-full flex-col items-center">
            <div className="absolute inset-x-[12%] bottom-0 h-5 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.26)_0%,rgba(249,115,22,0.12)_38%,transparent_78%)] blur-2xl" />
            <h2 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
              <span className="inline-flex flex-wrap items-baseline justify-center gap-x-2 sm:gap-x-4">
                <GlitchTitle
                  first="LO STAFF DI"
                  className="leading-none"
                  firstClassName="text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.18)]"
                />
                <GlitchTitle
                  first="MIRAGE"
                  className="leading-none"
                  firstClassName="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(249,115,22,0.38)]"
                />
                <GlitchTitle
                  first="RP"
                  className="leading-none"
                  firstClassName="text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.12)]"
                />
              </span>
            </h2>
          </div>

          <p className="mx-auto max-w-6xl text-xl text-gray-400 lg:whitespace-nowrap">
            Il nostro team dedicato lavora 24/7 per garantirti la migliore esperienza di roleplay su <span className="text-orange-400 font-bold">MIRAGE</span>
          </p>
        </motion.div>

        {/* Staff Teams or Members View */}
        <AnimatePresence mode="wait">
          {!selectedTeam ? (
            // Teams Grid
            <motion.div
              key="teams"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {staffTeams.map((team, index) => (
                <StaffCard
                  key={index}
                  team={team}
                  index={index}
                  onClick={() => setSelectedTeam(team)}
                />
              ))}
            </motion.div>
          ) : (
            // Members View
            <motion.div
              key="members"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Back Button */}
              <motion.button
                onClick={() => setSelectedTeam(null)}
                className="flex items-center gap-2 mb-8 px-6 py-3 rounded-full bg-white/5 transition-all group"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{ x: -5 }}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Torna ai Team</span>
              </motion.button>

              {/* Team Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
              >
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br ${selectedTeam.gradient} mb-6`}>
                  <div className="text-white scale-125">{selectedTeam.icon}</div>
                </div>
                <h3 className="text-4xl font-black text-white mb-3">
                  {selectedTeam.name}
                </h3>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  {selectedTeam.description}
                </p>
              </motion.div>

              {/* Members Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {selectedTeam.members.map((member, index) => (
                  <MemberCard
                    key={index}
                    member={member}
                    index={index}
                    gradient={selectedTeam.gradient}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section - Only show when no team is selected */}
        {!selectedTeam && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <p className="text-gray-400 mb-6">Vuoi entrare a far parte del nostro staff?</p>
            <motion.a
              href="#"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold text-lg relative overflow-hidden shadow-lg shadow-orange-500/30 group"
              whileHover={{ 
                scale: 1.05,
                y: [0, -10, 0],
              }}
              whileTap={{ scale: 0.95 }}
              transition={{
                y: {
                  duration: 0.5,
                  ease: "easeInOut"
                }
              }}
            >
              {/* LED Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-700 opacity-0 group-hover:opacity-100"
                transition={{
                  duration: 0.3,
                }}
              />
              
              <span className="relative z-10">CANDIDATI ORA</span>
              <Users className="w-6 h-6 relative z-10" />
              
              {/* Glow */}
              <div className="absolute inset-0 bg-orange-400/0 group-hover:bg-orange-400/30 blur-xl transition-all duration-300" />
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
