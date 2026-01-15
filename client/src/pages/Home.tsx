import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AnimatedPresentation from '@/components/AnimatedPresentation';
import WhatIs from '@/components/WhatIs';
import Benefits from '@/components/Benefits';
import Statistics from '@/components/Statistics';
import CoverageAccordion from '@/components/CoverageAccordion';
import PricingSection from '@/components/PricingSection';
import Fit4CyberAssessment from '@/components/Fit4CyberAssessment';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <AnimatedPresentation />
        <WhatIs />
        <Benefits />
        <Statistics />
        <PricingSection />
        <Fit4CyberAssessment />
        <CoverageAccordion />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
