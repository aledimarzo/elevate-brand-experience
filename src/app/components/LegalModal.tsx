'use client';

import { AnimatePresence, motion } from 'motion/react';
import { ScrollText, ShieldCheck, X } from 'lucide-react';
import { useEffect } from 'react';

const privacySections = [
  {
    title: 'Dati raccolti',
    body:
      'Raccogliamo solo dati tecnici e operativi essenziali al funzionamento del sito, del Discord e del server, come IP, username, log di accesso, ticket e attività di moderazione strettamente necessarie.',
  },
  {
    title: 'Perché li usiamo',
    body:
      'Servono per erogare i servizi, gestire whitelist e supporto, prevenire abusi, migliorare sicurezza e stabilità e far rispettare il regolamento della community.',
  },
  {
    title: 'Cookie e terze parti',
    body:
      'Possiamo usare cookie tecnici o strumenti equivalenti. Servizi esterni come Discord, hosting o pagamenti applicano inoltre le loro policy indipendenti.',
  },
  {
    title: 'Conservazione',
    body:
      'I dati vengono mantenuti solo per il tempo necessario a finalità operative, amministrative, di sicurezza o per obblighi di legge e gestione di contestazioni.',
  },
  {
    title: 'Diritti utente',
    body:
      'Puoi chiedere accesso, rettifica o cancellazione nei limiti consentiti da esigenze tecniche, legali e di sicurezza del progetto.',
  },
];

const termsSections = [
  {
    title: 'Accettazione',
    body:
      'Accedendo al sito, al Discord o al server accetti i presenti termini e le regole ufficiali pubblicate dalla community Mirage RP.',
  },
  {
    title: 'Condotta',
    body:
      'Sono vietati cheating, exploit, molestie, discriminazione, vendita non autorizzata di account o beni virtuali e qualsiasi attività dannosa per server e community.',
  },
  {
    title: 'Whitelist e sanzioni',
    body:
      'Lo staff può limitare o revocare accessi, privilegi o whitelist in caso di violazioni, false dichiarazioni o comportamenti ritenuti nocivi.',
  },
  {
    title: 'Acquisti e benefici',
    body:
      'Eventuali donazioni o contenuti digitali possono essere modificati o rimossi per ragioni tecniche, di bilanciamento o conformità alle policy della piattaforma.',
  },
  {
    title: 'Disclaimer',
    body:
      'Mirage RP è un progetto indipendente e non affiliato a Rockstar Games, Take-Two, Cfx.re o FiveM salvo ove espressamente indicato.',
  },
];

function LegalSurface({
  icon,
  title,
  subtitle,
  sections,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  sections: { title: string; body: string }[];
}) {
  return (
    <section className="relative w-full rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(11,11,18,0.96),rgba(7,7,14,0.94))] shadow-[0_18px_60px_rgba(0,0,0,0.36)]">
      <div className="pointer-events-none absolute inset-0 rounded-[26px] bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.10),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.10),transparent_28%)]" />

      <div className="relative border-b border-white/8 px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-500/10 text-orange-300 shadow-[0_0_24px_rgba(249,115,22,0.12)]">
            {icon}
          </div>
          <div className="min-w-0">
            <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl">{title}</h3>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-gray-400">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="relative p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {sections.map((section, index) => (
            <article
              key={section.title}
              className="min-w-0 rounded-2xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] px-4 py-4 sm:px-5"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[11px] font-semibold text-orange-300">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <h4 className="text-base font-semibold text-white">{section.title}</h4>
              </div>
              <p className="text-sm leading-7 text-gray-300">{section.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LegalModal({
  isOpen,
  onClose,
  initialTab = 'privacy',
}: {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}) {
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

  const showPrivacy = initialTab === 'privacy';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-[rgba(3,4,9,0.84)] backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative z-10 w-full max-w-5xl"
          >
            <div className="relative overflow-hidden rounded-[32px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-[1px] shadow-[0_28px_100px_rgba(0,0,0,0.58)]">
              <div className="relative flex max-h-[88vh] min-h-[420px] flex-col overflow-hidden rounded-[31px] bg-[#080910]/96">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_18%),radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.10),transparent_28%)]" />

                <header className="relative z-10 flex items-start justify-between gap-4 border-b border-white/8 px-5 py-5 sm:px-6 sm:py-6">
                  <div className="min-w-0">
                    <span className="mb-3 inline-flex items-center rounded-full border border-orange-400/15 bg-orange-500/8 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-orange-300">
                      Mirage RP · Sezione legale
                    </span>
                    <h2 className="text-3xl font-black tracking-tight text-white sm:text-[2.2rem]">
                      {showPrivacy ? 'Privacy Policy' : 'Termini di Servizio'}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400">
                      {showPrivacy
                        ? 'Una panoramica chiara, compatta e professionale su dati, sicurezza e servizi collegati alla community.'
                        : 'Le regole essenziali per utilizzare sito, Discord e server Mirage RP in modo corretto e trasparente.'}
                    </p>
                  </div>

                  <button
                    onClick={onClose}
                    className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="Chiudi sezione legale"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </header>

                <div className="modal-scroll relative z-10 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
                  <LegalSurface
                    icon={showPrivacy ? <ShieldCheck className="h-5 w-5" /> : <ScrollText className="h-5 w-5" />}
                    title={showPrivacy ? 'Privacy Policy' : 'Termini di Servizio'}
                    subtitle={showPrivacy
                      ? 'Informazioni essenziali sulla raccolta e gestione dei dati della community.'
                      : 'Condizioni d’uso e norme generali del progetto Mirage RP.'}
                    sections={showPrivacy ? privacySections : termsSections}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
