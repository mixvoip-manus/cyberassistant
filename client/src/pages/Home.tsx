import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AnimatedPresentation from '@/components/AnimatedPresentation';
import WhatIs from '@/components/WhatIs';
import CyberSuite from '@/components/CyberSuite';
import Statistics from '@/components/Statistics';
import CoverageAccordion from '@/components/CoverageAccordion';
import PricingSection from '@/components/PricingSection';
import CyberCalculator from '@/components/CyberCalculator';
import Fit4CyberAssessment from '@/components/Fit4CyberAssessment';
import BookMeetingCTA from '@/components/BookMeetingCTA';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <WhatIs />
        <CyberSuite />
        <Statistics />
        <PricingSection />
        <BookMeetingCTA />
        {/* Calculator hidden - pricing model changing */}
        {/* <CyberCalculator /> */}
        {/* <BookMeetingCTA /> */}
        <Fit4CyberAssessment />
        <FAQ />
        <CoverageAccordion />
        {/* AnimatedPresentation hidden - moved to end for later use */}
        {/* <AnimatedPresentation /> */}
      </main>
      <Footer />
    </div>
  );
}
