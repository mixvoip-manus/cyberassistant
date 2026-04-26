import Header from '@/components/Header';
import CyberSuite from '@/components/CyberSuite';
import AdvisoryPricing from '@/components/AdvisoryPricing';
import CrossNavigation from '@/components/CrossNavigation';
import Footer from '@/components/Footer';

export default function AdvisorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <CyberSuite highlightPartner="advisory" />
        <AdvisoryPricing />
        <CrossNavigation currentPage="advisor" />
      </main>
      <Footer />
    </div>
  );
}
