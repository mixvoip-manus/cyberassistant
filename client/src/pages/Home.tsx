import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhatIs from '@/components/WhatIs';
import Benefits from '@/components/Benefits';
import Statistics from '@/components/Statistics';
import CoverageAccordion from '@/components/CoverageAccordion';
import Calculator from '@/components/Calculator';
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
        <Statistics />
        <CoverageAccordion />
        <Calculator />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
