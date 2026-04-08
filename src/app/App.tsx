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
          className="h-full w-full object-cover opacity-[0.72] md:opacity-[0.76] [will-change:transform]"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <NetworkAnimation
          className="absolute inset-0 opacity-[0.08]"
          nodeOpacity={0.08}
          connectionOpacity={0.025}
          nodeCount={10}
          animationSpeed={0.44}
          mouseAttractionStrength={0.08}
          expansionSpeed={0.3}
          baseMovementSpeed={0.12}
          dampingFactor={0.998}
        />
        <div className="absolute inset-0 bg-[#09070d]/42 md:bg-[#09070d]/48" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(60,36,44,0.12)_0%,rgba(28,20,34,0.22)_18%,rgba(14,12,18,0.54)_46%,rgba(7,7,10,0.82)_72%,rgba(4,4,6,0.94)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_30%,rgba(8,6,10,0.18)_64%,rgba(4,3,6,0.48)_100%)]" />
      </div>

      <div className="relative z-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[100svh] bg-[linear-gradient(180deg,rgba(255,190,76,0.06)_0%,rgba(255,128,38,0.07)_16%,rgba(72,44,88,0.05)_34%,rgba(0,0,0,0)_74%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[100svh] bg-[linear-gradient(90deg,rgba(2,2,4,0.96)_0%,rgba(4,4,7,0.90)_12%,rgba(7,7,10,0.44)_28%,rgba(0,0,0,0.06)_46%,rgba(0,0,0,0.06)_54%,rgba(7,7,10,0.48)_72%,rgba(4,4,7,0.90)_88%,rgba(2,2,4,0.96)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[100svh] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_24%,rgba(8,6,10,0.18)_68%,rgba(3,3,5,0.56)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-[calc(100svh-6rem)] z-0 h-32 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(6,6,10,0.38)_38%,rgba(5,5,9,0.78)_100%)] blur-xl" />
        <div className="pointer-events-none absolute inset-x-0 top-[100svh] bottom-0 z-0 bg-[linear-gradient(180deg,rgba(5,5,9,0.86)_0%,rgba(5,5,9,0.86)_100%)]" />
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
