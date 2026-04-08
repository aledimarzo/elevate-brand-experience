'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Activity, Gauge, Globe2, MapPinned, Server, Shield, Sparkles, Trophy, Users, X } from 'lucide-react';
import { useEffect } from 'react';
import type { ServerStatus } from '../hooks/useServerStatus';

function DetailCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent: 'green' | 'orange' | 'purple' | 'blue'; }) {
  const accentMap = {
    green: 'border-emerald-400/14 bg-emerald-500/7',
    orange: 'border-orange-400/14 bg-orange-500/7',
    purple: 'border-purple-400/14 bg-purple-500/7',
    blue: 'border-sky-400/14 bg-sky-500/7',
  } as const;

  return (
    <div className={`rounded-2xl border p-4 ${accentMap[accent]}`}>
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/20">{icon}</div>
        <span className="text-[11px] uppercase tracking-[0.18em] text-gray-400">{label}</span>
      </div>
      <div className="text-xl font-bold text-white">{value}</div>
    </div>
  );
}

export function ServerStatsModal({ isOpen, onClose, serverStatus }: { isOpen: boolean; onClose: () => void; serverStatus: ServerStatus; }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const occupancy = serverStatus.maxPlayers > 0 ? Math.round((serverStatus.players / serverStatus.maxPlayers) * 100) : 0;
  const queueEstimate = Math.max(0, Math.round(serverStatus.players * 0.08));
  const raw = serverStatus.raw || {};
  const rankValue = typeof serverStatus.rank === 'number' ? `#${serverStatus.rank}` : 'N/D';
  const upvotes = typeof serverStatus.upvoteCount === 'number' ? serverStatus.upvoteCount.toLocaleString('it-IT') : 'N/D';
  const burst = typeof serverStatus.burstPower === 'number' ? serverStatus.burstPower.toLocaleString('it-IT') : 'N/D';
  const tags = serverStatus.tags?.length ? serverStatus.tags : ['Italiano', 'Roleplay', 'Community'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[130] flex items-center justify-center px-4 py-5 sm:px-5 sm:py-6" onClick={onClose}>
          <div className="absolute inset-0 bg-[rgba(4,4,10,0.78)] backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.985 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative z-10 w-full max-w-5xl max-h-[88vh] overflow-hidden rounded-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05))] p-[1px] shadow-[0_30px_100px_rgba(0,0,0,0.6)]"
          >
            <div className="relative h-full max-h-[88vh] overflow-hidden rounded-[29px] border border-white/10 bg-[#0b0b12]/97">
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_18%),radial-gradient(circle_at_top,rgba(249,115,22,0.13),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_28%)]" />

              <div className="relative z-10 flex items-start justify-between gap-4 border-b border-white/8 px-5 py-5 md:px-6">
                <div>
                  <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-400/15 bg-orange-500/8 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-orange-300">
                    FiveM · Server Insights
                  </span>
                  <h2 className="text-2xl md:text-[2rem] font-black tracking-tight text-white">
                    {serverStatus.projectName || serverStatus.serverName || 'Mirage RP'}
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm text-gray-400 leading-relaxed">
                    Panorama rapido dello stato del server, occupazione slot e informazioni pubbliche disponibili dalla scheda FiveM.
                  </p>
                </div>

                <button onClick={onClose} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white" aria-label="Chiudi dettagli server">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative z-10 max-h-[calc(88vh-112px)] overflow-y-auto px-5 py-5 md:px-6 md:py-6 modal-scroll">
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.3fr_0.9fr]">
                  <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.025))] p-5 md:p-6">
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border ${serverStatus.online ? 'border-emerald-400/20 bg-emerald-500/10 text-emerald-300' : 'border-red-400/20 bg-red-500/10 text-red-300'}`}>
                        <span className={`h-2.5 w-2.5 rounded-full ${serverStatus.online ? 'bg-emerald-400' : 'bg-red-400'}`} />
                        {serverStatus.online ? 'Server online' : 'Server offline'}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300">
                        <Server className="h-3.5 w-3.5 text-orange-300" />
                        Codice CFX: g6md4x
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <DetailCard icon={<Users className="h-5 w-5 text-emerald-300" />} label="Giocatori connessi" value={`${serverStatus.players}/${serverStatus.maxPlayers}`} accent="green" />
                      <DetailCard icon={<Gauge className="h-5 w-5 text-orange-300" />} label="Occupazione slot" value={`${occupancy}%`} accent="orange" />
                      <DetailCard icon={<Trophy className="h-5 w-5 text-purple-300" />} label="Upvote server" value={upvotes} accent="purple" />
                      <DetailCard icon={<Activity className="h-5 w-5 text-sky-300" />} label="Posizione / ranking" value={rankValue} accent="blue" />
                      <DetailCard icon={<Sparkles className="h-5 w-5 text-orange-300" />} label="Burst power" value={burst} accent="orange" />
                      <DetailCard icon={<Shield className="h-5 w-5 text-purple-300" />} label="Modalità accesso" value={serverStatus.private ? 'Privato / whitelist' : 'Pubblico'} accent="purple" />
                    </div>

                    <div className="mt-6 rounded-2xl border border-white/8 bg-black/20 p-4 md:p-5">
                      <div className="mb-3 flex items-center justify-between gap-4 text-sm">
                        <span className="text-[11px] uppercase tracking-[0.18em] text-gray-400">Capienza server</span>
                        <span className="font-semibold text-white">{serverStatus.players} su {serverStatus.maxPlayers} slot</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-white/6">
                        <motion.div className="h-full rounded-full bg-[linear-gradient(90deg,rgba(249,115,22,0.95),rgba(168,85,247,0.95))]" initial={{ width: 0 }} animate={{ width: `${Math.min(occupancy, 100)}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} />
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                        <span>Queue stimata: ~{queueEstimate}</span>
                        <span>•</span>
                        <span>{serverStatus.fallback ? 'Nodo fallback attivo' : 'Nodo primario attivo'}</span>
                        {serverStatus.lastSeen ? <><span>•</span><span>Ultimo rilevamento: {new Date(serverStatus.lastSeen).toLocaleString('it-IT')}</span></> : null}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.025))] p-5">
                      <h3 className="mb-4 text-lg font-bold text-white">Dettagli pubblici</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start justify-between gap-3 border-b border-white/6 pb-3"><span className="text-gray-400">Nome server</span><span className="text-right font-medium text-white">{serverStatus.serverName || 'Mirage RP'}</span></div>
                        <div className="flex items-start justify-between gap-3 border-b border-white/6 pb-3"><span className="text-gray-400">Hostname progetto</span><span className="text-right font-medium text-white">{serverStatus.projectName || 'Mirage RP'}</span></div>
                        <div className="flex items-start justify-between gap-3 border-b border-white/6 pb-3"><span className="text-gray-400">Gametype</span><span className="text-right font-medium text-white">{serverStatus.gameType || 'Roleplay'}</span></div>
                        <div className="flex items-start justify-between gap-3 border-b border-white/6 pb-3"><span className="text-gray-400">Mappa / build</span><span className="text-right font-medium text-white">{serverStatus.mapName || 'Los Santos'}</span></div>
                        <div className="flex items-start justify-between gap-3 border-b border-white/6 pb-3"><span className="text-gray-400">Locale</span><span className="text-right font-medium text-white">{serverStatus.locale || 'it-IT'}</span></div>
                        <div className="flex items-start justify-between gap-3 border-b border-white/6 pb-3"><span className="text-gray-400">Paese</span><span className="text-right font-medium text-white">{serverStatus.country || 'N/D'}</span></div>
                        <div className="flex items-start justify-between gap-3 border-b border-white/6 pb-3"><span className="text-gray-400">Owner</span><span className="text-right font-medium text-white">{serverStatus.ownerName || 'N/D'}</span></div>
                        <div className="flex items-start justify-between gap-3"><span className="text-gray-400">Endpoint</span><span className="text-right font-medium text-white">{serverStatus.connectEndpoint || '45.14.184.155'}</span></div>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.025))] p-5">
                      <div className="mb-4 flex items-center gap-2">
                        <Globe2 className="h-4 w-4 text-orange-300" />
                        <h3 className="text-lg font-bold text-white">Tag e presenza</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-white/8 bg-white/5 px-3 py-1.5 text-xs text-gray-200">{tag}</span>
                        ))}
                      </div>
                      <div className="mt-4 rounded-2xl border border-white/8 bg-black/20 p-4 text-sm leading-6 text-gray-300">
                        {serverStatus.projectDescription || 'Server FiveM orientato al roleplay con ecosistema community, fazioni, economia ed esperienza curata.'}
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.025))] p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <MapPinned className="h-4 w-4 text-purple-300" />
                        <h3 className="text-lg font-bold text-white">Join rapido</h3>
                      </div>
                      <a href={serverStatus.joinUrl || 'https://cfx.re/join/g6md4x'} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center rounded-2xl border border-orange-400/15 bg-orange-500/10 px-4 py-3 text-sm font-semibold text-orange-200 transition-colors hover:bg-orange-500/16">
                        Apri scheda / connessione FiveM
                      </a>
                    </div>
                  </div>
                </div>

                {raw && Object.keys(raw).length > 0 ? <div className="sr-only">raw server data loaded</div> : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
