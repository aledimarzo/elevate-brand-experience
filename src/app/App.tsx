import { lazy, Suspense, useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { NetworkAnimation } from './components/NetworkAnimation';
import { LegalModal } from './components/LegalModal';

const Stats = lazy(() => import('./components/Stats').then((module) => ({ default: module.Stats })));
const Features = lazy(() => import('./components/Features').then((module) => ({ default: module.Features })));
const Factions = lazy(() => import('./components/Factions').then((module) => ({ default: module.Factions })));
const HowToStart = lazy(() => import('./components/HowToStart').then((module) => ({ default: module.HowToStart })));
const Staff = lazy(() => import('./components/Staff').then((module) => ({ default: module.Staff })));

function SectionWrapper({ children, id }: { children: React.ReactNode; id: string }) {
  return <section id={id} className="relative overflow-visible [content-visibility:auto] [contain-intrinsic-size:1px_900px]">{children}</section>;
}

function SectionSkeleton() {
  return <div className="h-24" aria-hidden="true" />;
}

export default function App() {
  const [legalModal, setLegalModal] = useState<{ open: boolean; tab: 'privacy' | 'terms' }>({
    open: false,
    tab: 'privacy',
  });

  const openPrivacy = useCallback(() => setLegalModal({ open: true, tab: 'privacy' }), []);
  const openTerms = useCallback(() => setLegalModal({ open: true, tab: 'terms' }), []);
  const closeLegalModal = useCallback(() => setLegalModal((current) => ({ ...current, open: false })), []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0a0a0f] text-white">
      <div className="fixed inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1525876285538-4cc52d170c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3MlMjBhbmdlbGVzJTIwc2t5bGluZSUyMG5pZ2h0JTIwNGslMjBjaXR5c2NhcGV8ZW58MXx8fHwxNzc1MjEzMzEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Los Santos Background"
          className="h-full w-full object-cover opacity-[0.74] md:opacity-[0.78] [will-change:transform]"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <NetworkAnimation
          className="absolute inset-0 opacity-[0.07]"
          nodeOpacity={0.07}
          connectionOpacity={0.022}
          nodeCount={10}
          animationSpeed={0.44}
          mouseAttractionStrength={0.08}
          expansionSpeed={0.3}
          baseMovementSpeed={0.12}
          dampingFactor={0.998}
        />
        <div className="absolute inset-0 bg-[#09070d]/48 md:bg-[#09070d]/54" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(70,40,28,0.08)_0%,rgba(28,20,30,0.16)_18%,rgba(13,11,18,0.32)_42%,rgba(6,6,10,0.74)_74%,rgba(3,3,6,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_28%,rgba(8,6,10,0.16)_64%,rgba(4,3,6,0.44)_100%)]" />
      </div>

      <div className="relative z-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[100svh] bg-[linear-gradient(180deg,rgba(255,190,76,0.03)_0%,rgba(255,152,46,0.05)_16%,rgba(72,44,88,0.03)_34%,rgba(0,0,0,0)_78%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[100svh] bg-[linear-gradient(90deg,rgba(2,2,4,0.995)_0%,rgba(4,4,7,0.95)_10%,rgba(7,7,10,0.56)_25%,rgba(0,0,0,0.08)_50%,rgba(7,7,10,0.58)_75%,rgba(4,4,7,0.95)_90%,rgba(2,2,4,0.995)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[100svh] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_24%,rgba(8,6,10,0.16)_68%,rgba(3,3,5,0.54)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-[calc(100svh-8rem)] z-0 h-40 bg-[linear-gradient(180deg,rgba(3,3,5,0)_0%,rgba(4,4,7,0.28)_26%,rgba(5,5,9,0.82)_72%,rgba(5,5,9,0.95)_100%)] blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 top-[calc(100svh-2rem)] z-0 h-24 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,rgba(5,5,9,0.18)_36%,rgba(5,5,9,0)_72%)] blur-2xl" />
        <div className="pointer-events-none absolute inset-x-0 top-[100svh] bottom-0 z-0 bg-[linear-gradient(180deg,rgba(5,5,9,0.90)_0%,rgba(5,5,9,0.90)_100%)]" />
        <Navbar />
        <Hero />
        <Suspense fallback={<SectionSkeleton />}>
          <SectionWrapper id="stats-section">
            <Stats />
          </SectionWrapper>
          <SectionWrapper id="features-section">
            <Features />
          </SectionWrapper>
          <SectionWrapper id="factions-section">
            <Factions />
          </SectionWrapper>
          <SectionWrapper id="howtostart-section">
            <HowToStart />
          </SectionWrapper>
          <SectionWrapper id="staff-section">
            <Staff />
          </SectionWrapper>
        </Suspense>
        <Footer onOpenPrivacy={openPrivacy} onOpenTerms={openTerms} />
      </div>

      <LegalModal isOpen={legalModal.open} initialTab={legalModal.tab} onClose={closeLegalModal} />
    </div>
  );
}
