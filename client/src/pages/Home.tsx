import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhatIs from '@/components/WhatIs';
import Benefits from '@/components/Benefits';
import Statistics from '@/components/Statistics';
import AnimatedPresentation from '@/components/AnimatedPresentation';
import CoverageAccordion from '@/components/CoverageAccordion';
import Fit4CyberAssessment from '@/components/Fit4CyberAssessment';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <WhatIs />
        <Benefits />
        <AnimatedPresentation />
        <Statistics />
        <CoverageAccordion />
        <Fit4CyberAssessment />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
