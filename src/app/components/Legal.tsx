'use client';

import { motion } from 'motion/react';
import { ScrollText, ShieldCheck } from 'lucide-react';

const privacySections = [
  {
    title: '1. Dati che possiamo raccogliere',
    body:
      'Possiamo raccogliere dati tecnici e operativi necessari al funzionamento del sito, del Discord e del server, come indirizzo IP, identificativi tecnici, username, dati di accesso, ticket di supporto e cronologia essenziale delle attività di moderazione.',
  },
  {
    title: '2. Finalità del trattamento',
    body:
      'Questi dati vengono usati per erogare il servizio, gestire whitelist e candidature, prevenire abusi, rispondere al supporto, migliorare stabilità e sicurezza della piattaforma e far rispettare il regolamento della community.',
  },
  {
    title: '3. Cookie e servizi terzi',
    body:
      'Il sito può utilizzare cookie tecnici o strumenti equivalenti per funzionalità, misurazioni anonime e sicurezza. Eventuali servizi terzi come Discord, piattaforme di pagamento o hosting applicano anche le loro policy indipendenti.',
  },
  {
    title: '4. Conservazione dei dati',
    body:
      'Conserviamo i dati solo per il tempo necessario alle finalità operative, amministrative e di sicurezza del progetto, oppure per il periodo richiesto da obblighi di legge o dalla gestione di contestazioni e ban appeal.',
  },
  {
    title: '5. Diritti dell’utente',
    body:
      'Puoi richiedere accesso, rettifica o cancellazione dei dati compatibilmente con gli obblighi tecnici, legali e di sicurezza della community. Alcuni dati minimi potrebbero essere mantenuti per prevenzione frodi, ban evasion o tutela del server.',
  },
];

const termsSections = [
  {
    title: '1. Accettazione dei termini',
    body:
      'Accedendo al sito, al Discord o al server Mirage RP accetti queste condizioni e tutte le regole operative pubblicate nelle sezioni ufficiali della community.',
  },
  {
    title: '2. Requisiti di comportamento',
    body:
      'Sono vietati cheating, exploit, molestie, discriminazione, vendita non autorizzata di account o beni virtuali, diffusione di contenuti illeciti e qualsiasi tentativo di compromettere stabilità, economia o fair play del server.',
  },
  {
    title: '3. Account, whitelist e sanzioni',
    body:
      'Lo staff può sospendere, limitare o revocare accessi, whitelist e privilegi in caso di violazioni del regolamento, comportamenti tossici, false dichiarazioni o attività ritenute dannose per la community.',
  },
  {
    title: '4. Donazioni e contenuti digitali',
    body:
      'Eventuali acquisti, donazioni o benefici digitali sono legati al supporto del progetto e possono essere modificati, sospesi o rimossi per ragioni tecniche, di bilanciamento o di conformità alle policy della piattaforma.',
  },
  {
    title: '5. Proprietà intellettuale e disclaimer',
    body:
      'Marchi, loghi, testi, interfacce e materiali originali di Mirage RP restano di proprietà dei rispettivi titolari. Mirage RP è un progetto indipendente e non affiliato a Rockstar Games, Take-Two, Cfx.re o FiveM salvo ove espressamente indicato.',
  },
];

function LegalCard({
  id,
  icon,
  title,
  subtitle,
  sections,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  sections: { title: string; body: string }[];
}) {
  return (
    <motion.article
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative rounded-3xl bg-white/5 backdrop-blur-xl p-6 md:p-8 border border-white/10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10 pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
            {icon}
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white">{title}</h3>
            <p className="text-sm md:text-base text-gray-400 mt-1">{subtitle}</p>
          </div>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.title} className="rounded-2xl bg-black/20 border border-white/5 p-4 md:p-5">
              <h4 className="text-white font-bold mb-2">{section.title}</h4>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function Legal() {
  return (
    <section id="legal" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-sm uppercase tracking-[0.24em] mb-5">
            Sezione legale
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Privacy e termini sempre accessibili</h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Qui trovi una base chiara e leggibile per privacy policy e termini di servizio del progetto, organizzata come nelle landing page più comuni del settore gaming e roleplay.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <LegalCard
            id="privacy-policy"
            icon={<ShieldCheck className="w-6 h-6" />}
            title="Privacy Policy"
            subtitle="Come gestiamo dati, sicurezza e servizi collegati alla community."
            sections={privacySections}
          />
          <LegalCard
            id="termini-di-servizio"
            icon={<ScrollText className="w-6 h-6" />}
            title="Termini di Servizio"
            subtitle="Le regole base di utilizzo del sito, del Discord e del server Mirage RP."
            sections={termsSections}
          />
        </div>
      </div>
    </section>
  );
}
